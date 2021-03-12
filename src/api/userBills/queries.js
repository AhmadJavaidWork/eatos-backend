import knex from '../../services/knex';

const getAllByUserId = (userId) => {
  return knex('userbills').where({ userId });
};

export default {
  getAllByUserId,
};
