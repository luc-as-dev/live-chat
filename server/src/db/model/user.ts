import mongoose, { Schema } from "mongoose";

interface IUser {
  username: string;
  password: string;
  friends: IUser[];
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
    friends: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
