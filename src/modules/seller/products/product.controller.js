// src/modules/seller/products/product.controller.js
import * as service from "./product.service.js";


export async function categories(req, res) {
  try {
    const result = await service.getCategories();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت دسته‌بندی‌ها" });
  }
}

export async function productsByCategory(req, res) {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10, search = "" } = req.query;
    const result = await service.getProductsByCategory(Number(id), Number(page), Number(limit), search);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت محصولات دسته‌بندی" });
  }
}


export async function search(req, res) {
  try {
    const sellerId = req.user.id; // از JWT میاد
    const { q = "" } = req.query;
    const result = await service.searchSellerProducts(sellerId, q);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "خطا در جستجوی محصولات" });
  }
}


export async function sellerProducts(req, res) {
  try {
    const sellerId = req.user.id;
    const result = await service.getSellerProductsSorted(sellerId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "خطا در دریافت محصولات فروشنده" });
  }
}


export async function createProduct(req, res) {
  try {
    const data = req.body;
    const result = await service.addProduct(data);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message || "خطا در افزودن محصول" });
  }
}


export async function editProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await service.updateProduct(Number(id), req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: "خطا در ویرایش محصول" });
  }
}


export async function removeProduct(req, res) {
  try {
    const { id } = req.params;
    const result = await service.deleteProduct(Number(id));
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: "خطا در حذف محصول" });
  }
}
