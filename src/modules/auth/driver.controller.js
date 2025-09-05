import { prisma } from '../../../prisma/client.js';
import { generateOtp, verifyOtp, generateTokens, saveRefreshToken } from './auth.service.js';

export async function requestCode(req, res, next) {
  try {
    const { phone } = req.body;
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user || user.role !== 'DRIVER') {
      return res.status(400).json({ message: 'راننده یافت نشد' });
    }

    await generateOtp(phone, 'LOGIN', 'DRIVER');
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
