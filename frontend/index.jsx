import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

const API_URL = "https://demo-web-vn1w.onrender.com/api/text"; // Đổi lại thành URL backend thật khi deploy

function App() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lấy text hiện tại
  const fetchText = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setText(data.text);
    } catch (e) {
      setError("Không lấy được dữ liệu từ backend");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchText();
  }, []);

  // Thêm/sửa text
  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: text ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newText: input }),
      });
      const data = await res.json();
      setText(data.text);
      setInput("");
    } catch (e) {
      setError("Lỗi khi lưu dữ liệu");
    }
    setLoading(false);
  };

  // Xóa text
  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, { method: "DELETE" });
      const data = await res.json();
      setText(data.text);
    } catch (e) {
      setError("Lỗi khi xóa dữ liệu");
    }
    setLoading(false);
  };

  return (
    <div
      style={{ fontFamily: "sans-serif", textAlign: "center", marginTop: 40 }}
    >
      <h1>Frontend (Vercel)</h1>
      <p>Text từ backend:</p>
      <pre>{loading ? "Đang tải..." : text || "(trống)"}</pre>
      <div style={{ margin: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập text mới"
          style={{ padding: 4, minWidth: 200 }}
        />
        <button
          onClick={handleSave}
          style={{ marginLeft: 8 }}
          disabled={loading || !input}
        >
          {text ? "Sửa" : "Thêm"}
        </button>
        <button
          onClick={handleDelete}
          style={{ marginLeft: 8 }}
          disabled={loading || !text}
        >
          Xóa
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
