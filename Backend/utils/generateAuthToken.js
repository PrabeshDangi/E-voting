import jwt from "jsonwebtoken";

const genAuthToken = (user) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      phone: user.phone,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
  return token;
};

export default genAuthToken;
