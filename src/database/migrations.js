export async function migrateDbIfNeeded(db) {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        PRAGMA foreign_keys = ON;
        -- key = value, for easier relationships

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL COLLATE NOCASE UNIQUE,
            --Icon TEXT
            icon TEXT,
            --size INTEGER,
            color TEXT,
            background TEXT,
            created_at TEXT NOT NULL    
        );
        
        -- ще създаде категориите при инициализация
        INSERT INTO categories (name, icon, color, background, created_at)
        VALUES
            ('Work', '💼', '#3338ca', '#d8e0f8', dateTime('now')),
            ('Shopping, '🛒', '#16803D','#dcfce7', dateTime('now')),
            ('Health, '💗', '#df2323','#fcdcdc', dateTime('now')),
            ('Study, '📖', '#e9751c','#ffe3bc', dateTime('now')),
            ('Daily, '🔆', '#00e0e0', '#c3ffff', dateTime('now')),
            ('Personal, '👤', '#a548ec', '#eee6ff', dateTime('now')),

        --INSERT INTO categories (name, Icon, icon, size, color, background, created_at)
        --VALUES
        --    ('Work', 'SimpleLineIcons', 'briefcase', 25,'#3338ca','#d8e0f8',dateTime('now')),
        --    ('Shopping', 'MaterialCommunityIcons', 'cart-variant', 33,'#16803D','#dcfce7',dateTime('now')),
        --    ('Health', 'MaterialCommunityIcons', 'heart-pulse', 31,'#df2323','#fcdcdc',dateTime('now')),
        --    ('Study', 'MaterialCommunityIcons', 'book-open-page-variant-outline', 28,'#e9751c','#ffe3bc',dateTime('now')),
        --    ('Daily', 'MaterialCommunityIcons', 'sun-clock-outline', 28,'#00e0e0','#c3ffff',dateTime('now')),
        --    ('Personal', 'MaterialCommunityIcons', 'account', 25,'#a548ec','#eee6ff',dateTime('now')),

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

        CREATE TABLE IF NOT EXISTS subtasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0,
            position INTEGER NOT NULL DEFAULT 0,

            FOREIGN KEY (task_id)            
                REFERENCES tasks(id)
                ON DELETE CASCADE
        );
    `);
}