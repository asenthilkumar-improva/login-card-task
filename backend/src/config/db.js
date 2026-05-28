import mongoose from 'mongoose'

export async function connectDb(mongoUri) {
  await mongoose.connect(mongoUri)
  console.log('MongoDB connected')
}
