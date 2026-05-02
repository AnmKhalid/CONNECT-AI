import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

const SESSION_ID = "session_" + Math.random().toString(36).substr(2, 9);

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Assalam o Alaikum! I'm ConnectAI, your personal telecom support agent. How can I help you today? 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalate, setEscalate] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
     const res = await axios.post("/api/chat", {
        message: input,
        sessionId: SESSION_ID,
      });
      setMessages((prev) => [...prev, { role: "bot", text: res.data.reply }]);
      if (res.data.escalate) setEscalate(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="logo">C</div>
        <div>
          <div className="header-title">ConnectAI Support</div>
          <div className="header-sub">● Online — Telecom Assistant</div>
        </div>
      </div>

      {escalate && (
        <div className="escalate-banner">
          We noticed you're frustrated. Would you like to connect with a human agent?{" "}
          <button onClick={() => alert("Connecting to agent... Helpline: 111")}>
            Connect Now
          </button>
        </div>
      )}

      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            {m.role === "bot" && <div className="avatar">C</div>}
            <div className="bubble">{m.text}</div>
          </div>
        ))}
        {loading && (
          <div className="msg bot">
            <div className="avatar">C</div>
            <div className="bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message... (English or Urdu)"
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
