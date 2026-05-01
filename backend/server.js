require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are ConnectAI, a smart and friendly customer support agent for a telecom company in Pakistan.

You help customers with:
- Prepaid/postpaid packages and bundles
- Mobile wallet (sending money, bill payments, mobile load)
- Internet/data packages (daily, weekly, monthly)
- SIM issues (blocking, replacement, biometric verification)
- Call and SMS packages
- Roaming services
- Mobile app issues and troubleshooting
- Network complaints

Rules:
- Always be polite, friendly, and professional
- Respond in the same language the user writes in (Urdu or English)
- If the user seems angry or frustrated, apologize sincerely and offer to escalate to a human agent
- If you don't know something, say "I'll connect you to our team for this"
- Keep responses short and helpful
- Add relevant helpline: 111 for support`;

const chatHistories = {};

app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message || !sessionId)
    return res.status(400).json({ error: "message and sessionId required" });

  if (!chatHistories[sessionId]) chatHistories[sessionId] = [];

  const history = chatHistories[sessionId];

  try {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    history.push({ role: "user", content: message });
    history.push({ role: "assistant", content: reply });

    const isAngry = /angry|frustrated|worst|pathetic|useless|terrible|hate|kharab|bakwaas/i.test(message);

    res.json({ reply, escalate: isAngry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/", (req, res) => res.json({ status: "ConnectAI backend running on Groq" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ConnectAI backend running on port ${PORT}`));
