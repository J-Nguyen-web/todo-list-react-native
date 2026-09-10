export default function getCategories(db){
    const loadedCategories = db.getAllAsync(
            `
            SELECT * FROM categories
            ORDER BY name ASC
            `
        );
    return loadedCategories;
}
