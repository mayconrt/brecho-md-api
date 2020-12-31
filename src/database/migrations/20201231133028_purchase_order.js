
exports.up = function(knex) {

    return knex.schema.createTable('purchase_order', function (table) {
        table.increments('id').primary();
        table.integer('idProduct').notNullable();
        table.integer('quantity').notNullable();
        table.float('unit_value', 10, 2).notNullable();
        table.float('discount_value', 10, 2).notNullable();
        table.float('total_value', 10, 2).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());

        table.foreign('idProduct').references('id').inTable('product')

      }).then((result) =>{
        return result
    })
    .catch((err) => {
        return err
    }) 
  
};

exports.down = function(knex) {

    return knex.schema.dropTable('purchase_order')
  
};
