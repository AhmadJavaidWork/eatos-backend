import queries from './queries';

export const getAll = async (req, res) => {
  try {
    const payments = await queries.getAll();
    return res.json({ payments });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
