const SQLClient = require('./db/clients/sql.clients');
const dbConfig = require('./db/config');
const products = require('../assets/products');

const productsDB = new SQLClient(dbConfig.mariaDb, 'products');

(async () => {
  try {
    db.createTable();
  } catch {
  } finally {
  }
})();
