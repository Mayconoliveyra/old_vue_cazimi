const { mysqlConect } = require("./.env")

module.exports = {
  client: 'mysql',
  connection: mysqlConect,
  pool: {
    min: 2,
    max: 7
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
