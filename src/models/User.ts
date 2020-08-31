import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  login: string
  password: string
}

const userSchema = new Schema<IUser>({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const User = mongoose.model<IUser>('user', userSchema)
export default User
