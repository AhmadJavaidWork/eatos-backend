import queries from './queries';

export const getByUserBillId = async ({ params }, res) => {
  try {
    const bill = await queries.getByUserBillId(params.id);
    return res.json({ bill });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
