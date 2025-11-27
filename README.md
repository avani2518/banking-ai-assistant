🏦 Banking RAG Assistant

A retrieval-augmented banking assistant that provides customer-specific answers using real account data and document-based context. The system performs vector search to retrieve relevant information and uses an LLM to generate accurate, personalized responses.

📌 1. Project Overview

This application allows users to enter an account number and ask banking-related questions.
The backend:

- retrieves documents linked to that account

- performs vector search

- sends the relevant context to the LLM

The objective is to demonstrate a complete RAG pipeline adapted for banking use cases, focusing on reliability and data isolation.

🚀 2. Features

1. Account-specific responses

2. Retrieval-Augmented Generation (RAG) architecture

3. Semantic vector search using Qdrant

4. LLM-generated natural language answers

5. Strict customer data separation

6. Preloaded sample accounts (savings, loans, credit cards, FDs)

⚙️ 3. How It Works

- User enters an account number and asks a question

- Backend fetches all documents linked to that account

- Vector search identifies the most relevant content

- Retrieved context + user query are combined

- LLM generates a final response based only on allowed data

💬 4. Example Queries

a. What is my current balance?

b. When is my EMI due?

c. How much is my credit card outstanding?

d. Give details of my fixed deposits.

e. Explain the charges for my account.

👤 5. Sample Accounts Included

1. ACC1001 – Savings account

2. ACC1002 – Credit card

3. ACC1003 – Home loan

4. ACC1004 – Senior citizen fixed deposits

Each account includes structured fields and supporting documents stored inside the vector database.

🛠️ 6. Technology Stack
Frontend

React

Vite

Backend

Node.js

Express

Storage & Retrieval

Qdrant (vector database)

RAG-based retrieval pipeline

LLM

Claude Sonnet 4

📁 7. Project Structure
project-root/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── services/
│   ├── rag/
│   ├── data/
│   └── config/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── api/
│
├── README.md
└── package.json

🧩 8. Getting Started
Prerequisites

Node.js installed

Qdrant running locally or via Docker

Environment variables set up (.env)

Install dependencies
npm install

Run the application
npm run dev

🎯 9. What This Project Demonstrates

- End-to-end RAG pipeline

- Integrating LLMs with financial data

- Building context-aware systems

- Enforcing strict customer-level data separation

- Clean interaction between frontend and backend

🔮 10. Possible Enhancements

- User authentication and sessions

- UI/UX improvements

- Additional datasets and document types

- Multi-language support

- Integration with real banking APIs
