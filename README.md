🏦 Banking RAG Assistant
AI-Powered Smart Banking Chatbot (React + Node.js + Qdrant + Claude AI)

A full-stack banking assistant that answers customer queries using real account data, vector search, and LLM intelligence.
This project demonstrates a production-ready RAG (Retrieval-Augmented Generation) system built for banking use cases.

🚀 Overview

The Banking RAG Assistant allows users to ask natural language questions like:

“What is my balance for account 10001111?”

“Show my recent transactions.”

“When is my next EMI due?”

The system retrieves account-specific documents, passes them to Claude Sonnet 4, and returns accurate, natural responses.

🎯 Features
✔️ Account-Specific Answers

Each query is filtered by account number — ensures no cross-account leakage.

✔️ AI-Powered Responses (Claude)

Uses Anthropic Claude Sonnet 4 to generate friendly and accurate answers.

✔️ Vector Search with Qdrant

79+ banking documents indexed using embeddings for smart retrieval.

✔️ Real-Time, Secure Information

Searches your Qdrant collection instantly for relevant account data.

✔️ Full-Stack Production Architecture

React frontend → Node.js backend → Qdrant vector DB → Claude AI.

🏗️ Architecture
Frontend (React + Vite)
    ⇩
Backend (Node.js + Express)
    ⇩
Qdrant Vector DB (Document Retrieval)
    ⇩
Claude AI (Answer Generation)

🛠️ Tech Stack
Component	Technology
Frontend	React + Vite
Backend	Node.js + Express
Vector DB	Qdrant
AI Model	Claude Sonnet 4
Search	RAG (Retrieval-Augmented Generation)
Embeddings	Claude / OpenAI embeddings (depending on setup)
📊 Sample Accounts

These are included for demo purposes:

ACC1001 – John Doe — ₹1,25,450 balance

ACC1002 – Sarah Smith — ₹32,150 credit card outstanding

ACC1003 – Rajesh Kumar — ₹38,50,000 home loan

ACC1004 – Priya Sharma — Senior Citizen FDs worth ₹10,00,000

🔍 How It Works (Simple Version)

User enters:
“What is my account balance for ACC1001?”

Backend retrieves only documents related to ACC1001

Ranks the most relevant ones using vector search

Builds a RAG prompt with retrieved context

Sends the prompt to Claude Sonnet 4

Returns a personalized, accurate answer

📂 Project Structure
banking-ai-assistant-main/
│
├── backend/
│   ├── index.js
│   ├── llm.js
│   ├── query.js
│   ├── qdrant.js
│   └── embed.js
│
└── frontend/
    ├── src/
    │   ├── pages/Dashboard.tsx
    │   └── components
    ├── vite.config.js
    └── package.json

🔧 Setup Instructions
1️⃣ Clone the repo
git clone https://github.com/avani2518/banking-ai-assistant-main.git
cd banking-ai-assistant-main

2️⃣ Backend Setup

Create .env (never commit this file):

ANTHROPIC_API_KEY=your_key_here
QDRANT_URL=http://localhost:6333
VECTOR_COLLECTION=bank_docs


Install dependencies:

npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:
👉 http://localhost:8080

Backend runs on:
👉 http://localhost:8000
