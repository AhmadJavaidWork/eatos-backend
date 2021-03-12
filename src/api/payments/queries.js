import knex from '../../services/knex';

const getAll = async (userId) => {
  return knex('payments').where({ userId });
};

export default {
  getAll,
};
