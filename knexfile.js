module.exports = {
  development: {
    client: "pg",
    connection: {
      // connectionString:process.env.DATABASE_URL,
      connectionString:"postgres://nwfgqdtcsjlcvw:eeaa8b69dc6ca21c0e8168f6161ae570e215624034d5875455d8c85628e0b65e@ec2-52-6-75-198.compute-1.amazonaws.com:5432/d9smcdchfn5qlo",
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