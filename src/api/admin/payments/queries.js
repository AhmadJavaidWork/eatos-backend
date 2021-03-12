import knex from '../../../services/knex';

const getAll = () => {
  return knex('payments');
};

export default {
  getAll,
};
