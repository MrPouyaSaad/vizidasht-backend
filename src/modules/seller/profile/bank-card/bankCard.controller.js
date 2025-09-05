import * as service from "./bankCard.service.js";

export async function listCardsCtrl(req, res) {
  try {
    const cards = await service.listBankCards(req.user.id);
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت کارت‌ها" });
  }
}

export async function addCardCtrl(req, res) {
  try {
    const card = await service.addBankCard(req.user.id, req.body);
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: err.message || "خطا در افزودن کارت" });
  }
}

export async function editCardCtrl(req, res) {
  try {
    const { id } = req.params;
    const card = await service.editBankCard(req.user.id, id, req.body);
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: err.message || "خطا در ویرایش کارت" });
  }
}

export async function deleteCardCtrl(req, res) {
  try {
    const { id } = req.params;
    const result = await service.deleteBankCard(req.user.id, id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "خطا در حذف کارت" });
  }
}

export async function setDefaultCardCtrl(req, res) {
  try {
    const { id } = req.params;
    const result = await service.setDefaultBankCard(req.user.id, id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "خطا در پیشفرض کردن کارت" });
  }
}
