import Wallet from './model';

export const get = async ({ user }, res) => {
  try {
    const wallet = await Wallet.findOne({ user: user.id });
    return res.json({ wallet });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return res.json({ error });
  }
};
