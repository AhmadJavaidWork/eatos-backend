import knex from '../../services/knex';

const getByUserBillId = async (id) => {
  const bill = await knex({ bills: 'bills' })
    .select(
      'bills.id',
      'bills.createdBy',
      'bills.chapatiCost',
      'bills.salanCost'
    )
    .leftOuterJoin(
      { userbills: 'userbills' },
      'userbills.billId',
      '=',
      'bills.id'
    )
    .where('userbills.id', id)
    .then((bill) => bill[0]);
  bill.userBills = await knex('userbills').where({ billId: bill.id });
  return bill;
};

export default {
  getByUserBillId,
};
