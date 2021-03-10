import Bills from './model';
import { deductBill } from '../wallets/controller';
import { addUserBills, updateUserBills } from '../../userBills/controller';

export const create = async ({ user, body }, res) => {
  try {
    var billInfo = await Bills.create({ ...body, user });
    billInfo = billInfo.view();
    deductBill(body.participentsInfo);
    addUserBills(body.participentsInfo, billInfo.id, user);
    return res.json({ billInfo });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const getAll = async (req, res) => {
  try {
    const allBills = await Bills.find({});
    return res.json({ allBills });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const getById = async ({ params }, res) => {
  try {
    const bills = await Bills.findById(params.id);
    return res.json({ bills });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const update = async ({ user, body, params }, res) => {
  try {
    var billInfo = await Bills.findByIdAndUpdate(params.id, body);
    billInfo = billInfo.view();
    const oldUserBills = await updateUserBills(
      body.participentsInfo,
      billInfo.id,
      user
    );
    const participentsInfo = [];
    for (var i = 0; i < oldUserBills.length; i++) {
      for (var j = 0; j < body.participentsInfo.length; j++) {
        if (oldUserBills[i].userId === body.participentsInfo[j].userId) {
          participentsInfo.push({
            userId: oldUserBills[i].userId,
            amount: body.participentsInfo[j].amount - oldUserBills[i].amount,
          });
        }
      }
    }
    deductBill(participentsInfo);
    return res.json({ billInfo });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
