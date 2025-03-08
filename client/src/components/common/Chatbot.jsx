import React, { useState } from "react";
import axios from "axios";

const Chatbot = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, user: "You" }]);
    setInput("");

    const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/chat`, {
      message: input,
      userId,
    });

    setMessages([...messages, { text: input, user: "You" }, { text: response.data.reply, user: "Bot" }]);
  };

  return (
    <div>
      <h2>Smart City Chatbot</h2>
      <div style={{ height: "300px", overflowY: "auto", border: "1px solid gray", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.user === "You" ? "right" : "left" }}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
