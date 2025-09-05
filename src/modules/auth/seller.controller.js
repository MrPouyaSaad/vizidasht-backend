import { prisma } from '../../../prisma/client.js';
import { generateOtp, verifyOtp, generateTokens, saveRefreshToken } from './auth.service.js';

export async function register(req, res, next) {
  try {
    const { phone, firstName, lastName, nationalId, businessId } = req.body;

    let user = await prisma.user.findUnique({ where: { phone } });
    if (user) return res.status(400).json({ message: 'این شماره قبلاً ثبت شده است' });

    user = await prisma.user.create({
      data: {
        phone,
        role: 'SELLER',
        sellerProfile: {
          create: { firstName, lastName, nationalId, businessId, step: 1 }
        }
      },
      include: { sellerProfile: true }
    });

    res.json({ message: 'درخواست ثبت شد', user });
  } catch (err) {
    next(err);
  }
}

export async function status(req, res, next) {
  try {
    const { phone } = req.params;
    const user = await prisma.user.findUnique({
      where: { phone },
      include: { sellerProfile: true }
    });

    if (!user || !user.sellerProfile) return res.status(404).json({ message: 'فروشنده یافت نشد' });

    res.json({ step: user.sellerProfile.step, status: user.sellerProfile.status });
  } catch (err) {
    next(err);
  }
}

export async function sendCode(req, res, next) {
    try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: 'شماره موبایل الزامی است' });

    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({ data: { phone, role: 'SELLER' } });
    }

    await generateOtp(phone, 'REGISTER', 'SELLER');
    res.json({ message: 'کد ارسال شد' });
  } catch (err) {
    next(err);
  }
}


export async function verify(req, res, next) {
  try {
    const { phone, code } = req.body;
    await verifyOtp(phone, code, 'REGISTER');

    const user = await prisma.user.findUnique({ where: { phone } });
    await prisma.sellerProfile.update({
      where: { userId: user.id },
      data: { step: 4, status: 'APPROVED' }
    });

    const tokens = generateTokens(user);
    await saveRefreshToken(user.id, tokens.refreshToken);

    res.json({ tokens });
  } catch (err) {
    next(err);
  }
}