// src/modules/seller/dashboard/dashboard.controller.js


// import { prisma } from "../../../prisma/client.js";

const persianDays = ["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه"];
const persianMonths = ["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];


export async function carrierStatus(req, res) {
  res.json({
    goingToSeller: true, 
  });
}


export async function satisfaction(req, res) {
  res.json({
    noReturns: "95%", 
    noCancels: "90%", 
    onTimeDelivery: "85%", 
  });
}


export async function finance(req, res) {
  res.json({
    totalIncome: 1200000,
    notPaid: 350000,
    details: {
      totalIncome: 1200000,
      totalPaid: 850000,
      balance: 350000,
    },
    transactions: [
      {
        id: 1,
        userId: 1,
        amount: 250000,
        type: "DEPOSIT",
        description: "سفارش #05161651",
        createdAt: "2025-08-25T14:32:00.000Z"
      },
      {
        id: 2,
        userId: 1,
        amount: 150000,
        type: "WITHDRAW",
        description: "برداشت خودکار درآمد",
        createdAt: "2025-08-27T09:10:00.000Z"
      }
    ]
  });
}


export async function todaySales(req, res) {
  res.json({
    orders: 12,
    amount: 560000
  });
}


export async function weeklyOrders(req, res) {
  const today = new Date();
  const jsDayIndex = today.getDay(); 
  const mapDay = [1,2,3,4,5,6,0]; 
  const persianTodayIndex = mapDay[jsDayIndex];
  let endIndex = (persianTodayIndex - 1 + 7) % 7;

  const days = [];
  for (let i=0; i<7; i++) {
    let idx = (endIndex - (6 - i) + 7) % 7;
    days.push({
      day: persianDays[idx],
      orders: Math.floor(Math.random() * 20) + 1,
    });
  }

  res.json({
    days,
    endsAt: persianDays[endIndex]
  });
}


export async function monthlyOrders(req, res) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentPersianMonthIndex = 5; 

  const months = [];
  for (let i=0; i<12; i++) {
    let idx = (currentPersianMonthIndex - (11 - i) + 12) % 12;
    months.push({
      month: persianMonths[idx],
      orders: Math.floor(Math.random() * 100) + 20
    });
  }

  res.json({
    months,
    endsAt: persianMonths[currentPersianMonthIndex]
  });
}


export async function topProducts(req, res) {
  res.json({
    products: [
      { id: 1, name: "محصول ۱", image: "/images/product1.png", price: 25000, stock: 100 },
      { id: 2, name: "محصول ۲", image: "/images/product2.png", price: 18000, stock: 50 },
      { id: 3, name: "محصول ۳", image: "/images/product3.png", price: 32000, stock: 20 },
      { id: 4, name: "محصول ۴", image: "/images/product4.png", price: 15000, stock: 60 },
      { id: 5, name: "محصول ۵", image: "/images/product5.png", price: 50000, stock: 10 },
      { id: 6, name: "محصول ۶", image: "/images/product6.png", price: 12000, stock: 30 },
    ]
  });
}


export async function ordersSummary(req, res) {
  res.json({
    totalOrders: 200,
    delivered: 150,
    notDelivered: 50
  });
}
