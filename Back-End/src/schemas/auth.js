import z from 'zod'
import { USER_FIELDS } from '../constants/strings.js'

const authSchema = z.object({
  username: z.string({
    invalid_type_error: USER_FIELDS.USERNAME_INVALID_TYPE,
    required_error: USER_FIELDS.USERNAME_REQUIERED
  }),
  password: z
    .string({
      required_error: USER_FIELDS.PASSWORD_REQUIERED
    })
    .min(8, {
      message: USER_FIELDS.PASSWORD_MIN
    })
})

export function validateAuthentication(object) {
  return authSchema.safeParse(object)
}
