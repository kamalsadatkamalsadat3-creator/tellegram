import "dotenv/config";
import express from "express";
import cors from "cors";
import { Telegraf } from "telegraf";

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// 🌐 SERVER (API)
// =====================

app.get("/", (req, res) => {
  res.send("Bot + Server is running 🚀");
});

// API برای سایت (مثلاً واریز / برداشت)
app.post("/api/update", (req, res) => {
  const { userId, amount, type } = req.body;

  console.log("Transaction:", { userId, amount, type });

  res.json({
    success: true,
    message: "Updated"
  });
});

// =====================
// 🤖 TELEGRAM BOT
// =====================

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("ربات فعال شد ✅");
});

bot.command("id", (ctx) => {
  ctx.reply(`ID شما: ${ctx.from.id}`);
});

bot.on("text", (ctx) => {
  ctx.reply("پیام دریافت شد ✔️");
});

// =====================
// 🚀 START SERVER
// =====================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// =====================
// 🔥 START BOT (Webhook)
// =====================

const WEBHOOK_URL = process.env.WEBHOOK_URL;

// فعال‌سازی webhook برای Render
bot.launch({
  webhook: {
    domain: WEBHOOK_URL,
    port: PORT
  }
});

console.log("Bot is running 🚀");
