import Poll from './mongodb/poll.js'

export class PollModel {
  static getAll = async () => {
    const polls = await Poll.find()
    if (!polls) {
      return { data: false }
    }
    return polls
  }

  //   static getById = async ({ id }) => {
  //     const userFound = await User.findById(id)
  //     if (!userFound) {
  //       return { data: false }
  //     }
  //     return userFound
  //   }

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

  //   static delete = async ({ id }) => {
  //     const userDeleted = await User.findByIdAndDelete(id)
  //     if (!userDeleted) {
  //       return { data: false }
  //     }
  //     return userDeleted
  //   }

  //   static update = async ({ id, input }) => {
  //     const userUpdated = await User.findByIdAndUpdate(id, input, {
  //       new: true
  //     })
  //     if (!userUpdated) {
  //       return { data: false }
  //     }
  //     return userUpdated
  //   }
}
