exports.up = function(knex, Promise) {
    return knex.schema.createTable('pdf', function(table){
        table.increments('id').primary();
        // table.integer('folder_id').notNullable().references('id').inTable('folder').onDelete('CASCADE');
        table.string('path').notNullable().unique();
        table.string('url').notNullable().unique();
        table.timestamps(true, true);
      });
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('pdf');
};
