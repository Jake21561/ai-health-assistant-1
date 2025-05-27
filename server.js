const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

// Initialize the Express app
const app = express();

// CORS middleware — make sure to update origin with your frontend URL
app.use(cors({
    origin: 'https://cool-mochi-f0c07d.netlify.app/', 
}));

// JSON parser middleware
app.use(express.json());

// Set up OpenAI with your API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Your API endpoint
app.post('/api/health-assistant-1', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Call OpenAI API to get a completion
    const completion = await openai.createChatCompletion({
      model: "gpt-4", // Replace with "gpt-3.5-turbo" if using GPT-3.5
      messages: [
        { role: "system", content: "You are a helpful health and wellness assistant." },
        { role: "user", content: userMessage }
      ],
      max_tokens: 300,
    });

    const aiResponse = completion.data.choices[0].message.content;

    // Send the AI's response back to the frontend
    res.json({ reply: aiResponse });

  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ reply: "Sorry, something went wrong with the AI." });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

