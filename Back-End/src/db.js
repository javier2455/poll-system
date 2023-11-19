import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost/pollsystem')
    console.log('>>>>>>> Connected to DB')
  } catch (error) {
    console.log(error)
  }
}
