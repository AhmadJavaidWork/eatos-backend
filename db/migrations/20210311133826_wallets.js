exports.up = async (knex) => {
  await knex.schema.createTable('wallets', async (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('id').inTable('users');
    table.integer('balance').notNullable();
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON wallets
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('wallets');
};
