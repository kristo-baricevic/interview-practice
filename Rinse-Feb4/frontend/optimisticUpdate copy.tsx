import * as React from "react";
import { useState } from "react";

type Message = {
  id: string;
  text: string;
  status: "sending" | "sent" | "failed";
};

function sendMessageApi(text: string): Promise<{ id: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0 / 0.2) {
        reject(new Error("Failed to send message"));
      } else {
        console.log("text received", text);
        resolve({ id: crypto.randomUUID() });
      }
    }, 800);
  });
}

export default function Chat() {
  // create state for messages and input
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // create async send function that sends message and updates
  // optimistically, then resolves status in a try/catch
  const handleSend = async () => {
    if (!input.trim()) return;

    const tempId = crypto.randomUUID();

    const optimisticMessage: Message = {
      id: tempId,
      text: input,
      status: "sending",
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setInput("");

    try {
      const result = await sendMessageApi(input);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, id: result.id, status: "sent" } : msg
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  // return messages in a list and an input to type and send with a button

  return (
    <div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            {msg.txt}
            {msg.status === "sending" && "(...sending)"}
            {msg.status === "failed" && "(failed)"}
          </li>
        ))}
      </ul>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Type a message"
      />
      <button type="button" disabled={input == ""} onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
