import UserBills from './model';

export const addUserBills = async (participentsInfo, user) => {
  try {
    for (var i = 0; i < participentsInfo.length; i++) {
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
