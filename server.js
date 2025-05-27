// Import required modules
const express = require('express');
const cors = require('cors');

// Initialize the Express app
const app = express();

// Add CORS middleware
app.use(cors({
    origin: 'https://cool-mochi-f0c07d.netlify.app/', // Replace with your WordPress site URL
}));

// Middleware to parse JSON requests
app.use(express.json());

// Define the health assistant endpoint
app.post('/api/health-assistant', (req, res) => {
    const userMessage = req.body.message;

    // Simulate AI response
    const aiResponse = `You said: ${userMessage}. Here's an AI response.`;

    // Send back the response
    res.json({ reply: aiResponse });
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
