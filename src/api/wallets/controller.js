import queries from './queries';

export const get = async ({ user }, res) => {
  try {
    const wallet = await queries.get(user.id);
    return res.json({ wallet });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
