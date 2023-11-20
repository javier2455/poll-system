import z from 'zod'
import { USER_FIELDS, USER_ROLES } from '../constants/strings'

const userSchema = z.object({
  username: z.string({
    invalid_type_error: USER_FIELDS.USERNAME_INVALID_TYPE,
    required_error: USER_FIELDS.USERNAME_REQUIERED
  }),
  fullname: z.string({
    invalid_type_error: USER_FIELDS.FULLNAME_INVALID_TYPE,
    required_error: USER_FIELDS.FULLNAME_REQUIERED
  }),
  // fullname: z.number().int().min(1900).max(2024),
  password: z.string({
    required_error: USER_FIELDS.PASSWORD_REQUIERED
  }),
  avatar: z.string(),
  role: z.string(
    z.enum(USER_ROLES.USER || USER_ROLES.POWER_USER || USER_ROLES.ADMIN)
  )
})

export function validateMovie(object) {
  return userSchema.safeParse(object)
}

export function validatePartialMovie(object) {
  return userSchema.partial().safeParse(object)
}
