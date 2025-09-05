import bcrypt from 'bcryptjs';
import { prisma } from '../../../prisma/client.js';
import { nanoid } from 'nanoid';

export async function createAdmin({ phone, password, name, email, masterSecret }) {
  console.log('[SUPERADMIN SERVICE] Attempting to create admin for phone:', phone);

  if (masterSecret !== process.env.MASTER_SECRET) {
    console.log('[SUPERADMIN SERVICE] Invalid master secret!');
    throw new Error('توکن معتبر نیست');
  }

  const existing = await prisma.user.findUnique({ where: { phone } });
  if (existing) {
    console.log('[SUPERADMIN SERVICE] Admin with this phone already exists:', phone);
    throw new Error('ادمین با این شماره وجود دارد');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.create({
    data: {
      phone,
      password: hashedPassword,
      role: 'ADMIN',
      name,
      email: email || `${nanoid(6)}@example.com`,
      username: `admin_${nanoid(6)}`,
      isActive: true,
    },
  });

  console.log('[SUPERADMIN SERVICE] Admin created successfully:', admin.id);
  return admin;
}

export async function updateAdmin({ id, phone, password, name, email, masterSecret }) {
  console.log('[SUPERADMIN SERVICE] Attempting to update admin id:', id);

  if (masterSecret !== process.env.MASTER_SECRET) {
    console.log('[SUPERADMIN SERVICE] Invalid master secret!');
    throw new Error('توکن معتبر نیست');
  }

  const data = {};
  if (phone) data.phone = phone;
  if (name) data.name = name;
  if (email) data.email = email;
  if (password) data.password = await bcrypt.hash(password, 10);

  const admin = await prisma.user.update({ where: { id }, data });
  console.log('[SUPERADMIN SERVICE] Admin updated successfully:', admin.id);
  return admin;
}

export async function deleteAdmin({ id, masterSecret }) {
  console.log('[SUPERADMIN SERVICE] Attempting to delete admin id:', id);

  if (masterSecret !== process.env.MASTER_SECRET) {
    console.log('[SUPERADMIN SERVICE] Invalid master secret!');
    throw new Error('توکن معتبر نیست');
  }

  const admin = await prisma.user.delete({ where: { id } });
  console.log('[SUPERADMIN SERVICE] Admin deleted successfully:', admin.id);
  return admin;
}
