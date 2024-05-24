import Vote from "../Models/voteModel.js";
import { v4 as uuidv4 } from "uuid";
import User from "../Models/userModel.js";
import { Poll } from "../Models/pollModel.js";

const createVote = async (req, res) => {
  const { pollId, cid } = req.body;

  if (!(pollId && cid)) {
    return res.status(400).json({
      message: "Please provide all the fields!!",
    });
  }

  const user = await User.findById(req.user?._id);
  const poll = await Poll.findById(pollId);
  const candidate = await Poll.findOne({ cid });

  if (!user) {
    return res.status(404).json({
      message: "User not found!!",
    });
  }
  if (!poll) {
    return res.status(404).json({
      message: "Poll not found!!",
    });
  }
  if (!candidate) {
    return res.status(404).json({
      message: "Candidate not found!!",
    });
  }

  // Assign UUID to user if not already assigned
  if (!user.voterUuid) {
    user.voterUuid = uuidv4();
    await user.save();
  }

  // Check if the user has already voted in this poll
  const existingVote = await Vote.findOne({
    // poll: pollId,
    voterUuid: user.voterUuid,
  });

  if (existingVote) {
    return res
      .status(400)
      .json({ message: "User has already voted in this poll" });
  }

  const createVote = await Vote.create({
    poll: pollId,
    voterUuid: user.voterUuid,
    candidate: candidate._id,
  });

  if (!createVote) {
    return res.status(400).json({
      message: "Error creating vote!!",
    });
  }

  res.status(200).json({
    message: `Vote created successfully for ${candidate.name}`,
  });
};

const getTotalVote = async (req, res) => {
  const totalVote = await Vote.countDocuments();

  return res.status(200).json({
    message: `Total votes as of now in this system is: ${totalVote}`,
  });
};

const getVoteCountById = async (req, res) => {
  const candidateId = req.params.id;

  if (!candidateId) {
    return res.status(400).json({
      message: "Provide candidateId!!",
    });
  }

  // Find the candidate by cid
  const candidateAvailable = await Poll.findOne({ cid: candidateId });

  if (!candidateAvailable) {
    return res.status(404).json({
      message: "Candidate not found!!",
    });
  }

  // Count votes for the candidate using the candidate's ObjectId
  const voteCount = await Vote.countDocuments({
    candidate: candidateAvailable._id,
  });

  if (voteCount === 0) {
    return res.status(200).json({
      message: "No vote for this candidate yet!!",
    });
  }

  return res.status(200).json({
    message: `Total votes for the candidate with id ${candidateId} is: ${voteCount}`,
  });
};

export { createVote, getVoteCountById, getTotalVote };
