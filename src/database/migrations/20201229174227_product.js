
exports.up = function(knex) {

    return knex.schema.createTable('product', function (table) {
        table.increments('id').primary();
        table.string('name').unique().notNullable();
        table.string('description').notNullable();
        table.string('quantity').notNullable();
        table.float('price', 10, 2).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());

      }).then((result) =>{
        return result
    })
    .catch((err) => {
        return err
    }) 
  
};

exports.down = function(knex) {

    return knex.schema.dropTable('product')
  
};
