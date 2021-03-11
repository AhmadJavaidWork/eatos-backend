import Wallet from '../../wallets/model';
import User from '../../user/model';
import { create } from '../payments/controller';

export const getAll = async (req, res) => {
  try {
    const wallets = await Wallet.find({});
    for (var i = 0; i < wallets.length; i++) {
      wallets[i] = wallets[i].view();
      wallets[i].user = await User.findById(wallets[i].user.id);
      wallets[i].user = wallets[i].user.view();
    }
    return res.json({ wallets });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const update = async ({ body, params }, res) => {
  try {
    const amount = body.amount;
    const id = params.id;
    await Wallet.findOneAndUpdate({ user: id }, { $inc: { amount } });
    await create(amount, id);
    const wallet = await Wallet.findOne({ user: id });
    return res.json({ wallet });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const deductBill = async (participentsInfo) => {
  try {
    for (var i = 0; i < participentsInfo.length; i++) {
      await Wallet.findOneAndUpdate(
        { user: participentsInfo[i].userId },
        { $inc: { amount: -participentsInfo[i].amount } }
      );
    }
    return;
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
