import { prisma } from '../../../prisma/client.js';
import { generateOtp, verifyOtp, generateTokens, saveRefreshToken } from './auth.service.js';

export async function requestCode(req, res, next) {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'شماره موبایل الزامی است' });

    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({ data: { phone, role: 'BUYER' } });
    }

    await generateOtp(phone, 'LOGIN', 'BUYER');
    res.json({ message: 'کد ارسال شد' });
  } catch (err) {
    next(err);
  }
}

export async function verify(req, res, next) {
  try {
    const { phone, code } = req.body;
    await verifyOtp(phone, code, 'LOGIN');

    const user = await prisma.user.findUnique({ where: { phone } });
    const tokens = generateTokens(user);
    await saveRefreshToken(user.id, tokens.refreshToken);

    res.json({ user, ...tokens });
  } catch (err) {
    next(err);
  }
}
