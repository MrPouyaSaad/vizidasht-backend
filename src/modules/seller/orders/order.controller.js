// src/modules/seller/orders/orders.controller.js

// import { prisma } from "../../../prisma/client.js";

// 📌 سفارش‌های جاری (تحویل داده نشده)
export async function activeOrders(req, res) {
  res.json({
    orders: [
      {
        id: 101,
        totalAmount: 320000,
        isSeen: false, // 🔹 لیبل جدید
        createdAt: "2025-09-01 14:22",
        productsPreview: [
          "/images/product1.png",
          "/images/product2.png",
          "/images/product3.png",
        ],
      },
      {
        id: 102,
        totalAmount: 150000,
        isSeen: true,
        createdAt: "2025-09-01 10:05",
        productsPreview: [
          "/images/product4.png",
          "/images/product5.png",
        ],
      },
    ],
  });
}

// 📌 سابقه سفارش‌ها (تحویل داده شده)
export async function deliveredOrders(req, res) {
  res.json({
    orders: [
      {
        id: 90,
        totalAmount: 500000,
        createdAt: "2025-08-28 12:00",
        deliveredAt: "2025-08-29 15:20",
        productsPreview: [
          "/images/product1.png",
          "/images/product2.png",
        ],
      },
    ],
  });
}

// 📌 جزئیات یک سفارش
export async function orderDetails(req, res) {
  const { id } = req.params;

  res.json({
    id,
    invoice: {
      orderId: id,
      orderDate: "2025-09-01",
      orderTime: "14:22",
      receivedAmount: 320000,
    },
    items: [
      {
        id: 1,
        name: "محصول ۱",
        image: "/images/product1.png",
        price: 120000,
        quantity: 2,
        canCancel: true,
      },
      {
        id: 2,
        name: "محصول ۲",
        image: "/images/product2.png",
        price: 80000,
        quantity: 1,
        canCancel: true,
      },
    ],
    canCancelOrder: true,
  });
}

/**
 * کنسل کردن کل سفارش
 */
export async function cancelOrder(req, res) {
  const { id } = req.params;

  // ❌ فعلاً به صورت هاردکد جواب میدیم
  res.json({
    orderId: id,
    status: "CANCELLED",
    message: "سفارش با موفقیت لغو شد",
  });
}

/**
 * کنسل کردن یک آیتم از سفارش
 */
export async function cancelOrderItem(req, res) {
  const { orderId, itemId } = req.params;

  // ❌ فعلاً به صورت هاردکد جواب میدیم
  res.json({
    orderId,
    itemId,
    cancelable: false,
    message: "محصول با موفقیت لغو شد",
  });
}