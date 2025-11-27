import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { client, initCollection } from "./qdrant.js";
import { generateEmbedding } from "./embed.js";

const collection = process.env.VECTOR_COLLECTION;

const docs = [
  { id: 1, text: "Savings account interest rate is 4% per annum." },
  { id: 2, text: "Fixed deposit minimum amount is ₹5000." },
  { id: 3, text: "To check your balance, log into the mobile banking app." },
  { id: 4, text: "Loan processing time is usually 3 to 5 working days." }
];

async function insertData() {
  await initCollection();

  for (const doc of docs) {
    const emb = await generateEmbedding(doc.text);

    await client.upsert(collection, {
      points: [
        {
          id: doc.id,
          vector: emb,
          payload: { text: doc.text }
        }
      ]
    });

    console.log("Inserted:", doc.text);
  }

  console.log("🎉 All docs inserted!");
}

insertData();
