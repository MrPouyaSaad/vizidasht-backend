import bcrypt from 'bcryptjs';
import { prisma } from '../../../prisma/client.js';
import { generateTokens, saveRefreshToken } from './auth.service.js';

export async function login(req, res, next) {
  try {
    console.log('[LOGIN] Body:', req.body);

    const { username, phone, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        role: 'ADMIN',
        OR: [{ username }, { phone }]
      }
    });

    console.log('[LOGIN] Found user:', user);

    if (!user) {
      console.log('[LOGIN] No admin found with provided username/phone');
      return res.status(400).json({ message: 'ادمین یافت نشد' });
    }

    const valid = await bcrypt.compare(password, user.password);
    console.log('[LOGIN] Password valid:', valid);

    if (!valid) return res.status(401).json({ message: 'رمز اشتباه است' });

    const tokens = generateTokens(user);
    await saveRefreshToken(user.id, tokens.refreshToken);

    console.log('[LOGIN] Tokens generated:', tokens);

    res.json({ user, ...tokens });
  } catch (err) {
    console.error('[LOGIN] Error:', err);
    next(err);
  }
}
