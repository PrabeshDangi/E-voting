import { Poll } from "../Models/pollModel.js";

const getAllCandidates = async (req, res) => {
  const result = await Poll.find();

  const count = result.length;
  if (count === 0) {
    return res.status(404).json({
      message: "No candidate registered found!!",
    });
  }
  res.status(200).json({
    message: `All ${count} Candidate fetched successfully!!`,
    data: result,
  });
};

const getCandidateById = async (req, res) => {
  const { cid } = req.body;
  if (!cid) {
    return res.status(400).json({
      message: "Provide the candidate id!!",
    });
  }

  const result = await Poll.find({ cid });
  if (!result) {
    return res.status(404).json({
      message: "Invalid Id!!",
    });
  }
  res.status(200).json({
    message: "Data fetched successfully!!",
    data: result,
  });
};

const createCandidate = async (req, res) => {
  const { cid, icon, name, party } = req.body;
  if ([cid, icon, name, party].some((field) => field?.trim() === "")) {
    return res.status(400).json({
      message: "All the fields are required!!",
    });
  }
  const candidateAvailable = await Poll.findOne({ cid });
  if (candidateAvailable) {
    return res.status(400).json({
      message: `Candidate with cid ${cid} already registered!!`,
    });
  }
  const candidate = await Poll.create({
    cid,
    icon,
    name,
    party,
  });
  if (!candidate) {
    return res.status(400).json({
      message: "Error creating the candidate!!",
    });
  }

  res.status(201).json({
    message: `Poll created successfully for candidateId ${cid}`,
    data: candidate,
  });
};

const updateCandidate = async (req, res) => {
  const { icon, name, party } = req.body;

  if (!(icon || name || party)) {
    return res.status(400).json({
      message: "Please provide at least one field to update!!",
    });
  }

  const candidateId = req.params.id;

  const isCandidateAvailable = await Poll.findOne({ cid: candidateId });

  if (!isCandidateAvailable) {
    return res.status(404).json({
      message: "Candidate not available!!",
    });
  }
  const updateData = {};

  if (name) updateData.name = name;
  if (icon) updateData.icon = icon;
  if (party) updateData.party = party;

  const result = await Poll.findByIdAndUpdate(
    isCandidateAvailable._id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    return res.status(500).json({
      message: "Failed to update data!!",
    });
  }

  res.status(200).json({
    message: "Candidate data updated successfully!!",
    data: result,
  });
};

const deleteCandidate = async (req, res) => {
  const candidateId = req.params.id;

  const isCandidateAvailable = await Poll.findOne({ cid: candidateId });
  if (!isCandidateAvailable) {
    return res.status(404).json({
      message: "Candidate not available!!",
    });
  }

  await Poll.findByIdAndDelete(isCandidateAvailable._id);

  res.status(200).json({
    message: "Candidate data deleted sucessfully!!",
  });
};

export {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
};
