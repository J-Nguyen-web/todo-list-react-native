export async function migrateDbIfNeeded(db) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        PRAGMA foreign_keys = ON;
        // key = value, for easier relationships
        `);
}