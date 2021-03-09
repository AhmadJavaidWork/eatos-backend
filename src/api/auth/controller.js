import { sign } from "../../services/jwt";
import { userTokenView } from "../../utils/dataViews";

export const signIn = async ({ user }, res) => {
  try {
    user = user.view();
    const access_token = await sign(userTokenView(user));
    return res.json({ user, access_token });
  } catch (error) {
    console.log("\n\nERROR ========>", error, "\n\n");
    return res.json({ error });
  }
};

export const signOut = async (req, res) => {
  try {
    req.logout();
    return res.json({ status: 200 });
  } catch (error) {
    console.log("\n\nERROR ========>", error, "\n\n");
    return res.json({ error });
  }
};
