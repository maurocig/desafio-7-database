module.exports = {
  mariaDb: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'node-sql-coder',
    },
  },
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: '/db/sql/ecommerce.sqlite',
    },
    useNullAsDefault: true,
  },
};
