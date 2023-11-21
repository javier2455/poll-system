import z from 'zod'
import { USER_FIELDS } from '../constants/strings.js'

const registerUserSchema = z.object({
  username: z.string({
    invalid_type_error: USER_FIELDS.USERNAME_INVALID_TYPE,
    required_error: USER_FIELDS.USERNAME_REQUIERED
  }),
  fullname: z.string({
    invalid_type_error: USER_FIELDS.FULLNAME_INVALID_TYPE,
    required_error: USER_FIELDS.FULLNAME_REQUIERED
  }),
  // fullname: z.number().int().min(1900).max(2024),
  password: z
    .string({
      required_error: USER_FIELDS.PASSWORD_REQUIERED
    })
    .min(8)
})

export function validateRegisterUser(object) {
  return registerUserSchema.safeParse(object)
}
