import Payments from '../admin/payments/model';

export const getAllByUserId = async ({ user }, res) => {
  try {
    const payments = await Payments.find({ userId: user.id });
    return res.json({ payments });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
