import Bills from './model';
import { deductBill } from '../wallets/controller';
import { addUserBills } from '../../userBills/controller';

export const create = async ({ user, body }, res) => {
  try {
    var billInfo = await Bills.create({ ...body, user });
    billInfo = billInfo.view();
    deductBill(body.participentsInfo);
    addUserBills(body.participentsInfo, user);
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
