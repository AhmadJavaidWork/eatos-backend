import { success, notFound } from '../../services/response/';
import User from './model';
import Wallets from '../wallets/model';
import { sign } from '../../services/jwt';
import { genHash } from '../../services/bcrypt';
import { userTokenView } from '../../utils/dataViews';

// export const index = ({ querymen: { query, select, cursor } }, res, next) =>
//   User.find(query, select, cursor)
//     .then((users) => users.map((user) => user.view()))
//     .then(success(res))
//     .catch(next);

// export const show = ({ params }, res, next) =>
//   User.findById(params.id)
//     .then(notFound(res))
//     .then((user) => (user ? user.view() : null))
//     .then(success(res))
//     .catch(next);

export const showMe = ({ user }, res) => {
  try {
    return res.json({ user: user.view() });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const register = async ({ body }, res) => {
  try {
    const user = body;
    user.password = await genHash(user.password);
    const userInfo = await User.create(user);
    await Wallets.create({ amount: 0, user: userInfo.id });

    const access_token = await sign(userTokenView(userInfo));
    return res.json({ user: userInfo.view(), access_token });
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
    await User.findByIdAndUpdate(id, updatedUser);
    const user_info = await User.findById(id);
    return res.json({ user: user_info.view() });
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
    await User.findByIdAndUpdate(id, { password });
    return res.json({ status: 200 });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => (user ? user.remove() : null))
    .then(success(res, 204))
    .catch(next);
