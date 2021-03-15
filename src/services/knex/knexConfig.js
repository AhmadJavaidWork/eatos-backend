if (process.env.NODE_ENV === 'production') {
  module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  };
} else {
  require('dotenv').config({
    path: `${process.env.PWD}/${process.env.NODE_ENV || 'development'}.env`,
  });

  module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      },
      migrations: {
        directory: `${process.env.PWD}/db/migrations`,
        tableName: 'knex_migartion',
      },
      seeds: {
        directory: `${process.env.PWD}/db/seeds`,
      },
    },
  };
}
