import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://your-backend-url.onrender.com/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div
      style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: 40 }}
    >
      <h1>Frontend (Vercel)</h1>
      <p>Message from backend:</p>
      <pre>{message}</pre>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
