import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true
  },
  fullname: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    require: true
  },
  role: {
    type: String,
    require: true
  }
})

export default mongoose.model('User', userSchema)
