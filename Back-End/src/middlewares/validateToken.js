import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import { AUTH_ERRORS } from '../constants/strings.js'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ message: AUTH_ERRORS.NOT_TOKEN })
  }
  jwt.verify(token, TOKEN_SECRET, (err, info) => {
    if (err) {
      return res.status(403).json({ message: AUTH_ERRORS.INVALID_TOKEN })
    }
    req.user = info
    next()
  })
}
