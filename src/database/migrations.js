export async function migrateDbIfNeeded(db) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        PRAGMA foreign_keys = ON;
        // key = value, for easier relationships

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            icon TEXT,
            color TEXT,
            created_at TEXT NOT NULL    
        );

        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category_id INTEGER,
            completed INTEGER NOT NULL DEFAULT 0,
            
            schedule_type TEXT NOT NULL DEFAULT 'none',
            date TEXT,
            start_time TEXT,
            end_time TEXT,

            recurrence_type TEXT NOT NULL DEFAULT 'none',
            recurrence_data TEXT,

            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,

            FOREIGN KEY (category_id)
                REFERENCES categories(id)
                ON DELETE SET NULL
        );

        CREATE TABLE IS NOT EXISTS subtasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            title TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0,
            position INTEGER NOT NULL DEFAULT 0,

            FOREIGN KEY (task_id)            
                REFERENCES tasks(id)
                ON DELETE CASCADE
        );
    `);
}