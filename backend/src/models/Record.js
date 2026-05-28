import mongoose from 'mongoose'

const recordSchema = new mongoose.Schema(
  {
    recordId: { type: String, required: true, unique: true },
    ownerUserId: { type: String, required: true },
    title: { type: String, required: true },
    accessLevel: { type: String, required: true },
    status: { type: String, required: true },
    updatedAtLabel: { type: String, required: true },
  },
  { timestamps: true },
)

export const Record = mongoose.model('Record', recordSchema)
