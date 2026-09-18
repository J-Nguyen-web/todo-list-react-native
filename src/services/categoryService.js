export async function createCategoryService(db, newCategory) {
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
    // categoryId = result.lastInsertRowId;
}

export async function getCategories(db){
    const loadedCategories = db.getAllAsync(
            `
            SELECT * FROM categories
            ORDER BY name ASC
            `
        );
    return loadedCategories;
}

export async function updateCategoryService(db, category, id){
    await db.runAsync(
        `
        UPDATE categories
        SET name = ?,
            icon = ?,
            color = ?,
            background = ?,
            updatedAt = ?,
        WHERE id = ?
        `,
        category.name ,
        category.icon ,
        category.color ,
        category.background ,
        new Date().toISOString(),
        id
    )
}