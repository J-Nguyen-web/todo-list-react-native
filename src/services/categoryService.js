export async function createCategoryService(db, newCategory) {
    await db.runAsync(
    `
    INSERT INTO categories (
        name,
        created_at
    )
    VALUES (?, ?)
    `,
    [newCategory, new Date().toISOString()]
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
    // създаава поредица от параметри(fields) като се разграничават от запетайка, 
    // за това ако има в края на изброените полета запетая възприема WHERE като част от изброените полета за промянва от SET
    
    await db.runAsync(
        `
        UPDATE categories
        SET ${setClause}
        WHERE id = ?
        `,
        [...values, id]
        // values e зададено горе, може да има една или няколко стойности в зависимост от подадените полета,
        // то замества въпросителната ( field = ?, otherField = ?) с неговите values


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

export async function deleteCategoryService(db, id) {
    await db.runAsync(
        `
        DELETE FROM categories
        WHERE id = ?
        `,
        [id]
    )
}