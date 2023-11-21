import { USERS_MESSAGES } from '../constants/strings.js'
import { UserModel } from '../models/user.js'
import { validatePartialUser, validateUser } from '../schemas/users.js'

export class UserController {
  static getAll = async (req, res) => {
    try {
      if (req.role !== 'ADMIN') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const users = await UserModel.getAll()

      if (users.data === false) {
        return res.status(404).json({ message: USERS_MESSAGES.USERS_NOT_FOUND })
      }
      res.status(200).json({
        message: USERS_MESSAGES.SATISFACTORY_SEARCH,
        count: users.length,
        data: users
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static getById = async (req, res) => {
    try {
      if (req.role !== 'ADMIN') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const userFound = await UserModel.getById({ id: req.params.id })
      if (userFound.data === false) {
        return res.status(404).json({ message: USERS_MESSAGES.USER_NOT_FOUND })
      }
      res
        .status(200)
        .json({ message: USERS_MESSAGES.SATISFACTORY_SEARCH, data: userFound })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static create = async (req, res) => {
    try {
      if (req.role !== 'ADMIN') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const validatedFields = validateUser(req.body)

      if (validatedFields.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(validatedFields.error.message) })
      }

      if (
        validatedFields.data.role !== 'USER' &&
        validatedFields.data.role !== 'POWER USER' &&
        validatedFields.data.role !== 'ADMIN'
      ) {
        return res
          .status(404)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }

      const createdUser = await UserModel.create({
        input: validatedFields.data
      })
      return res.status(201).json({
        message: USERS_MESSAGES.USER_CREATED,
        data: {
          id: createdUser._id,
          username: createdUser.username,
          fullname: createdUser.fullname,
          avatar: createdUser.avatar,
          role: createdUser.role
        }
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static delete = async (req, res) => {
    try {
      if (req.role !== 'ADMIN') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const userDeleted = await UserModel.delete({ id: req.params.id })
      if (userDeleted.data === false) {
        return res.status(404).json({ message: USERS_MESSAGES.USER_NOT_FOUND })
      }
      res
        .status(200)
        .json({ message: USERS_MESSAGES.USER_DELETED, data: userDeleted })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static update = async (req, res) => {
    try {
      if (req.role !== 'ADMIN') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const validatedFields = validatePartialUser(req.body)

      if (validatedFields.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(validatedFields.error.message) })
      }
      if (
        validatedFields.data.role !== 'USER' &&
        validatedFields.data.role !== 'POWER USER' &&
        validatedFields.data.role !== 'ADMIN'
      ) {
        return res
          .status(404)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const userUpdated = await UserModel.update({
        id: req.params.id,
        input: validatedFields.data
      })
      if (userUpdated.data === false) {
        return res.status(404).json({ message: USERS_MESSAGES.USER_NOT_FOUND })
      }
      res
        .status(200)
        .json({ message: USERS_MESSAGES.USER_UPDATED, data: userUpdated })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
