
exports.up = function(knex) {

    return knex.schema.createTable('employee', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('rg').notNullable();
        table.string('cpf').notNullable();
        table.string('birthdate').notNullable();
        table.string('birthDate').notNullable();
        table.string('startDate').notNullable();
        table.string('endDate').notNullable();
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
