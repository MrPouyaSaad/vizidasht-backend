import * as service from "./comments.service.js";

export async function getReviews(req, res) {
  try {
    const reviews = await service.listReviews(req.user.id);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت نظرات" });
  }
}

export async function replyReviewCtrl(req, res) {
  try {
    const { id } = req.params;
    const result = await service.replyReview(req.user.id, id, req.body.replyText);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "خطا در پاسخ به نظر" });
  }
}
