const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      trim: true,
      default: "",
    },
    favFilms: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Film" }],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
