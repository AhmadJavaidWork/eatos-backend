import { BasicStrategy } from "passport-http";
import bcrypt from "bcrypt";
import User from "../../api/user/model";

export const passwordStrategy = new BasicStrategy(
  async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
      done(true);
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return done(null, user);
    return done(null, false);
  }
);
