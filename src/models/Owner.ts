import mongoose, { Schema, Document } from 'mongoose'

export interface IOwner extends Document {
  name: string
  cats: [Schema.Types.ObjectId]
}

const ownerSchema = new Schema<IOwner>({
  name: {
    type: String,
    required: true,
  },
  cats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'cat',
    },
  ],
})

export const Owner = mongoose.model<IOwner>('owner', ownerSchema)
export default Owner
