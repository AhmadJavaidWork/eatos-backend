import knex from '../../../services/knex';

const getAll = () => {
  return knex('users');
};

export default {
  getAll,
};
