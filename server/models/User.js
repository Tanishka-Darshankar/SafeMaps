import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // ❗ NOT unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // ✅ ONLY email is unique
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
