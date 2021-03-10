import Bills from '../admin/bills/model';
import UserBills from '../userBills/model';
import User from '../user/model';

export const getById = async ({ params }, res) => {
  try {
    const userBill = await UserBills.findById(params.id);
    const bill = await Bills.findById(userBill.billId);
    const participentsInfo = [];
    for (var i = 0; i < bill.participents.length; i++) {
      const participentInfoTemp = await UserBills.findOne({
        billId: userBill.billId,
        userId: bill.participents[i],
      });
      var user = await User.findById(participentInfoTemp.userId);
      const participentInfo = {
        amount: participentInfoTemp.amount,
        chapati: participentInfoTemp.chapati,
        salan: participentInfoTemp.salan,
        name: user.name,
      };
      participentsInfo.push(participentInfo);
    }
    return res.json({ bill, participentsInfo });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
