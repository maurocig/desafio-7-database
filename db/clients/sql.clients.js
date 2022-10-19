const knex = require('knex');
const products = require('../assets/initialProducts');
// console.log(products);

module.exports = class Container {
  constructor(config, tableName) {
    this.tableName = tableName;
    this.knex = knex(config);
  }

  async createTable() {
    const tableExists = await this.knex.schema.hasTable(this.tableName);
    if (!tableExists) {
      await this.knex.schema.createTable(this.tableName, (table) => {
        table.increments('id').notNullable().primary().unique();
        // table.integer('code').notNullable().unique();
        table.string('title', 25).notNullable();
        table.float('price');
        table.string('thumbnail');
      });
      console.log('Table created');
    }
  }

  async getAll() {
    try {
      const records = await this.knex
        .from(this.tableName)
        .select('id', 'title', 'price', 'thumbnail');
      console.log('Items retrieved successfully.');
      return records;
    } catch (error) {
      console.log(error);
    }
  }

  async save(items) {
    try {
      await this.knex(this.tableName).insert(items);
      console.log('Items saved successfully.');
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const file = await this.getFile();
      const array = file.filter((product) => product.id === +id);
      if (array.length === 0) {
        return false;
      } else {
        return array[0];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const file = await this.getFile();
      const filteredArray = file.filter((product) => product.id !== +id);
      if (filteredArray.length === file.length) {
        return { error: 'producto no encontrado' };
      } else {
        await fs.writeFile(
          `./${this.name}`,
          JSON.stringify(filteredArray, null, 2)
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const empty = [];
      await fs.writeFile(`./${this.name}`, JSON.stringify(empty));
    } catch (error) {
      console.log(error);
    }
  }

  async disconnect() {
    this.knex.destroy();
  }
};
