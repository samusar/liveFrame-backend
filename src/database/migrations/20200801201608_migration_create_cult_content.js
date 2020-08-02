exports.up = function(knex) {
  return knex.schema.createTable('cult_content', function (table){
    table.increments('id');

    table.integer('content_id').unsigned().notNullable();
    table.foreign('content_id').references('id').inTable('content');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cult_content');
};
