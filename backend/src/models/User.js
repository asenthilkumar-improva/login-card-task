import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['General User', 'Admin'], required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
)

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password
    return ret
  },
})

export const User = mongoose.model('User', userSchema)
