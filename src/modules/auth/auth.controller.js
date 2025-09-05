import jwt from 'jsonwebtoken';
import { prisma } from '../../../prisma/client.js';
import { generateTokens, saveRefreshToken } from './auth.service.js';

export async function refresh(req, res, next) {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'توکن الزامی است' });

    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored) return res.status(401).json({ message: 'توکن معتبر نیست' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    const tokens = generateTokens(user);
    await saveRefreshToken(user.id, tokens.refreshToken);

    res.json(tokens);
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const { token } = req.body;
    if (token) {
      await prisma.refreshToken.deleteMany({ where: { token } });
    }
    res.json({ message: 'خروج موفقیت‌آمیز بود' });
  } catch (err) {
    next(err);
  }
}
