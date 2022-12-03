import mongoose from "mongoose";

const filmSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: {
      type: String,
      // required: true,
    },
    synopsis: {
      type: String,
      // required: true,
    },
    coverPic: {
      type: String,
      // required: true,
    },
    releaseDate: {
      type: Date,
      // required: true,
    },
    releaseCountry: {
      type: String,
    },
    director: {
      type: String,
      // required: true,
    },
    trailerURL: {
      type: String,
      // required: true,
    },
    totalRatings: {
      type: Number,
      // required: true,
    },
    avarageRating: {
      type: Number,
      // required: true,
    },
    duration: {
      type: Number,
      // required: true,
    },
    categories: {
      type: [{ type: String }],
      // required: true,
    },
    actors: {
      type: [{ type: String }],
      // required: true,
    },
  },
  { timestamps: true, _id: false }
);

const Film = mongoose.model("Film", filmSchema);

export default Film;
