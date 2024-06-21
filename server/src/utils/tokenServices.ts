import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  const payload = {
    sub: userId,
  };
  const sercretOrPrivateKey = process.env.SECRET_OR_PRIVATE_KEY as string;
  const options = {
    expiresIn: "3 days",
  };
  const token = jwt.sign(payload, sercretOrPrivateKey, options);
  return token;
};

export { generateToken };
