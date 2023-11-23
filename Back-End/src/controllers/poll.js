import { POLL_MESSAGES, USERS_MESSAGES } from '../constants/strings.js'
import { PollModel } from '../models/poll.js'
import { validatePartialPoll, validatePoll } from '../schemas/poll.js'
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
    try {
      const pollFound = await PollModel.getById({ id: req.params.id })
      if (pollFound.data === false) {
        return res.status(404).json({ message: POLL_MESSAGES.POLL_NOT_FOUND })
      }
      res
        .status(200)
        .json({ message: POLL_MESSAGES.SATISFACTORY_SEARCH, data: pollFound })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static create = async (req, res) => {
    try {
      if (req.role === 'USER') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const validatedFields = validatePoll(req.body)

      if (validatedFields.error) {
        return res
          .status(400)
          .json({ error: JSON.parse(validatedFields.error.message) })
      }

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
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static delete = async (req, res) => {
    try {
      if (req.role === 'USER') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const pollDeleted = await PollModel.delete({ id: req.params.id })
      if (pollDeleted.data === false) {
        return res.status(404).json({ message: POLL_MESSAGES.POLLS_NOT_FOUND })
      }
      res
        .status(200)
        .json({ message: POLL_MESSAGES.POLL_DELETED, data: pollDeleted })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static update = async (req, res) => {
    try {
      if (req.role === 'USER') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const validatedFields = validatePartialPoll(req.body)

      if (validatedFields.error) {
        return res
          .status(400)
          .json({
            message: JSON.parse(
              validatedFields.error.error.map((err) => err.message)
            )
          })
      }
      const pollUpdated = await PollModel.update({
        id: req.params.id,
        input: validatedFields.data
      })
      if (pollUpdated.data === false) {
        return res.status(404).json({ message: POLL_MESSAGES.POLLS_NOT_FOUND })
      }
      res
        .status(200)
        .json({ message: POLL_MESSAGES.POLL_UPDATED, data: pollUpdated })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static updatePollByVote = async (req, res) => {
    try {
      const pollUpdated = await PollModel.updatePollByVote({
        idUser: req.user.id,
        idPoll: req.params.id,
        idField: req.params.inputId
      })
      if (pollUpdated?.data === false) {
        return res.status(404).json({ message: pollUpdated.message })
      }
      res
        .status(200)
        .json({ message: POLL_MESSAGES.POLL_VOTE_UPDATED, data: pollUpdated })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static closePoll = async (req, res) => {
    try {
      if (req.role === 'USER') {
        return res
          .status(403)
          .json({ message: USERS_MESSAGES.USER_INVALID_ROLE })
      }
      const closedPoll = await PollModel.closePoll({
        id: req.params.id
      })
      if (closedPoll?.data === false) {
        return res.status(404).json({ message: closedPoll.message })
      }
      res
        .status(200)
        .json({ message: POLL_MESSAGES.POLL_CLOSED, data: closedPoll })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
