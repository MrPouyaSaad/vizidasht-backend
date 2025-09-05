import jwt from 'jsonwebtoken';
import { prisma } from '../../../prisma/client.js';
import { randomInt } from 'crypto';

export function generateTokens(user) {
  const payload = { id: user.id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '60m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

  return { accessToken, refreshToken };
}

export async function saveRefreshToken(userId, token) {
  return prisma.refreshToken.create({
    data: { userId, token, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
  });
}

export async function generateOtp(phone, purpose, roleHint = null) {
  const code = randomInt(100000, 999999).toString();
  await prisma.otpCode.create({
    data: {
      phone,
      code,
      purpose,
      roleHint,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000) 
    }
  });
  console.log(`📲 OTP for ${phone}: ${code}`);
  return code;
}

export async function verifyOtp(phone, code, purpose) {
  const otp = await prisma.otpCode.findFirst({
    where: { phone, code, purpose, consumed: false, expiresAt: { gt: new Date() } }
  });

  if (!otp) throw new Error('کد نامعتبر یا منقضی شده است');

  await prisma.otpCode.update({ where: { id: otp.id }, data: { consumed: true } });
  return true;
}
