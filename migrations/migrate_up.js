const { migrateTableUp } = require('../utils/migrationUtils');
const migrations = require('./migrations');

async function migrateAllUp() {
  try {
    for (const table in migrations) {
      console.log(await migrateTableUp(table));
    }
  } catch (error) {
    throw error;
  }
}

migrateAllUp()
  .then((results) => console.info(results))
  .finally(() => process.exit());
