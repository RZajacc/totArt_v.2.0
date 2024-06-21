import passport, { PassportStatic } from "passport";

const jwtAuth: PassportStatic = passport.authenticate("jwt", {
  session: false,
});

export default jwtAuth;
