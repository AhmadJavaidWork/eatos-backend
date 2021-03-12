import queries from './queries';

export const getAllByUserId = async ({ user }, res) => {
  try {
    const userBills = await queries.getAllByUserId(user.id);
    return res.json({ userBills });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
