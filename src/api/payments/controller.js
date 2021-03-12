import queries from './queries';

export const getAll = async ({ user }, res) => {
  try {
    const payments = await queries.getAll(user.id);
    return res.json({ payments });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
