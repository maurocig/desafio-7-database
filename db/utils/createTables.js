const knex = require('knex');

async function createMessagesTable(config) {
  const tableExists = await knex(config).schema.hasTable('messages');
  if (!tableExists) {
    await knex(config).schema.createTable('messages', (table) => {
      table.increments('id').notNullable().primary().unique();
      table.string('email', 30).notNullable();
      table.string('message', 250).notNullable();
    });
    console.log('Table created');
  }
}

async function createProductsTable(config) {
  try {
    const tableExists = await knex(config).schema.hasTable('products');
    console.log;
    if (!tableExists) {
      await knex(config).schema.createTable('products', (table) => {
        table.increments('id').notNullable().primary().unique();
        table.string('title', 30).notNullable();
        table.float('price', 6).notNullable;
        table.string('thumbnail', 250);
      });
      console.log('Products table created');
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createMessagesTable, createProductsTable };
