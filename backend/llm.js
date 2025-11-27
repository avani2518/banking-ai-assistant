import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Generate a response using Claude AI
 * @param {string} prompt - The RAG prompt with context
 * @param {string} query - The user's original query
 * @returns {Promise<string>} - The AI-generated response
 */
export async function generateResponse(prompt, query) {
  try {
    console.log("🔑 Checking API key...");
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("❌ No API key found!");
      return "LLM integration requires ANTHROPIC_API_KEY in .env file. Please add your API key to enable AI responses.";
    }

    console.log("✅ API key found, calling Anthropic API...");
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    console.log("✅ Got response from API");
    // Extract text from response
    const responseText = message.content
      .filter(block => block.type === "text")
      .map(block => block.text)
      .join("\n");

    console.log(`✅ Generated response (${responseText.length} chars)`);
    return responseText;
  } catch (error) {
    console.error("❌ LLM Error:", error.message);
    console.error("Error details:", error);
    
    if (error.status === 401) {
      return "Invalid API key. Please check your ANTHROPIC_API_KEY in .env file.";
    }
    
    if (error.status === 429) {
      return "API rate limit exceeded. Please try again in a moment.";
    }
    
    return `AI response generation failed: ${error.message}`;
  }
}