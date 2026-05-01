# ConnectAI — AI-Powered Telecom Support Agent

![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![React](https://img.shields.io/badge/React-18-blue) ![LLaMA](https://img.shields.io/badge/LLaMA_3-70B-purple) ![Groq](https://img.shields.io/badge/Groq-API-orange) ![License](https://img.shields.io/badge/License-MIT-yellow)

> A full-stack AI chatbot for telecom customer support — powered by Meta's LLaMA 3 model via Groq, with bilingual support (English + Urdu), conversation memory, and intelligent sentiment-based escalation.

---

## Live Demo

- Frontend: **connectai.vercel.app**
- Backend API: **connectai.onrender.com**

---

## Features

- **LLaMA 3 AI** — Meta's state-of-the-art 70B parameter language model
- **Bilingual** — Responds in English or Pakistani Urdu based on user input
- **Conversation Memory** — Remembers full context across the session
- **Sentiment Detection** — Detects frustrated users and triggers human escalation
- **Ultra-fast** — Groq's hardware acceleration delivers sub-second responses
- **Responsive UI** — Clean, mobile-friendly chat interface
- **Session Management** — Unique sessions per user, no data leakage

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, CSS3, Axios |
| Backend | Node.js, Express.js |
| AI Model | LLaMA 3 (llama-3.3-70b-versatile) |
| AI Inference | Groq API |
| NLP | Rule-based sentiment analysis |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
connect-ai/
├── backend/
│   ├── server.js        # Express server + Groq API integration
│   ├── .env             # API keys (never committed)
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js       # React chat UI
│   │   └── App.css      # Styling + animations
│   ├── .gitignore
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Free Groq API key from console.groq.com

### Installation

**1. Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/connect-ai.git
cd connect-ai
```

**2. Setup Backend**
```bash
cd backend
npm install
```

Create `.env` file:
```
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

Run backend:
```bash
node server.js
# ConnectAI backend running on port 5000
```

**3. Setup Frontend**
```bash
cd ../frontend
npm install
npm start
# Opens at http://localhost:3000
```

---

## How It Works

```
User Message
     ↓
React Frontend (App.js)
     ↓ Axios POST /chat
Node.js Backend (server.js)
     ↓ Session history + system prompt
Groq API → LLaMA 3 Model
     ↓ AI Response
Backend → Sentiment Check
     ↓
Frontend → Renders chat bubble
```

### AI Components

- **LLM** — LLaMA 3 70B handles natural language understanding and response generation
- **Prompt Engineering** — Custom system prompt constrains model to telecom support domain
- **Sentiment Analysis** — NLP keyword detection identifies frustrated users in English and Urdu
- **Memory** — Full conversation history sent to LLM each request for contextual replies

---

## Sample Queries to Test

```
"What internet packages are available?"
"My SIM is blocked, help me"
"Mujhe data bundle chahiye"
"this is the worst service ever"   ← triggers escalation banner
"How do I send money via mobile wallet?"
```

---

## Deployment

### Backend on Render (Free)
1. Push to GitHub
2. Go to render.com → New Web Service
3. Connect repo → select backend folder
4. Add environment variable: GROQ_API_KEY
5. Deploy and get your live URL

### Frontend on Vercel (Free)
1. Update App.js — replace localhost:5000 with your Render URL
2. Go to vercel.com → Import repo → select frontend folder
3. Deploy and get your live URL

---

## Resume Bullet Points

```
Built ConnectAI, a production-deployed AI telecom support agent using Meta's LLaMA 3
(70B) via Groq API, React.js, and Node.js — handling 15+ telecom query types with
bilingual English/Urdu support and NLP-based sentiment escalation.

Implemented stateful multi-turn conversation memory and prompt engineering to
constrain LLM behavior to telecom domain without fine-tuning.
```

---

## License

MIT 2026 — Free to use and modify
