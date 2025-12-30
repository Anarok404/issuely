import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    picture: {
      type: String, // Cloudinary URL
      default:
        "https://res.cloudinary.com/djd94qxqr/image/upload/v1767083795/default_yzzskf.png",
    },

    picturePublicId: {
      type: String, // Cloudinary public_id
      default: "default_yzzskf",
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String, // null for OAuth users
    },

    role: {
      type: String,
      enum: ["student", "staff", "lead"],
      default: "student",
    },
    department: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local",
    },
    contact: {
      type: String,
      match: /^[0-9]{10}$/,
    },
    googleId: String,
    githubId: String,
    profilePicURL: String,
    refreshToken: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
