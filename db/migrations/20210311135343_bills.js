exports.up = async (knex) => {
  await knex.schema.createTable('bills', async (table) => {
    table.increments('id').primary();
    table.integer('createdBy').unsigned().notNullable();
    table.foreign('createdBy').references('id').inTable('users');
    table.integer('chapatiCost').notNullable();
    table.integer('salanCost').notNullable();
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON bills
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('bills');
};
