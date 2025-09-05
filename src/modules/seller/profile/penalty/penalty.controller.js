import * as service from "./penalty.service.js";

export async function listPenalties(req, res) {
  try {
    const penalties = await service.getAllPenalties();
    res.json(penalties);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت جریمه‌ها" });
  }
}

export async function addPenalty(req, res) {
  try {
    const result = await service.createPenalty(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "خطا در ثبت جریمه" });
  }
}
