import { USERS_MESSAGES } from '../constants/strings.js'
import User from '../models/mongodb/user.js'

export const getUserRole = async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(404).json({ message: USERS_MESSAGES.USER_NOT_FOUND })
  }
  req.role = user.role
  next()
}
