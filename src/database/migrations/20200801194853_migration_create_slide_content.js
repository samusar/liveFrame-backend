exports.up = function(knex) {
  return knex.schema.createTable('slide_content', function (table){
    table.increments('id');
    table.integer('content_id').unsigned().notNullable();
    table.foreign('content_id').references('id').inTable('content');
    table.string('description').notNullable();
    table.integer('order_number').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('slide_content');
};
