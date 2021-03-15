import knex from '../../../services/knex';

const getAll = () => {
  return knex({ payments: 'payments' })
    .select(
      'payments.id',
      'users.name',
      'payments.created_at',
      'payments.amount'
    )
    .leftOuterJoin({ users: 'users' }, 'users.id', '=', 'payments.userId');
};

export default {
  getAll,
};
