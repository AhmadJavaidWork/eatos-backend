import passport from 'passport';
import knex from '../knex';
import { passwordStrategy } from './password';
import { masterStrategy } from './master';
import { tokenStrategy } from './token';

const User = {};
User.roles = ['admin', 'user'];

export const password = () => (req, res, next) =>
  passport.authenticate('password', { session: false }, (err, user, info) => {
    if (err && err.param) {
      return res.json({ status: 200, err });
    } else if (err || !user) {
      return res.json({
        status: 200,
        error: 'Wrong Password or Email Address',
      });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.json({ status: 200, err });
      next();
    });
  })(req, res, next);

export const master = () => passport.authenticate('master', { session: false });

export const token = ({ required, roles = User.roles } = {}) => (
  req,
  res,
  next
) =>
  passport.authenticate('token', { session: false }, (err, user, info) => {
    if (
      err ||
      (required && !user) ||
      (required && !~roles.indexOf(user.role))
    ) {
      return res.json({ authorized: false });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return res.json({ authorized: false });
      next();
    });
  })(req, res, next);

passport.use('password', passwordStrategy);
passport.use('master', masterStrategy);
passport.use('token', tokenStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const user = await knex('users')
    .where({ id })
    .then((user) => user[0]);
  done(null, user);
});
