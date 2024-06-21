import bcrypt from "bcrypt";

const bcrypt_hash = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const bcrypt_verifyPassword = async (
  userPassword: string,
  hashedPassword: string
) => {
  try {
    const isVerified = await bcrypt.compare(userPassword, hashedPassword);
    return isVerified;
  } catch (error) {
    console.log("Error verifying password");
  }
};

export { bcrypt_hash, bcrypt_verifyPassword };
