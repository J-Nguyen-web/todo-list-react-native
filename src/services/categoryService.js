export default function createCategoryService(db, newCategory) {
    await db.runAsync(
    `
    INSERT INTO categories (
        name,
        created_at
    )
    VALUES (?, ?)
    `,
    newCategory,
    new Date().toISOString()                    
    );
    categoryId = result.lastInsertRowId;
}

export default function getCategories(db){
    const loadedCategories = db.getAllAsync(
            `
            SELECT * FROM categories
            ORDER BY name ASC
            `
        );
    return loadedCategories;
}
