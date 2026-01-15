const OpenAI = require("openai");
const Blog = require("../models/Blog");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateBlog = async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: req.body.prompt }],
    });

    const text = response.choices[0].message.content;

    await Blog.create({
      prompt: req.body.prompt,
      content: text
    });

    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).send("AI generation failed");
  }
};
