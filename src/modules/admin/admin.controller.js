// src/modules/admin/admin.controller.js

import { prisma } from "../../../prisma/client.js";
import bcrypt from "bcryptjs";

// ================= SELLER =================

// لیست همه فروشنده‌ها
export async function listSellers(req, res) {
  try {
    const sellers = await prisma.sellerProfile.findMany({
      include: { user: true },
    });
    console.log(`[ADMIN] listSellers: fetched ${sellers.length} sellers`);
    res.json(sellers);
  } catch (err) {
    console.error("[ADMIN] listSellers error:", err);
    res.status(500).json({ message: "خطا در دریافت فروشنده‌ها" });
  }
}

// تایید فروشنده
export async function approveSeller(req, res) {
  const { id } = req.params;
  try {
    const result = await prisma.sellerProfile.update({
      where: { id: Number(id) },
      data: { status: "APPROVED",step:"2" },
    });
    console.log(`[ADMIN] approveSeller: seller ${id} approved`);
    res.json(result);
  } catch (err) {
    console.error(`[ADMIN] approveSeller error for id ${id}:`, err);
    res.status(500).json({ message: "خطا در تایید فروشنده" });
  }
}

// رد فروشنده
export async function rejectSeller(req, res) {
  const { id } = req.params;
  try {
    const result = await prisma.sellerProfile.update({
      where: { id: Number(id) },
      data: { status: "REJECTED" },
    });
    console.log(`[ADMIN] rejectSeller: seller ${id} rejected`);
    res.json(result);
  } catch (err) {
    console.error(`[ADMIN] rejectSeller error for id ${id}:`, err);
    res.status(500).json({ message: "خطا در رد فروشنده" });
  }
}

// ================= DRIVER =================

// لیست همه راننده‌ها
export async function listDrivers(req, res) {
  try {
    const drivers = await prisma.driverProfile.findMany({
      include: { user: true },
    });
    console.log(`[ADMIN] listDrivers: fetched ${drivers.length} drivers`);
    res.json(drivers);
  } catch (err) {
    console.error("[ADMIN] listDrivers error:", err);
    res.status(500).json({ message: "خطا در دریافت راننده‌ها" });
  }
}

// ثبت راننده جدید
export async function registerDriver(req, res) {
  const { name, phone, nationalId, licenseNo, vehicleType, password } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) return res.status(400).json({ message: "این شماره قبلا ثبت شده است" });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const driver = await prisma.user.create({
      data: {
        name,
        phone,
        password: hashedPassword,
        role: "DRIVER",
        driverProfile: {
          create: {
            nationalId,
            licenseNo,
            vehicleType,
            status: "PENDING",
          },
        },
      },
      include: { driverProfile: true },
    });

    console.log(`[ADMIN] registerDriver: driver ${driver.id} created`);
    res.json(driver);
  } catch (err) {
    console.error("[ADMIN] registerDriver error:", err);
    res.status(500).json({ message: "خطا در ثبت راننده" });
  }
}

// تایید راننده
export async function approveDriver(req, res) {
  const { id } = req.params;
  try {
    const result = await prisma.driverProfile.update({
      where: { id: Number(id) },
      data: { status: "APPROVED" },
    });
    console.log(`[ADMIN] approveDriver: driver ${id} approved`);
    res.json(result);
  } catch (err) {
    console.error(`[ADMIN] approveDriver error for id ${id}:`, err);
    res.status(500).json({ message: "خطا در تایید راننده" });
  }
}

// رد راننده
export async function rejectDriver(req, res) {
  const { id } = req.params;
  try {
    const result = await prisma.driverProfile.update({
      where: { id: Number(id) },
      data: { status: "REJECTED" },
    });
    console.log(`[ADMIN] rejectDriver: driver ${id} rejected`);
    res.json(result);
  } catch (err) {
    console.error(`[ADMIN] rejectDriver error for id ${id}:`, err);
    res.status(500).json({ message: "خطا در رد راننده" });
  }
}
