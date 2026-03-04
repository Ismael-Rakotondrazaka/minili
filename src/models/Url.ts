import { Schema, model, Document } from 'mongoose'

export interface IUrl extends Document {
  code: string
  originalUrl: string
  clicks: number
}

const schema = new Schema<IUrl>(
  {
    code: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Url = model<IUrl>('Url', schema)
