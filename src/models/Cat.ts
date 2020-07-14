import mongoose, { Schema, Document } from 'mongoose'

export interface ICat extends Document {
  name: string
  owner: Schema.Types.ObjectId
}

const catSchema = new Schema<ICat>({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'owner',
  },
})

export const Cat = mongoose.model<ICat>('cat', catSchema)

export default Cat
