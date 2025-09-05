import * as service from "./rating.service.js";

export async function getRatingCtrl(req, res) {
  try {
    const rating = await service.getRating(req.user.id);
    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت امتیاز" });
  }
}
