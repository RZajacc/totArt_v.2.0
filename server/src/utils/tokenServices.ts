import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";

const generateToken = (userId: string) => {
  // Secret key
  const sercretOrPrivateKey: Secret = process.env.SECRET_OR_PRIVATE_KEY!;

  const payload: JwtPayload = {
    sub: userId,
  };
  const options: SignOptions = {
    expiresIn: "3 days",
  };
  const token = jwt.sign(payload, sercretOrPrivateKey, options);
  return token;
};

export { generateToken };
