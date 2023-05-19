import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatBot.css";

const ChatBot = () => {
  const [input, setInput] = useState("");
  let botMessage = {
    text: "Hi there, I'm your Sports assistant here at PlayPal. You can ask me any questions related to Sports",
    sender: "bot",
  };
  const [messages, setMessages] = useState([botMessage]);
  const [prompts, setprompts] = useState(
    ' "Your name is PlayPal. Answer only Sports and Fitness related questions. If other queries are asked, tell the user Welcome to PlayPal. Please ask Sports related question. You are a Sport specialist and analyst on all kinds of sports,answer the following queries descripteively without further questions. Please do the html formatting of the content”. \n "'
  );
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input !== "") {
      const userMessage = { text: input, sender: "user" };
      setMessages((messages) => [...messages, userMessage]);
      setInput("");

      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt:
            "Your name is PlayPal. Answer only Sports and Fitness related questions. If other queries are asked, tell the user Welcome to PlayPal. Please ask Sports related question. You are a Sport specialist and analyst on all kinds of sports,answer the following queries descripteively without further questions. Please do the html formatting of the content”. \n " +
            input,
          model: "text-davinci-002",
          max_tokens: 1000,
          temperature: 0.4,
          top_p: 1,
          n: 1,
          //   stop: "\n",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`, // Replace with your GPT-3 API key
          },
        }
      );

      const botResponseText = response.data.choices[0].text.trim();
      const botMessage = { text: botResponseText, sender: "bot" };
      setMessages((messages) => [...messages, botMessage]);
    }
  };

  return (
    <div>
      {/* <NavComponent view="unknown"></NavComponent> */}
      <h1>Welcome to PlayPal</h1>
      <div className="chatbot">
        <div className="chatbot-window">
          {messages.map((message, index) => (
            <div key={index} className={message.sender}>
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <form onSubmit={handleSend} className="chatbot-form">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
