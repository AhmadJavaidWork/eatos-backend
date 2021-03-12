import knex from '../../services/knex';

const get = (userId) => {
  return knex('wallets')
    .where({ userId })
    .then((wallet) => wallet[0]);
};

export default {
  get,
};
