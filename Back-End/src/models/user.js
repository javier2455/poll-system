import User from './mongodb/user.js'
import bcrypt from 'bcryptjs'

export class UserModel {
  static getAll = async () => {
    const users = await User.find()
    if (!users) {
      return { data: false }
    }
    return users
  }

  static getById = async ({ id }) => {
    const userFound = await User.findById(id)
    if (!userFound) {
      return { data: false }
    }
    return userFound
  }

  static create = async ({ input }) => {
    const { username, fullname, password, avatar, role } = input

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      fullname,
      password: hashPassword,
      avatar,
      role
    })

    const createdUser = await newUser.save()
    return createdUser
  }

  static delete = async ({ id }) => {
    const userDeleted = await User.findByIdAndDelete(id)
    if (!userDeleted) {
      return { data: false }
    }
    return userDeleted
  }

  static update = async ({ id, input }) => {
    const userUpdated = await User.findByIdAndUpdate(id, input, {
      new: true
    })
    if (!userUpdated) {
      return { data: false }
    }
    return userUpdated
  }
}
