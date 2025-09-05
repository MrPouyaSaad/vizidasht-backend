import * as service from "./tutorials.service.js";

export async function getTutorials(req, res) {
  try {
    const result = await service.listTutorials();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت آموزش‌ها" });
  }
}
