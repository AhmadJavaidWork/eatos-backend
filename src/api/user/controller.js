import crypto from 'crypto';
import queries from './queries';
import { sign } from '../../services/jwt';
import { genHash } from '../../services/bcrypt';
import { userTokenView, userView } from '../../utils/dataViews';

export const showMe = ({ user }, res) => {
  try {
    return res.json({ user: userView(user) });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const register = async ({ body }, res) => {
  try {
    const user = body.user;
    user.password = await genHash(user.password);
    if (!user.picture) {
      const hash = crypto.createHash('md5').update(user.email).digest('hex');
      user.picture = `https://gravatar.com/avatar/${hash}?d=identicon`;
    }
    const { userInfo, wallet } = await queries.register(user);
    const accessToken = await sign(userTokenView(userInfo));
    return res.json({ user: userView(userInfo), accessToken, wallet });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const update = async ({ body, params, user }, res) => {
  try {
    if (!user.id === params.id) {
      return res.json({ error: "You can't change other user's data" });
    }
    const id = user.id;
    const updatedUser = body;
    await queries.update(id, updatedUser);
    return res.json({ status: 200 });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const updatePassword = async ({ body, params, user }, res) => {
  try {
    if (!user.id === params.id) {
      return res.json({ error: "You can't change other user's password" });
    }
    const id = user.id;
    const password = await genHash(body.password);
    await queries.updatePassword(id, password);
    return res.json({ status: 200 });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
