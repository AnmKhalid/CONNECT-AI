const Groq = require("groq-sdk");

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
- If user writes in Urdu, respond in PAKISTANI Urdu using Roman Urdu. Use Pakistani words like "Khush Amdeed", "Shukriya", "Meherbani", "Janab". NEVER use Hindi words like "swagat", "sahayata", "kripya". Use instead: "marhaba", "shukriya", "masla".
- If the user seems angry or frustrated, apologize sincerely and offer to escalate to a human agent
- If you don't know something, say "I'll connect you to our team for this"
- Keep responses short and helpful
- Helpline: 111 for support`;

const chatHistories = {};

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

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
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    history.push({ role: "user", content: message });
    history.push({ role: "assistant", content: reply });

    const isAngry = /angry|frustrated|worst|pathetic|useless|terrible|hate|kharab|bakwaas/i.test(message);

    res.status(200).json({ reply, escalate: isAngry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
}
