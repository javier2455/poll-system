import { AUTH_ERRORS, USER_ROLES } from '../constants/strings.js'
import User from './mongodb/user.js'
import bcrypt from 'bcryptjs'

export class AuthModel {
  static register = async ({ user }) => {
    const { username, fullname, password } = user

    const userFound = await User.findOne({ username })
    if (userFound) {
      return { data: false, message: [AUTH_ERRORS.USERNAME_EXIST] }
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      fullname,
      password: hashPassword,
      avatar: '',
      role: USER_ROLES.USER
    })

    const result = await newUser.save()

    return result
  }

  static login = async ({ user }) => {
    const { username, password } = user

    const userFound = await User.findOne({ username })
    if (!userFound) {
      return { userfound: false }
    }

    const correctPassword = await bcrypt.compare(password, userFound.password)
    if (!correctPassword) {
      return { correctPassword: false }
    }

    return userFound
  }

  static profile = async ({ id }) => {
    const userFound = await User.findById(id)
    if (!userFound) {
      return { userfound: false }
    }
    return userFound
  }
}
