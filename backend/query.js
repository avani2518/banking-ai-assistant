import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { QdrantClient } from "@qdrant/js-client-rest";

const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL || "http://localhost:6333"
});

const COLLECTION_NAME = process.env.VECTOR_COLLECTION || "banking_docs";

/**
 * Search for relevant documents in Qdrant
 * @param {string} query - The search query
 * @param {string} accountNumber - Optional account number for filtering
 * @returns {Promise<Array>} - Array of matching documents
 */
export async function searchDocuments(query, accountNumber = null) {
  try {
    console.log(`🔎 Searching for query: "${query}" | Account: "${accountNumber}" (type: ${typeof accountNumber})`);
    
    // Get all documents first (we'll filter in code)
    const response = await qdrantClient.scroll(COLLECTION_NAME, {
      limit: 100,
      with_payload: true,
      with_vector: false
    });

    // Filter documents based on account number
    let filteredPoints = response.points;
    
    if (accountNumber) {
      // Get documents for this specific account OR general documents (account_number is null/undefined)
      filteredPoints = response.points.filter(point => {
        const docAccountNumber = point.payload.account_number;
        const matches = docAccountNumber === accountNumber || docAccountNumber === null || docAccountNumber === undefined;
        
        // Debug first 3 comparisons
        if (response.points.indexOf(point) < 3) {
          console.log(`   Doc ${point.id}: "${docAccountNumber}" === "${accountNumber}"? ${docAccountNumber === accountNumber}`);
        }
        
        return matches;
      });
    }
    
    console.log(`   Filtered: ${filteredPoints.length} docs (${filteredPoints.filter(p => p.payload.account_number === accountNumber).length} account-specific, ${filteredPoints.filter(p => !p.payload.account_number).length} general)`);

    // Simple keyword-based scoring
    const queryLower = query.toLowerCase();
    const keywords = queryLower.split(/\s+/).filter(word => word.length > 3);
    
    // Score documents based on keyword matches
    const scoredPoints = filteredPoints.map(point => {
      const text = (point.payload.text || "").toLowerCase();
      let score = 0;
      
      // STRONGLY boost score for account-specific documents
      if (point.payload.account_number === accountNumber) {
        score += 0.7; // Strong boost for account-specific docs (was 0.3)
      }
      
      // Count keyword matches
      keywords.forEach(keyword => {
        if (text.includes(keyword)) {
          score += 0.1; // Keyword match bonus
        }
      });
      
      // Ensure account-specific docs always rank higher than general ones
      if (point.payload.account_number === accountNumber) {
        score = Math.max(score, 0.7); // Minimum score of 0.7 for account docs
      } else if (score === 0) {
        score = 0.05; // Very low score for unrelated general docs
      }
      
      return {
        point,
        score: Math.min(score, 0.99)
      };
    });
    
    // Sort by score and take top results
    scoredPoints.sort((a, b) => b.score - a.score);
    
    // Debug: Show top 5 scored documents
    console.log("🔍 Top 5 scored documents:");
    scoredPoints.slice(0, 5).forEach((item, idx) => {
      const preview = item.point.payload.text.substring(0, 80);
      const accNum = item.point.payload.account_number || "GENERAL";
      console.log(`   ${idx + 1}. Score: ${item.score.toFixed(2)} | Account: ${accNum} | "${preview}..."`);
    });
    
    const topResults = scoredPoints.slice(0, 15); // Get top 15 for better context

    // Extract and format the results
    const matches = topResults.map(item => ({
      id: item.point.id,
      score: item.score,
      content: item.point.payload.text || item.point.payload.content || "",
      metadata: {
        ...item.point.payload,
        id: item.point.id
      }
    }));

    console.log(`Found ${matches.length} documents for account ${accountNumber || 'ALL'} (filtered from ${filteredPoints.length}/${response.points.length} total)`);
    
    return matches;
  } catch (error) {
    console.error("Error searching documents:", error);
    throw error;
  }
}

/**
 * Search documents using vector similarity (when you have embeddings set up)
 * @param {Array} queryVector - The embedding vector for the query
 * @param {number} limit - Maximum number of results
 * @returns {Promise<Array>} - Array of matching documents
 */
export async function vectorSearch(queryVector, limit = 5) {
  try {
    const response = await qdrantClient.search(COLLECTION_NAME, {
      vector: queryVector,
      limit: limit,
      with_payload: true
    });

    const matches = response.map(point => ({
      id: point.id,
      score: point.score,
      content: point.payload.text || point.payload.content || "",
      metadata: {
        ...point.payload,
        id: point.id
      }
    }));

    return matches;
  } catch (error) {
    console.error("Error in vector search:", error);
    throw error;
  }
}