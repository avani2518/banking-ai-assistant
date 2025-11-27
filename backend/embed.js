import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { pipeline } from '@xenova/transformers';

let embedder = null;

async function initEmbedder() {
  if (!embedder) {
    console.log("🔄 Loading embedding model (first time may take a moment)...");
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    console.log("✅ Embedding model loaded!");
  }
  return embedder;
}

export async function generateEmbedding(text) {
  try {
    const model = await initEmbedder();
    const output = await model(text, { pooling: 'mean', normalize: true });
    
    // Convert to regular array
    return Array.from(output.data);
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}