const express = require('express');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json());

app.post('/ask', async (req, res) => {
  const prompt = req.body.prompt || "Say hello!";
  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    res.send(chat.choices[0].message.content);
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
