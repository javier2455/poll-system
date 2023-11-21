import { POLL_MESSAGES, USERS_MESSAGES } from '../constants/strings.js'
import { PollModel } from '../models/poll.js'
import { validatePoll } from '../schemas/poll.js'
// import { validatePartialPoll, validatePoll } from '../schemas/poll.js'

export class PollController {
  static getAll = async (req, res) => {
    try {
      const polls = await PollModel.getAll()

      if (polls.data === false) {
        return res.status(404).json({ message: POLL_MESSAGES.POLLS_NOT_FOUND })
      }
      res.status(200).json({
        message: POLL_MESSAGES.SATISFACTORY_SEARCH,
        count: polls.length,
        data: polls
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static getById = async (req, res) => {
    res.send('working')
  }

  static create = async (req, res) => {
    if (req.role === 'USER') {
      return res.status(403).json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
    }
    const validatedFields = validatePoll(req.body)

    if (validatedFields.error) {
      return res
        .status(400)
        .json({ error: JSON.parse(validatedFields.error.message) })
    }
    // if (
    //   validatedFields.data.role !== 'USER' &&
    //   validatedFields.data.role !== 'POWER USER' &&
    //   validatedFields.data.role !== 'ADMIN'
    // ) {
    //   return res.status(404).json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
    // }

    const createdPoll = await PollModel.create({
      input: validatedFields.data
    })
    return res.status(201).json({
      message: POLL_MESSAGES.POLL_CREATED,
      data: {
        id: createdPoll._id,
        title: createdPoll.title,
        fields: createdPoll.fields,
        state: createdPoll.state,
        usersThatVoted: createdPoll.usersThatVoted
      }
    })
  }

  static delete = async (req, res) => {
    res.send('working')
  }

  static update = async (req, res) => {
    res.send('working')
  }
}
