import User from '../../user/model';

export const getAll = async (req, res) => {
  try {
    const allUsers = [];
    const users = await User.find({});
    users.forEach((user) => {
      allUsers.push(user.view());
    });
    return res.json({ users: allUsers });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
