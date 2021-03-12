import queries from './queries';

export const addBill = async ({ user, body }, res) => {
  try {
    const bill = await queries.addBill(body, user.id);
    return res.json({ bill });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const getAll = async (req, res) => {
  try {
    const allBills = await queries.getAll();
    return res.json({ allBills });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const getById = async ({ params }, res) => {
  try {
    const bill = await queries.getById(params.id);
    return res.json({ bill });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};

export const update = async ({ body, params }, res) => {
  try {
    const bill = await queries.update(body, params.id);
    return res.json({ bill });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
