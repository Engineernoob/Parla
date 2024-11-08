// parla-express-backend/index.js

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/gpt2';
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// API endpoint for AI assistant
app.post('/api/assistant', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ response: 'No message provided' });
  }

  try {
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: userMessage },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data[0]?.generated_text || 'Sorry, I could not understand that.';

    return res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error communicating with Hugging Face API:', error.message);
    return res.status(500).json({ response: 'An error occurred while fetching response from AI.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
