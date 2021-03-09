export const userView = (user) => {
  user = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    gender: user.gender,
    picture: user.picture,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  return user;
};

export const userTokenView = (user) => {
  user = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return user;
};
