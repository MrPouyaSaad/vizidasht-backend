// src/modules/seller/products/product.service.js
// import { prisma } from "../../../prisma/client.js";

export async function getCategories() {
  console.log("[INFO] Fetching all categories");
  return [
    { id: 1, name: "مواد غذایی" },
    { id: 2, name: "آرایشی بهداشتی" },
    { id: 3, name: "لبنیات" },
  ];
}

export async function getProductsByCategory(categoryId, page = 1, limit = 10, search = "") {
  console.log(`[INFO] Fetching products for category=${categoryId}, page=${page}, limit=${limit}, search=${search}`);


  const all = [
    { id: 1, name: "ماکارونی",image: "/images/product4.png", price: 25000, stock: 120 },
    { id: 2, name: "شیر کم‌چرب", image: "/images/product3.png", price: 18000, stock: 60 },
    { id: 3, name: "ماست سون", image: "/images/product1.png", price: 35000, stock: 90 },
  ];

  let filtered = all.filter(p => p.name.includes(search));
  let paged = filtered.slice((page - 1) * limit, page * limit);

  return {
    total: filtered.length,
    page,
    limit,
    items: paged,
  };
}

export async function searchSellerProducts(sellerId, query = "") {
  console.log(`[INFO] Searching products of seller=${sellerId}, query=${query}`);
  return [
    { id: 1, name: "ماکارونی", image: "/uploads/products/makaroni.jpg", price: 25000, stock: 120 },
  ];
}

export async function getSellerProductsSorted(sellerId) {
  console.log(`[INFO] Fetching products of seller=${sellerId} sorted by stock`);
  return [
    { id: 1, name: "شیر کم‌چرب", image: "/images/product3.png", price: 18000, stock: 60 },
    { id: 2, name: "ماست سون", image: "/images/product1.png", price: 35000, stock: 90 },
    { id: 3, name: "ماکارونی", image: "/images/product4.png", price: 25000, stock: 120 },
  ];
}

export async function addProduct(data) {
  console.log("[INFO] Adding new product:", data);
  if (!data.name || !data.consumerPrice || !data.stock) {
    throw new Error("تمامی فیلدهای اجباری باید پر شوند");
  }
  return {
    id: 99,
    ...data,
    createdAt: new Date(),
  };
}

export async function updateProduct(productId, data) {
  console.log(`[INFO] Updating product id=${productId}`, data);
  return {
    id: productId,
    ...data,
    updatedAt: new Date(),
  };
}

export async function deleteProduct(productId) {
  console.log(`[INFO] Deleting product id=${productId}`);
  return { success: true };
}
