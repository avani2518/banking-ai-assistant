import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { QdrantClient } from "@qdrant/js-client-rest";

export const client = new QdrantClient({
  url: process.env.QDRANT_URL,
});

export async function initCollection() {
  const collection = process.env.VECTOR_COLLECTION;

  const collections = await client.getCollections();
  const exists = collections.collections.some(c => c.name === collection);

  if (!exists) {
    await client.createCollection(collection, {
      vectors: {
        size: 384,  // CRITICAL: Must be 384 for the free model
        distance: "Cosine",
      },
    });
    console.log("✅ Created Qdrant collection:", collection);
  } else {
    console.log("ℹ️ Qdrant collection already exists:", collection);
  }
}