
//OAUTH - not sure if username column is nullable.  Check back as we implement oauth.

exports.up = function(knex, Promise) {
    return knex.schema.createTable('user', function(table) {
      table.increments().primary();
      table.string('email').notNullable().unique();
      table.string('username').notNullable().unique();
      table.text('photo_url', 'medium').notNullable().defaultTo("");
      table.specificType('hashed_password', 'char(60)').notNullable();
      table.timestamps(true, true);
    });
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user');
};
