import knex from '../../../services/knex';

const getAll = () => {
  return knex('wallets');
};

const addAmount = async (userId, amount) => {
  const wallet = await knex('wallets')
    .where({ userId })
    .increment('balance', amount);
  const payment = {
    userId,
    amount,
  };
  await knex('payments').insert(payment);
  return wallet;
};

export default {
  getAll,
  addAmount,
};
