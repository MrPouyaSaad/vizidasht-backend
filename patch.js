// patch.js
import fs from "fs";
import path from "path";

const base = path.resolve("./src");

// helper برای نوشتن فایل
function writeFile(relPath, content) {
  const absPath = path.join(base, relPath);
  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, content, "utf8");
  console.log("✅ Created/Updated:", relPath);
}

// اضافه کردن auth ادمین
writeFile("modules/admin/admin.auth.js", `import prisma from "../../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function adminLogin(username, password) {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) throw new Error("ادمین یافت نشد");
  const ok = await bcrypt.compare(password, admin.password);
  if (!ok) throw new Error("رمز عبور اشتباه است");
  const token = jwt.sign({ role: "admin", id: admin.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return { token };
}
`);

// اضافه کردن مدل Seller مراحل ثبت نام
writeFile("modules/seller/seller.register.service.js", `import prisma from "../../lib/prisma.js";

// مرحله ۱: ثبت اطلاعات اولیه
export async function stepOneRegister(data) {
  return prisma.sellerDraft.create({
    data: {
      mobile: data.mobile,
      firstName: data.firstName,
      lastName: data.lastName,
      nationalCode: data.nationalCode,
    }
  });
}

// مرحله ۲: تایید شماره صنفی توسط ادمین
export async function verifyBusinessId(id, businessId, approved) {
  if (!approved) {
    await prisma.sellerDraft.delete({ where: { id } });
    return { status: "rejected" };
  }
  return prisma.sellerDraft.update({
    where: { id },
    data: { businessId, businessVerified: true }
  });
}

// مرحله ۳: ارسال کد تایید
export async function sendOtp(id) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await prisma.sellerDraft.update({
    where: { id },
    data: { otp }
  });
  // در اینجا باید سرویس ارسال SMS اضافه شود
  return { message: "کد تایید ارسال شد" };
}

// تایید نهایی و تبدیل به Seller اصلی
export async function confirmOtp(id, code) {
  const draft = await prisma.sellerDraft.findUnique({ where: { id } });
  if (!draft || draft.otp !== code) throw new Error("کد اشتباه است");
  const seller = await prisma.seller.create({
    data: {
      mobile: draft.mobile,
      firstName: draft.firstName,
      lastName: draft.lastName,
      nationalCode: draft.nationalCode,
      businessId: draft.businessId
    }
  });
  await prisma.sellerDraft.delete({ where: { id } });
  return seller;
}
`);
