exports.up = function(knex, Promise) {
    return knex.schema.createTable('comment', function(table){
        table.increments('id').primary();
        table.integer('thread_id').notNullable().references('id').inTable('thread').onDelete('CASCADE');
        table.integer('user_id').notNullable().references('id').inTable('user').onDelete('CASCADE');
        table.string('content').notNullable()
        table.timestamps(true, true);
      });
  };

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('comment');
};
