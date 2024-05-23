import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const voteSchema = new mongoose.Schema({
  poll: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll", // Reference to the Poll model
    required: true,
  },
  voterUuid: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll", // Reference to the Poll model (candidate)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user can only vote once per poll (based on UUID)
// voteSchema.index({ poll: "1", voterUuid: "1" }, { unique: true });

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
