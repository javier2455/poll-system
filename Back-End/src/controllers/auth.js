import User from '../models/mongodb/user.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../utils/jwt.js'
import { AUTH_ERRORS, AUTH_SUCCESS, USER_ROLES } from '../constants/strings.js'

export const register = async (req, res) => {
  try {
    const { username, fullname, password, avatar } = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      fullname,
      password: hashPassword,
      avatar,
      role: USER_ROLES.USER
    })

    const result = await newUser.save()

    const token = await createAccessToken({ id: result._id })
    res.cookie('token', token)

    return res.status(201).json({
      message: 'New user created',
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

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const userFound = await User.findOne({ username })
    if (!userFound) {
      return res.status(404).json({ message: AUTH_ERRORS.USER_NOT_FOUND })
    }

    const correctPassword = await bcrypt.compare(password, userFound.password)
    if (!correctPassword) {
      return res.status(404).json({ message: AUTH_ERRORS.INCORRECT_PASSWORD })
    }

    // const result = await newUser.save()

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

export const logout = async (req, res) => {
  res.cookie('token', '', { expires: new Date(0) })
  return res.status(200).json({ message: AUTH_SUCCESS.LOGOUT })
}

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id)
    if (!userFound) {
      return res.status(404).json({ message: AUTH_ERRORS.USER_NOT_FOUND })
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
