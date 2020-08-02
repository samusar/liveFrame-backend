exports.up = function(knex) {
  return knex.schema.createTable('content', function (table){
    table.increments('id');
    table.string('title').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('content');
};
