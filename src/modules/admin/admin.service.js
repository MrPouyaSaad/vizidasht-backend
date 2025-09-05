import { prisma } from "../../prisma/client.js";
import bcrypt from "bcryptjs";

// ================= SELLER =================
export async function getAllSellers() {
  return prisma.sellerProfile.findMany({
    include: { user: true },
  });
}

export async function approveSellerById(id) {
  return prisma.sellerProfile.update({
    where: { id: Number(id) },
    data: { status: "APPROVED" },
  });
}

export async function rejectSellerById(id) {
  return prisma.sellerProfile.update({
    where: { id: Number(id) },
    data: { status: "REJECTED" },
  });
}

// ================= DRIVER =================
export async function getAllDrivers() {
  return prisma.driverProfile.findMany({
    include: { user: true },
  });
}

export async function createDriver({ name, phone, nationalId, licenseNo, vehicleType, password }) {
  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) throw new Error("این شماره قبلا ثبت شده است");

  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  return prisma.user.create({
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
}

export async function approveDriverById(id) {
  return prisma.driverProfile.update({
    where: { id: Number(id) },
    data: { status: "APPROVED" },
  });
}

export async function rejectDriverById(id) {
  return prisma.driverProfile.update({
    where: { id: Number(id) },
    data: { status: "REJECTED" },
  });
}
