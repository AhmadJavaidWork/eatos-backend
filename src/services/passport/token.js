import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { jwtSecret } from "../../config";
import User from "../../api/user/model";

export const tokenStrategy = new JwtStrategy(
  {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromUrlQueryParameter("access_token"),
      ExtractJwt.fromBodyField("access_token"),
      ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    ]),
  },
  async (req, done) => {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      done(true);
      return null;
    }
    done(null, user);
    return null;
  }
);
