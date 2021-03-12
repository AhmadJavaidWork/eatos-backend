import queries from './queries';

export const getAll = async (req, res) => {
  try {
    const wallets = await queries.getAll();
    return res.json({ wallets });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const addAmount = async ({ body, params }, res) => {
  try {
    const wallet = await queries.addAmount(params.id, body.amount);
    return res.json({ wallet });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
