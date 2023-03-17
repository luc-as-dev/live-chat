import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      minlength: 4,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
