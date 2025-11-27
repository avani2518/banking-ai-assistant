import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({
  url: process.env.QDRANT_URL,
});

const collection = process.env.VECTOR_COLLECTION;

async function cleanup() {
  try {
    await client.deleteCollection(collection);
    console.log("🗑️  Deleted collection:", collection);
  } catch (error) {
    console.log("ℹ️  Collection doesn't exist or already deleted");
  }
}

cleanup();