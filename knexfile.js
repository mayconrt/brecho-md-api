module.exports = {

    development: {
      client: "postgres",
      connection: {
        database: 'brecho_md',
        user: 'postgres',
        password: 'maycon123'
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: "./src/database/migrations"
      },
      useNullAsDefault: true,
    },

  
}   