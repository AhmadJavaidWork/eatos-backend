import queries from './queries';
import { userView } from '../../../utils/dataViews';

export const getAll = async (req, res) => {
  try {
    var allUsers = await queries.getAll();
    allUsers = allUsers.map((user) => userView(user));
    return res.json({ users: allUsers });
  } catch (error) {
    console.log('\n\nERROR ========>', error, '\n\n');
    return error;
  }
};
