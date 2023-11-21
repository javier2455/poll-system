import z from 'zod'
import { POLL_FIELDS } from '../constants/strings.js'

const pollSchema = z.object({
  title: z.string({
    invalid_type_error: POLL_FIELDS.TITLE_INVALID_TYPE,
    required_error: POLL_FIELDS.TITLE_REQUIERED
  }),
  fields: z.array(
    z.object({ name: z.string(), result: z.number().positive() })
  ),
  // fullname: z.number().int().min(1900).max(2024),
  state: z.string({
    invalid_type_error: POLL_FIELDS.STATE_INVALID_TYPE,
    required_error: POLL_FIELDS.STATE_REQUIERED
  }),
  usersThatVoted: z.array(
    z.string()
    // {
    //   invalid_type_error: POLL_FIELDS.FIELDS_INVALID_TYPE,
    //   required_error: POLL_FIELDS.FIELDS_REQUIERED
    // },
  )
})

export function validatePoll(object) {
  return pollSchema.safeParse(object)
}

export function validatePartialPoll(object) {
  return pollSchema.partial().safeParse(object)
}
