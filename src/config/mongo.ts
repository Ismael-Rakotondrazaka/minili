import mongoose from 'mongoose'

export async function connectDb(): Promise<void> {
  const uri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/minili'

  await mongoose.connect(uri)
  console.log('MongoDB connected')
}
