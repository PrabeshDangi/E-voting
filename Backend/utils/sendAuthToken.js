import genAuthToken from "./generateAuthToken.js";
import User from "../Models/userModel.js";

const sendtoken = async (userAvailable, statuscode, res) => {
  const token = genAuthToken(userAvailable);

  const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  const loggedInUser = await User.findById(userAvailable._id).select(
    "-password -role -dob -age"
  );

  return res.status(statuscode).cookie("token", token, cookieOptions).json({
    success: true,
    message: "User logged in successfully",
    user: loggedInUser,
    token,
  });
};

export default sendtoken;
