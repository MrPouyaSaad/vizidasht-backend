import * as service from "./messages.service.js";

export async function getMessages(req, res) {
  try {
    const sellerId = req.user.id;
    const messages = await service.listMessages(sellerId);
    res.json(messages);
  } catch (err) {
    console.error("[ERROR] getMessages", err);
    res.status(500).json({ error: "خطا در دریافت پیام‌ها" });
  }
}

export async function readMessage(req, res) {
  try {
    const sellerId = req.user.id;
    const { id } = req.params;
    const result = await service.markMessageRead(sellerId, id);
    res.json(result);
  } catch (err) {
    console.error("[ERROR] readMessage", err);
    res.status(500).json({ error: "خطا در بروزرسانی پیام" });
  }
}
