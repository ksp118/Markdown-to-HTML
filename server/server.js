const express = require("express");
const cors = require("cors");
const markdownIt = require("markdown-it");

const app = express();
const md = new markdownIt();

app.use(cors());
app.use(express.json());

app.post("/convert", (req, res) => {
  const { markdownText } = req.body;
  if (!markdownText) {
    return res.status(400).json({ error: "Markdown text is required" });
  }
  const html = md.render(markdownText);
  res.json({ html });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
