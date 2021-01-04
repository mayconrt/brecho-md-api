module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString:process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      }
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

  // development: {
  //   client: "postgres",
  //   connection: {
  //     database: 'brecho_md',
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

}   