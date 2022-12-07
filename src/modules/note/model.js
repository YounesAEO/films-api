import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    noteId: { type: Number },
    rating: { type: Number, default: 0, enum: [0, 1, 2, 3, 4, 5] },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
