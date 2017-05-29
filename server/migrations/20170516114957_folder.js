
exports.up = function(knex, Promise) {
    return knex.schema.createTable('folder', function(table){
        table.increments('id').primary();
        table.string('path').notNullable().unique();
        table.timestamps(true, true);
      });
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('folder');
};
