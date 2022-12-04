const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    // _id: { type: mongoose.Schema.Types.Mixed },
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
      type: [{ type: Number, ref: "Film" }],
    },
  },
  { timestamps: true }
);

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);
