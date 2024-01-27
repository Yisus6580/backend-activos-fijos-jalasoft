import { Model, Schema, Types, model } from 'mongoose';
import { IUser } from '../interfaces/user';

type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser, UserModel>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: 'attendant',
      enum: {
        values: ['admin', 'attendant'],
        message: '{VALUE} role is invalid',
      },
      required: true,
    },
    image: {
      baseUrl: { type: String, require: false },
      url: { type: String, require: false },
    },
    verifyToken: { type: String, required: false },
    state: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel: UserModel = model<IUser, UserModel>('User', UserSchema);

export default UserModel;
