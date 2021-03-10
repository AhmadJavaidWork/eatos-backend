import UserBills from './model';

export const addUserBills = async (participentsInfo, billId, user) => {
  try {
    for (var i = 0; i < participentsInfo.length; i++) {
      participentsInfo[i].billId = billId;
      await UserBills.create({ ...participentsInfo[i], user });
    }
    return;
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};

export const getAllByUserId = async ({ user }, res) => {
  try {
    const userBills = await UserBills.find({ userId: user.id });
    return res.json({ userBills });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};

export const updateUserBills = async (participentsInfo, billId, user) => {
  try {
    const oldUserBills = [];
    for (var i = 0; i < participentsInfo.length; i++) {
      participentsInfo[i].billId = billId;
      const oldUserBill = await UserBills.findOne({
        billId,
        userId: participentsInfo[i].userId,
      });
      oldUserBills.push(oldUserBill.view());
      await UserBills.findOneAndUpdate(
        { billId, userId: participentsInfo[i].userId },
        { ...participentsInfo[i] }
      );
    }
    return oldUserBills;
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
