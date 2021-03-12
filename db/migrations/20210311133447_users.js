exports.up = async (knex) => {
  await knex.schema.createTable('users', async (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.unique('email');
    table.text('password').notNullable();
    table.string('gender', 7).notNullable();
    table.text('picture');
    table.string('phone', 15);
    table.unique('phone');
    table.string('role', 7).defaultTo('user');
    table.text('socketId').defaultTo(null);
    table.unique('socketId');
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};
