import mongoose from "mongoose";

export function connect(uri: string): boolean {
  try {
    mongoose.connect(uri);
    return true;
  } catch (err) {
    console.log(err);
  }
  return false;
}
