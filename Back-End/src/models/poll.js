import { POLL_MESSAGES, USERS_MESSAGES } from '../constants/strings.js'
import Poll from './mongodb/poll.js'
import User from './mongodb/user.js'

export class PollModel {
  static getAll = async () => {
    const polls = await Poll.find()
    if (!polls) {
      return { data: false }
    }
    return polls
  }

  static getById = async ({ id }) => {
    const pollFound = await Poll.findById(id)
    if (!pollFound) {
      return { data: false }
    }
    return pollFound
  }

  static create = async ({ input }) => {
    const { title, fields, state, usersThatVoted } = input

    const newPoll = new Poll({
      title,
      fields,
      state,
      usersThatVoted
    })

    const createdPoll = await newPoll.save()
    return createdPoll
  }

  static delete = async ({ id }) => {
    const pollDeleted = await Poll.findByIdAndDelete(id)
    if (!pollDeleted) {
      return { data: false }
    }
    return pollDeleted
  }

  static update = async ({ id, input }) => {
    input.usersThatVoted = []
    input.state = 'MODIFIED'
    const pollUpdated = await Poll.findByIdAndUpdate(id, input, {
      new: true
    })
    if (!pollUpdated) {
      return { data: false }
    }
    return pollUpdated
  }

  static updatePollByVote = async ({ idUser, idPoll, idField }) => {
    // Find is user voted and update the list of users that voted
    const userFound = await User.findById(idUser)
    if (!userFound) {
      return { data: false, message: USERS_MESSAGES.USER_NOT_FOUND }
    }
    const pollFound = await Poll.findById(idPoll)
    if (!pollFound) {
      return { data: false, message: POLL_MESSAGES.POLLS_NOT_FOUND }
    }
    // Verify is the poll is not closed
    if (pollFound.state === 'CLOSED') {
      return { data: false, message: POLL_MESSAGES.POLL_CLOSED }
    }
    if (pollFound.usersThatVoted.some((user) => user === userFound.username)) {
      return { data: false, message: POLL_MESSAGES.POLL_USER_ALREADY_VOTE }
    }
    pollFound.usersThatVoted = [...pollFound.usersThatVoted, userFound.username]
    // Update the field with the vote of the user
    pollFound.fields.map((f) => (f.id === idField ? f.result++ : f.result))
    // Update the poll
    const pollUpdated = await Poll.findByIdAndUpdate(idPoll, pollFound, {
      new: true
    })
    if (!pollUpdated) {
      return { data: false, message: POLL_MESSAGES.POLLS_NOT_UPDATED }
    }
    return pollUpdated
  }

  static closePoll = async ({ id }) => {
    const pollUpdated = await Poll.findByIdAndUpdate(
      id,
      { state: 'CLOSED' },
      {
        new: true
      }
    )
    if (!pollUpdated) {
      return { data: false, message: POLL_MESSAGES.POLLS_NOT_UPDATED }
    }
    return pollUpdated
  }
}
