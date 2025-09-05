import jwt from 'jsonwebtoken';
import { prisma } from '../../prisma/client.js';

export const authenticate = () => {
  return async (req, res, next) => {
    try {
      const auth = req.headers.authorization || req.headers.Authorization;
      console.log('[AUTH] Authorization header:', auth);

      if (!auth || !auth.startsWith("Bearer ")) {
        console.log('[AUTH] No token provided');
        return res.status(401).json({ message: "unauthorized" });
      }

      const token = auth.split(" ")[1];
      console.log('[AUTH] Token extracted:', token);

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log('[AUTH] JWT payload:', payload);

      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      console.log('[AUTH] User fetched from DB:', user ? { id: user.id, role: user.role } : null);

      if (!user) {
        console.log('[AUTH] No user found');
        return res.status(401).json({ message: "unauthorized" });
      }

      req.user = user;
      next();
    } catch (e) {
      console.error('[AUTH] Error:', e.message);
      return res.status(401).json({ message: "unauthorized" });
    }
  };
};

export const authorizeRoles = (role) => {
  return (req, res, next) => {
    console.log('[AUTH] Authorize role check:', { user: req.user, requiredRole: role });
    if (!req.user) return res.status(401).json({ message: "unauthorized" });
    if (req.user.role !== role) {
      console.log('[AUTH] Forbidden: role mismatch');
      return res.status(403).json({ message: "forbidden" });
    }
    next();
  };
};
