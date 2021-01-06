
exports.up = function(knex) {

    return knex.schema.createTable('client', function (table) {
        table.increments('id').primary();
        table.string('name').unique().notNullable();
        table.string('email').notNullable();
        table.string('celphone')
        table.string('telphone');
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

    return knex.schema.dropTable('client')
  
};
