import mongoose from 'mongoose'

const field = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  result: {
    type: Number
  }
})

const pollSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    fields: {
      type: [field],
      required: true
    },
    state: {
      type: String,
      required: true
    },
    usersThatVoted: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Poll', pollSchema)
