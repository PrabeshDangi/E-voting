// import jwt from "jsonwebtoken";
// import User from "../Models/userModel.js";
// const verifyJWT = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.token || req.header("Authorization")?.replace("Bearer", "");

//     //console.log(token);

//     if (!token) {
//       return res.status(401).json({
//         message: "Unauthorized request error!!",
//       });
//     }

//     const jwtDecodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const user = await User.findById({ id: jwtDecodedInfo._id });

//     if (!user) {
//       return res.status(401).json({
//         message: "Unauthorized request error!!",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// };

// const authorizeRoles = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       return res.status(403).json({
//         message: `${req.user.role} cannot proceed with this request!!`,
//       });
//     }
//     next();
//   };
// };

// export { verifyJWT, authorizeRoles };

import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({
        message: "No token (Unauthorized request error!!)",
      });
    }
    // console.log(process.env.ACCESS_TOKEN_SECRET);
    // console.log(token);
    const jwtDecodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(jwtDecodedInfo.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized request error!!",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const authorizeRoles = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        message: `${req.user.role} cannot proceed with this request!!`,
      });
    }
    next();
  };
};

export { verifyJWT, authorizeRoles };
