import knex from '../../services/knex';

const register = async (user) => {
  const userInfo = await knex('users')
    .insert(user)
    .returning('*')
    .then((user) => user[0]);
  const tempWallet = {
    userId: userInfo.id,
    balance: 0,
  };
  const wallet = await knex('wallets')
    .insert(tempWallet)
    .returning('*')
    .then((wallet) => wallet[0]);
  return { userInfo, wallet };
};

const update = (id, user) => {
  return knex('users').where({ id }).update(user);
};

const updatePassword = (id, password) => {
  return knex('users').where({ id }).update({ password });
};

export default {
  register,
  update,
  updatePassword,
};
