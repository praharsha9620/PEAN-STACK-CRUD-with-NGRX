module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'testdb',
      user: 'postgres',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  }
};
