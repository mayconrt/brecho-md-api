
exports.up = function(knex) {

    return knex.schema.createTable('employee', function (table) {
        table.increments('id').primary();
        table.string('rg').unique().notNullable();
        table.string('cpf').unique().notNullable();
        table.string('name').notNullable();
        table.string('position').notNullable();
        table.string('birthDate').notNullable();
        table.string('startDate').notNullable();
        table.string('endDate').notNullable();
        table.string('telphone').notNullable();
        table.string('celphone').notNullable();
        table.string('urlFile').notNullable();  

      }).then((result) =>{
        return result
    })
    .catch((err) => {
        return err
    }) 
  
};

exports.down = function(knex) {

    return knex.schema.dropTable('employee')
  
};
