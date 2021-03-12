exports.up = async (knex) => {
  await knex.schema.createTable('userbills', async (table) => {
    table.increments('id').primary();
    table.integer('billId').unsigned().notNullable();
    table.foreign('billId').references('id').inTable('bills');
    table.integer('userId').unsigned().notNullable();
    table.foreign('userId').references('id').inTable('users');
    table.integer('amount').notNullable();
    table.boolean('chapati').notNullable();
    table.boolean('salan').notNullable();
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON userbills
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('userbills');
};
