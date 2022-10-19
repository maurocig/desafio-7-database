const knex = require('knex');

module.exports = async function createTable(tableName) {
  const tableExists = await this.knex.schema.hasTable(this.tableName);
  if (tableExists) {
    await this.knex.schema.dropTable(this.tableName);
  }
  await this.knex.schema.createTable(this.tableName, (table) => {
    table.increments('id').notNullable().primary();
    table.string('title', 25).notNullable();
    table.float('price');
    table.string('thumbnail');
  });
  console.log('Table created');
};
