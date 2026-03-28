import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // ✅ NEW: Granular Access Control
    // Replaces the single `isPaidUser` boolean
    access: {
      tests: { type: Boolean, default: false },
      materials: { type: Boolean, default: false },
      // You can easily add more later:
      // videos: { type: Boolean, default: false }
    },
  },
  { timestamps: true },
);

export default models.User || mongoose.model("User", UserSchema);
