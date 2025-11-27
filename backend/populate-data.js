import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { QdrantClient } from "@qdrant/js-client-rest";

const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL || "http://localhost:6333"
});

const COLLECTION_NAME = process.env.VECTOR_COLLECTION || "banking_docs";

// Account-specific banking data
const accountDocuments = {
  // Account 1: John Doe - Savings Account
  "ACC1001": [
    "Account ACC1001 belongs to John Doe, Savings Account.",
    "Account ACC1001 current balance is ₹1,25,450.00 as of today.",
    "Account ACC1001 was opened on January 15, 2020.",
    "Account ACC1001 has a monthly average balance of ₹95,000.",
    "Account ACC1001 last transaction: Deposit of ₹15,000 on Nov 25, 2025.",
    "Account ACC1001 interest earned this year: ₹4,250.",
    "Account ACC1001 has automatic bill payments set up for electricity and internet.",
    "Account ACC1001 has a linked fixed deposit of ₹2,00,000 at 7% interest.",
    "Account ACC1001 recent transactions: Nov 25 +₹15,000, Nov 20 -₹5,000, Nov 18 -₹3,500.",
    "Account ACC1001 has 3 pending cheques totaling ₹12,000.",
  ],
  
  // Account 2: Sarah Smith - Current Account with Credit Card
  "ACC1002": [
    "Account ACC1002 belongs to Sarah Smith, Current Account.",
    "Account ACC1002 current balance is ₹85,230.50 as of today.",
    "Account ACC1002 was opened on March 22, 2019.",
    "Account ACC1002 is linked to credit card ending in 4532.",
    "Account ACC1002 credit card outstanding balance: ₹32,150.",
    "Account ACC1002 credit card payment due date: December 5, 2025.",
    "Account ACC1002 has overdraft facility of ₹50,000 approved.",
    "Account ACC1002 last transaction: UPI payment of ₹2,500 on Nov 26, 2025.",
    "Account ACC1002 recent transactions: Nov 26 -₹2,500, Nov 24 +₹45,000, Nov 22 -₹8,750.",
    "Account ACC1002 has standing instruction for mutual fund SIP of ₹10,000 monthly.",
  ],
  
  // Account 3: Rajesh Kumar - Home Loan Account
  "ACC1003": [
    "Account ACC1003 belongs to Rajesh Kumar, Home Loan Account.",
    "Account ACC1003 loan amount sanctioned: ₹45,00,000 at 8.5% interest.",
    "Account ACC1003 outstanding loan balance: ₹38,50,000 as of today.",
    "Account ACC1003 monthly EMI: ₹38,500, due date 5th of every month.",
    "Account ACC1003 loan tenure: 20 years, started June 2022.",
    "Account ACC1003 next EMI due on December 5, 2025.",
    "Account ACC1003 has paid 42 EMIs so far, 198 EMIs remaining.",
    "Account ACC1003 linked savings account ACC1003-SA with balance ₹65,000.",
    "Account ACC1003 can request for top-up loan up to ₹5,00,000.",
    "Account ACC1003 last payment: EMI of ₹38,500 paid on Nov 5, 2025.",
  ],
  
  // Account 4: Priya Sharma - Senior Citizen Fixed Deposit
  "ACC1004": [
    "Account ACC1004 belongs to Priya Sharma, Senior Citizen Account.",
    "Account ACC1004 savings account balance: ₹2,15,650.00 as of today.",
    "Account ACC1004 has 3 active fixed deposits totaling ₹10,00,000.",
    "Account ACC1004 FD-1: ₹5,00,000 at 8% for 5 years, matures March 2027.",
    "Account ACC1004 FD-2: ₹3,00,000 at 7.5% for 3 years, matures July 2026.",
    "Account ACC1004 FD-3: ₹2,00,000 at 7% for 2 years, matures January 2026.",
    "Account ACC1004 receives senior citizen benefits: extra 0.5% interest on all deposits.",
    "Account ACC1004 quarterly interest payout: ₹18,750 credited to savings account.",
    "Account ACC1004 has pension deposit of ₹25,000 on 1st of every month.",
    "Account ACC1004 last transaction: Pension credit of ₹25,000 on Nov 1, 2025.",
  ]
};

// General banking knowledge (applies to all accounts)
const generalBankingDocuments = [
  // Account Information
  "Savings account interest rate is 4% per annum, calculated monthly.",
  "Current account has zero interest rate but offers unlimited transactions.",
  "Minimum balance requirement for savings account is ₹10,000.",
  "Account opening requires PAN card, Aadhaar card, and address proof.",
  "Joint accounts can be opened with up to 4 holders.",
  "Senior citizen accounts get an additional 0.5% interest rate.",
  "Zero balance accounts are available for students under 18 years.",
  
  // Fixed Deposits
  "Fixed deposit minimum amount is ₹5,000.",
  "Fixed deposit interest rates range from 5.5% to 7.5% based on tenure.",
  "Fixed deposits for 1 year offer 6% interest rate.",
  "Fixed deposits for 5 years offer 7.5% interest rate.",
  "Premature withdrawal of FD incurs a penalty of 1% on interest.",
  "Tax Saving FD has a lock-in period of 5 years.",
  
  // Loans
  "Personal loan interest rates start from 10.5% per annum.",
  "Home loan interest rates start from 8.5% per annum.",
  "Car loan interest rates range from 8.75% to 9.25%.",
  "Education loan interest rates start from 9% per annum.",
  "Loan processing time is usually 3 to 5 working days.",
  "Maximum loan tenure for home loans is 30 years.",
  "Personal loan can be approved up to ₹25 lakhs without collateral.",
  
  // Credit Cards
  "Credit card annual fee is ₹500, waived on spending ₹50,000 annually.",
  "Credit card cash withdrawal limit is 40% of total credit limit.",
  "Interest-free credit period is up to 50 days.",
  "Credit card reward points: 1 point per ₹100 spent.",
  "Cash advance on credit card attracts 3.5% monthly interest.",
  "Credit card minimum payment is 5% of outstanding amount.",
  
  // Digital Banking
  "To check your balance, log into the mobile banking app or use SMS service.",
  "Mobile banking app supports UPI payments, bill payments, and fund transfers.",
  "Daily UPI transaction limit is ₹1 lakh per transaction.",
  "NEFT transfers are free and processed in real-time.",
  "RTGS minimum amount is ₹2 lakhs with charges of ₹25 plus GST.",
  "Internet banking requires registration with debit card and OTP verification.",
  
  // ATM Services
  "Free ATM withdrawals: 5 per month from own bank, 3 from other banks.",
  "ATM withdrawal limit is ₹25,000 per day.",
  "Cash deposit at ATM is available 24/7 with instant credit.",
  "ATM card replacement takes 7 working days.",
  
  // Customer Service
  "Customer care helpline: 1800-XXX-XXXX, available 24/7.",
  "Branch timings: Monday to Friday 10 AM to 4 PM, Saturday 10 AM to 1 PM.",
  "Email support: support@bank.com with response time of 24 hours.",
];

async function populateData() {
  try {
    console.log("🚀 Starting data population...");
    
    // Check if collection exists
    try {
      await qdrantClient.getCollection(COLLECTION_NAME);
      console.log(`✅ Collection "${COLLECTION_NAME}" exists`);
    } catch (error) {
      console.log(`❌ Collection "${COLLECTION_NAME}" not found. Creating it...`);
      
      // Create collection with vector size 384 (for all-MiniLM-L6-v2 embeddings)
      await qdrantClient.createCollection(COLLECTION_NAME, {
        vectors: {
          size: 384,
          distance: "Cosine"
        }
      });
      console.log(`✅ Collection "${COLLECTION_NAME}" created`);
    }

    // Clear existing data
    console.log("🗑️  Clearing existing documents...");
    try {
      await qdrantClient.delete(COLLECTION_NAME, {
        filter: {
          must: [
            {
              key: "text",
              match: { any: ["*"] }
            }
          ]
        }
      });
    } catch (e) {
      // If delete fails, it's okay - collection might be empty
    }

    // Add new documents
    console.log(`📝 Adding account-specific and general documents...`);
    
    let documentId = 1;
    const points = [];
    
    // Add account-specific documents
    for (const [accountNumber, documents] of Object.entries(accountDocuments)) {
      documents.forEach(text => {
        points.push({
          id: documentId++,
          payload: {
            text: text,
            account_number: accountNumber,
            category: "Account-Specific",
            created_at: new Date().toISOString()
          },
          vector: generateDummyVector()
        });
      });
    }
    
    // Add general banking documents (no account_number filter)
    generalBankingDocuments.forEach(text => {
      points.push({
        id: documentId++,
        payload: {
          text: text,
          account_number: null, // General documents available for all accounts
          category: categorizeDocument(text),
          created_at: new Date().toISOString()
        },
        vector: generateDummyVector()
      });
    });

    await qdrantClient.upsert(COLLECTION_NAME, {
      wait: true,
      points: points
    });

    console.log(`✅ Successfully added ${points.length} documents to Qdrant!`);
    console.log("\n📊 Document breakdown:");
    console.log(`   - Account-specific: ${Object.values(accountDocuments).flat().length} documents`);
    console.log(`   - General banking: ${generalBankingDocuments.length} documents`);
    console.log("\n📋 Accounts created:");
    Object.keys(accountDocuments).forEach(acc => {
      console.log(`   - ${acc}: ${accountDocuments[acc].length} documents`);
    });
    
  } catch (error) {
    console.error("❌ Error populating data:", error);
    process.exit(1);
  }
}

// Helper function to categorize documents
function categorizeDocument(text) {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('savings') || lowerText.includes('current') || lowerText.includes('account')) return 'Accounts';
  if (lowerText.includes('fixed deposit') || lowerText.includes('fd') || lowerText.includes('recurring')) return 'Deposits';
  if (lowerText.includes('loan') || lowerText.includes('emi')) return 'Loans';
  if (lowerText.includes('credit card')) return 'Credit Cards';
  if (lowerText.includes('mobile banking') || lowerText.includes('upi') || lowerText.includes('neft') || lowerText.includes('internet')) return 'Digital Banking';
  if (lowerText.includes('atm')) return 'ATM Services';
  if (lowerText.includes('charges') || lowerText.includes('fee')) return 'Charges & Fees';
  if (lowerText.includes('customer') || lowerText.includes('helpline') || lowerText.includes('support')) return 'Customer Service';
  if (lowerText.includes('investment') || lowerText.includes('mutual fund') || lowerText.includes('sip')) return 'Investments';
  if (lowerText.includes('security') || lowerText.includes('pin') || lowerText.includes('otp')) return 'Security';
  if (lowerText.includes('international') || lowerText.includes('forex') || lowerText.includes('foreign')) return 'International';
  
  return 'General';
}

// Generate a dummy 384-dimensional vector (for demo purposes)
// In production, you'd use actual embeddings from a model
function generateDummyVector() {
  return Array.from({ length: 384 }, () => Math.random() * 2 - 1);
}

// Run the population
populateData()
  .then(() => {
    console.log("\n✨ Data population completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Fatal error:", error);
    process.exit(1);
  });