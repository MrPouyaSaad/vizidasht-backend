import { createAdmin, updateAdmin, deleteAdmin } from './superAdmin.service.js';

export async function registerAdmin(req, res, next) {
  try {
    console.log('[SUPERADMIN] registerAdmin called', req.body);
    const { phone, password, name, email, masterSecret } = req.body;

    const admin = await createAdmin({ phone, password, name, email, masterSecret });

    console.log('[SUPERADMIN] registerAdmin success', admin);
    res.json({ message: 'ادمین ساخته شد', admin });
  } catch (err) {
    console.error('[SUPERADMIN] registerAdmin error:', err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function editAdmin(req, res, next) {
  try {
    console.log('[SUPERADMIN] editAdmin called', req.body);
    const { id, phone, password, name, email, masterSecret } = req.body;

    const admin = await updateAdmin({ id, phone, password, name, email, masterSecret });

    console.log('[SUPERADMIN] editAdmin success', admin);
    res.json({ message: 'ادمین ویرایش شد', admin });
  } catch (err) {
    console.error('[SUPERADMIN] editAdmin error:', err.message);
    res.status(400).json({ message: err.message });
  }
}

export async function removeAdmin(req, res, next) {
  try {
    console.log('[SUPERADMIN] removeAdmin called', req.body);
    const { id, masterSecret } = req.body;

    await deleteAdmin({ id, masterSecret });

    console.log('[SUPERADMIN] removeAdmin success for id', id);
    res.json({ message: 'ادمین حذف شد' });
  } catch (err) {
    console.error('[SUPERADMIN] removeAdmin error:', err.message);
    res.status(400).json({ message: err.message });
  }
}
