import Payments from './model';
import User from '../../user/model';

export const getAll = async (req, res) => {
  try {
    const allPayments = await Payments.find({});
    const payments = [];
    allPayments.forEach((payment) => {
      payments.push(payment.view());
    });
    for (var i = 0; i < payments.length; i++) {
      const user = await User.findById(payments[i].userId);
      payments[i].userName = user.name;
    }
    return res.json({ payments });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};

export const create = async (amount, userId) => {
  try {
    const payment = {
      amount,
      userId,
    };
    await Payments.create(payment);
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
