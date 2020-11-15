module.exports = {

    development: {
      client: "postgres",
      connection: {
        database: 'gta_servicos',
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
    }
}   