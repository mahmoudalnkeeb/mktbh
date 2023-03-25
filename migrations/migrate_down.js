const { migrateTableDown } = require('../utils/migrationUtils');
const migrations = require('./migrations');

async function migrateAllDown() {
  try {
    for (const table in migrations) {
      console.log(table);
      console.log(await migrateTableDown(table));
    }
  } catch (error) {
    throw error;
  }
}

migrateAllDown()
  .then((results) => console.info(results))
  .finally(() => process.exit());
