import * as service from "./faq.service.js";

export async function listFAQs(req, res) {
  try {
    const faqs = await service.getAllFAQs();
    res.json(faqs);
  } catch (err) {
    console.error("[ERROR] listFAQs", err);
    res.status(500).json({ error: "خطا در دریافت سوالات" });
  }
}

export async function addFAQ(req, res) {
  try {
    const result = await service.createFAQ(req.body);
    res.json(result);
  } catch (err) {
    console.error("[ERROR] addFAQ", err);
    res.status(500).json({ error: "خطا در ایجاد سوال" });
  }
}
