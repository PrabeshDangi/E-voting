import User from "../Models/userModel.js";
import sendtoken from "../utils/sendAuthToken.js";

const registerUser = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      address,
      phone,
      gender,
      password,
      email,
      dob,
    } = req.body;

    if (
      [firstname, lastname, address, phone, gender, password, email, dob].some(
        (fields) => fields?.trim() === ""
      )
    ) {
      return res.status(400).json({
        message: "All the fields are required!!",
      });
    }

    const registeredUser = await User.findOne({
      $or: [{ phone }, { email }],
    });

    if (registeredUser) {
      return res.status(400).json({
        message: "Email already registered!! ",
      });
    }
    const dobDate = new Date(dob);

    const user = await User.create({
      firstname,
      lastname,
      phone,
      address,
      gender,
      dob: dobDate,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(400).json({
        message: "Error during registration!!",
      });
    }

    return res.status(201).json({
      message: "User registered successfully!!",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logInUser = async (req, res) => {
  const { email, password, phone } = req.body;
  if (!(email || password || phone)) {
    return res.status(400).json({
      message: "All the fields are required!!",
    });
  }

  const userAvailable = await User.findOne({ email, phone });

  if (!userAvailable) {
    return res.status(400).json({
      message: "User not available!!",
    });
  }

  const isValidPW = await userAvailable.isPasswordCorrect(password);

  if (!isValidPW) {
    return res.status(400).json({
      message: "Password invalid!!",
    });
  }
  sendtoken(userAvailable, 200, res);
};

//Logout User
const logOutUser = async (_, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully!!",
    });
  } catch (error) {
    throw new ApiError(400, "Invalid Attempt!!");
  }
};

const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Invalid Password!!",
    });
  }

  if (newPassword != confirmPassword) {
    return res.status(400).json({
      message: "Please confirm your password!!",
    });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(201).json({
    message: "Password changed successfully!!",
  });
};

export { registerUser, logInUser, logOutUser, changeCurrentPassword };
