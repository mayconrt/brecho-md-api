module.exports = {

    // development: {
    //   client: "postgres",
    //   connection: {
    //     database: 'gta_servicos',
    //     user: 'postgres',
    //     password: 'maycon123'
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     directory: "./src/database/migrations"
    //   },
    //   useNullAsDefault: true,
    // },

    development: {
      client: "postgres",
      connection: {
        host: '34.95.164.102',
        port: '5432',
        database: 'postgres',
        user: 'gta-postgress',
        password: 'Maalbuqu3$'
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