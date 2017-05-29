exports.up = function(knex, Promise) {
    return knex.schema.createTable('thread', function(table){
        table.increments('id').primary();
        table.integer('pdf_id').notNullable().references('id').inTable('pdf').onDelete('CASCADE');
        table.string('pdf_location').notNullable();
        table.timestamps(true, true);
      });
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('thread');
};
