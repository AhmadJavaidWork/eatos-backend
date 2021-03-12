import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { jwtSecret } from '../../config';
import knex from '../knex';

export const tokenStrategy = new JwtStrategy(
  {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromUrlQueryParameter('access_token'),
      ExtractJwt.fromBodyField('access_token'),
      ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    ]),
  },
  ({ user }, done) => {
    knex('users')
      .where({ id: user.id })
      .then((user) => {
        done(null, user[0]);
        return null;
      })
      .catch(done);
  }
);
