import { Strategy as BearerStrategy } from "passport-http-bearer";
import { masterKey } from "../../config";

export const masterStrategy = new BearerStrategy((token, done) => {
  if (token === masterKey) {
    done(null, {});
  } else {
    done(null, false);
  }
});
