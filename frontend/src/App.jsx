import React, { useState, useEffect } from "react";
const API_URL = "http://localhost:3001/api/text"; // Đổi lại khi deploy

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
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 32,
          minWidth: 340,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 18, marginBottom: 8, color: "#333" }}>
          Text từ backend:
        </p>
        <pre
          style={{
            background: "#f4f6fb",
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            minHeight: 32,
            color: "#222",
            marginBottom: 20,
          }}
        >
          {loading ? "Đang tải..." : text || "(trống)"}
        </pre>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập text mới"
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #b5b5b5",
              fontSize: 15,
              flex: 1,
              outline: "none",
              transition: "border 0.2s",
            }}
          />
          <button
            onClick={handleSave}
            disabled={loading || !input}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "none",
              background: "#4f8cff",
              color: "#fff",
              fontWeight: 600,
              cursor: loading || !input ? "not-allowed" : "pointer",
              opacity: loading || !input ? 0.6 : 1,
              transition: "background 0.2s",
            }}
          >
            {text ? "Sửa" : "Thêm"}
          </button>
          <button
            onClick={handleDelete}
            disabled={loading || !text}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              border: "none",
              background: "#ff4f4f",
              color: "#fff",
              fontWeight: 600,
              cursor: loading || !text ? "not-allowed" : "pointer",
              opacity: loading || !text ? 0.6 : 1,
              transition: "background 0.2s",
            }}
          >
            Xóa
          </button>
        </div>
        {error && (
          <div style={{ color: "#ff4f4f", fontWeight: 500 }}>{error}</div>
        )}
      </div>
    </div>
  );
}

export default App;
