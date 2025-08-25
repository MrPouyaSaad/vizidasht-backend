import jwt from 'jsonwebtoken'

export const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const header = req.headers.authorization || ''
      const token = header.startsWith('Bearer ') ? header.slice(7) : null
      if (!token) return res.status(401).json({ message: 'توکن احراز هویت یافت نشد' })
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      req.user = payload
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: 'دسترسی غیرمجاز' })
      }
      next()
    } catch (e) {
      return res.status(401).json({ message: 'توکن نامعتبر' })
    }
  }
}
