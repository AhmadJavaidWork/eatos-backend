import knex from '../../../services/knex';

const addBill = async (billInfo, createdBy) => {
  var bill = {
    createdBy,
    chapatiCost: billInfo.chapatiCost,
    salanCost: billInfo.salanCost,
  };
  bill = await knex('bills')
    .insert(bill)
    .returning('*')
    .then((bill) => bill[0]);

  const userBills = billInfo.userBills;
  userBills.forEach((userBill) => {
    userBill.billId = bill.id;
  });
  await knex('userbills').insert(userBills);
  await deductBill(userBills);
  return bill;
};

const getAll = () => {
  return knex('bills');
};

const getById = async (id) => {
  const bill = await knex('bills')
    .where({ id })
    .then((bill) => bill[0]);
  bill.userBills = await knex({ userbills: 'userbills' })
    .select(
      'users.name',
      'userbills.userId',
      'userbills.amount',
      'userbills.chapati',
      'userbills.salan'
    )
    .leftOuterJoin({ users: 'users' }, 'userbills.userId', '=', 'users.id')
    .where({ billId: id });
  return bill;
};

const update = async (billInfo, id) => {
  var bill = {
    chapatiCost: billInfo.chapatiCost,
    salanCost: billInfo.salanCost,
  };
  bill = await knex('bills')
    .update(bill)
    .where({ id })
    .returning('*')
    .then((bill) => bill[0]);

  const newUserBills = billInfo.userBills;
  newUserBills.forEach((userBill) => (userBill.billId = bill.id));
  const oldUserBills = await getOldUserBills(bill.id);
  await delOldUserBills(oldUserBills, bill.id);
  await reImbOldBills(oldUserBills);
  await knex('userbills').insert(newUserBills);
  await deductBill(newUserBills);
  return bill;
};

const getOldUserBills = (billId) => {
  return knex('userbills').where({ billId });
};

const delOldUserBills = async (oldUserBills, billId) => {
  const oldUserBillsPromise = [];
  for (var i = 0; i < oldUserBills.length; i++) {
    const oldUserBillPromise = knex('userbills')
      .where({
        userId: oldUserBills[i].userId,
        billId,
      })
      .del();
    oldUserBillsPromise.push(oldUserBillPromise);
  }
  Promise.all(oldUserBillsPromise);
};

const reImbOldBills = async (oldUserBills) => {
  const walletIncsPromise = [];
  for (var i = 0; i < oldUserBills.length; i++) {
    const walletIncPromise = knex('wallets')
      .where({ userId: oldUserBills[i].userId })
      .increment('balance', oldUserBills[i].amount);
    walletIncsPromise.push(walletIncPromise);
  }
  Promise.all(walletIncsPromise);
};

const deductBill = async (userBills) => {
  const deductBillPromise = [];
  for (var i = 0; i < userBills.length; i++) {
    const deductBill = knex('wallets')
      .where({ userId: userBills[i].userId })
      .decrement('balance', userBills[i].amount);
    deductBillPromise.push(deductBill);
  }
  Promise.all(deductBillPromise);
};

export default {
  addBill,
  getAll,
  getById,
  update,
};
