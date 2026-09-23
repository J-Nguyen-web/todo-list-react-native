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

export async function updateCategoryService(db, id, updates){

    // upgraded method - при който може да се предава само това което ще update, вместо целия category object
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map(field => `${field} = ?`).join(', ')
    
    await db.runAsync(
        `
        UPDATE categories
        SET ${setClause},
        WHERE id = ?
        `,
        [...values, id]

        // императивен подробен вариант
        // UPDATE categories
        // SET $name = ?,
        //     icon = ?,
        //     color = ?,
        //     background = ?,
        //     favorite = ?,
        //     updatedAt = ?,
        // WHERE id = ?
        // `,
        // category.name ,
        // category.icon ,
        // category.color ,
        // category.background ,
        // category.favorite ,
        // new Date().toISOString(),
        // id        
    );
}