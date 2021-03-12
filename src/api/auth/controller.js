import { sign } from '../../services/jwt';
import { userTokenView, userView } from '../../utils/dataViews';

export const signIn = async ({ user }, res) => {
  try {
    user = userView(user);
    const accessToken = await sign(userTokenView(user));
    return res.json({ user, accessToken });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const signOut = async (req, res) => {
  try {
    req.logout();
    return res.json({ status: 200 });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
