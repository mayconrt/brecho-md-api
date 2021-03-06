
exports.up = function(knex) {

    return knex.schema.createTable('sales_order', function (table) {
        table.increments('id').primary();
        table.integer('idProduct').notNullable();
        table.integer('idClient').notNullable();
        table.integer('quantity').notNullable();
        table.float('unit_value', 10, 2).notNullable();
        table.float('discount_value', 10, 2).notNullable();
        table.float('total_value', 10, 2).notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());

        table.foreign('idProduct').references('id').inTable('product')
        table.foreign('idClient').references('id').inTable('client')

      }).then((result) =>{
        return result
    })
    .catch((err) => {
        return err
    }) 
  
};

exports.down = function(knex) {

    return knex.schema.dropTable('sales_order')
  
};
