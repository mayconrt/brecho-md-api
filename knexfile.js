module.exports = {

  development: {
    client: 'mysql',
    connection: 'mysql://b013fe1c605cb9:26a9becd@us-cdbr-east-02.cleardb.com/heroku_d71fda90a83dacf?reconnect=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    useNullAsDefault: true,
  }    

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

  // development: {
  //   client: "pg",
  //   connection: {
  //     host:"ec2-52-6-75-198.compute-1.amazonaws.com",
  //     port:5432,
  //     dbname:"d9smcdchfn5qlo",
  //     user: "nwfgqdtcsjlcvw",
  //     password: "eeaa8b69dc6ca21c0e8168f6161ae570e215624034d5875455d8c85628e0b65e",
  //     sslmode:"require"
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

  // development: {
  //   client: 'postgres',
  //   connection: "postgres://nwfgqdtcsjlcvw:eeaa8b69dc6ca21c0e8168f6161ae570e215624034d5875455d8c85628e0b65e@ec2-52-6-75-198.compute-1.amazonaws.com:5432/d9smcdchfn5qlo",    
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