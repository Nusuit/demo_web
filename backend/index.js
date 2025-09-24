import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://demo-web-three-pi.vercel.app"],
  })
);

app.use(express.json());

let text = "Hello from backend!";

// Lấy text hiện tại
app.get("/api/text", (req, res) => {
  res.json({ text });
});

// Thêm mới text (POST)
app.post("/api/text", (req, res) => {
  const { newText } = req.body;
  if (typeof newText !== "string") {
    return res.status(400).json({ error: "newText is required" });
  }
  text = newText;
  res.json({ text });
});

// Sửa text (PUT)
app.put("/api/text", (req, res) => {
  const { newText } = req.body;
  if (typeof newText !== "string") {
    return res.status(400).json({ error: "newText is required" });
  }
  text = newText;
  res.json({ text });
});

// Xóa text (DELETE)
app.delete("/api/text", (req, res) => {
  text = "";
  res.json({ text });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
