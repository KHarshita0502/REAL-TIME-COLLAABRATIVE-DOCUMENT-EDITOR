import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("load", (data) => setText(data));
    socket.on("receive", (data) => setText(data));
  }, []);

  const handleChange = (e) => {
    const updatedText = e.target.value;
    setText(updatedText);
    socket.emit("send", updatedText);
  };

  return (
    <div className="App">
      <h2>Collaborative Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows="15"
        cols="80"
        placeholder="Start typing..."
      />
    </div>
  );
}

export default App;
