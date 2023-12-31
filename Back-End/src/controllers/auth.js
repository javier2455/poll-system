import { createAccessToken } from '../utils/jwt.js'
import jwt from 'jsonwebtoken'
import { AUTH_ERRORS, AUTH_SUCCESS } from '../constants/strings.js'
import { AuthModel } from '../models/auth.js'
import { validateAuthentication } from '../schemas/auth.js'
import { validateRegisterUser } from '../schemas/registerUser.js'
import { TOKEN_SECRET } from '../config.js'

export class AuthController {
  static register = async (req, res) => {
    try {
      const validatedFields = validateRegisterUser(req.body)

      if (validatedFields.error) {
        return res.status(400).json({
          message: validatedFields.error.errors.map((err) => err.message)
        })
      }
      const result = await AuthModel.register({ user: validatedFields.data })
      if (result.data === false) {
        return res.status(404).json({ message: result.message })
      }
      const token = await createAccessToken({ id: result._id })
      res.cookie('token', token)

      return res.status(201).json({
        message: AUTH_SUCCESS.USER_CREATED,
        data: {
          id: result._id,
          username: result.username,
          fullname: result.fullname,
          avatar: result.avatar,
          role: result.role
        }
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static login = async (req, res) => {
    try {
      const validatedFields = validateAuthentication(req.body)

      if (validatedFields.error) {
        return res.status(400).json({
          message: validatedFields.error.errors.map((err) => err.message)
        })
      }
      const userFound = await AuthModel.login({ user: validatedFields.data })
      if (userFound.userfound === false) {
        return res.status(404).json({ message: [AUTH_ERRORS.USER_NOT_FOUND] })
      }
      if (userFound.correctPassword === false) {
        return res
          .status(404)
          .json({ message: [AUTH_ERRORS.INCORRECT_PASSWORD] })
      }

      const token = await createAccessToken({ id: userFound._id })
      res.cookie('token', token)

      return res.status(200).json({
        message: AUTH_SUCCESS.CORRECTS_CREDENTIALS,
        data: {
          id: userFound._id,
          username: userFound.username,
          fullname: userFound.fullname,
          avatar: userFound.avatar,
          role: userFound.role
        }
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static logout = async (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    return res.status(200).json({ message: [AUTH_SUCCESS.LOGOUT] })
  }

  static verifyToken = async (req, res) => {
    const token = req.cookies
    if (!token) {
      return res.status(401).json({ message: [AUTH_ERRORS.NOT_TOKEN] })
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ message: [AUTH_ERRORS.USERS_NOT_AUTHORIZED] })
      }

      const userFound = await AuthModel.login({ user: user.id })
      if (userFound.userfound === false) {
        return res.status(404).json({ message: [AUTH_ERRORS.USER_NOT_FOUND] })
      }

      return res.status(200).json({
        message: [AUTH_SUCCESS.CORRECTS_CREDENTIALS],
        data: {
          id: userFound._id,
          username: userFound.username,
          fullname: userFound.fullname,
          avatar: userFound.avatar,
          role: userFound.role
        }
      })
    })
  }

  static profile = async (req, res) => {
    try {
      const userFound = await AuthModel.profile({ id: req.user.id })
      if (userFound.userfound === false) {
        return res.status(404).json({ message: [AUTH_ERRORS.USER_NOT_FOUND] })
      }
      return res.status(200).json({
        message: AUTH_SUCCESS.PROFILE_INFO,
        data: {
          id: userFound._id,
          username: userFound.username,
          fullname: userFound.fullname,
          avatar: userFound.avatar,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt
        }
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
