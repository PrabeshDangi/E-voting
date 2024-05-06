import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  cid: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
    require: true,
    unique: true,
  },
});

const Poll = mongoose.model("Poll", pollSchema);
export { Poll };
