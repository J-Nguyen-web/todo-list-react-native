import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";
import createCategoryService from "../services/categoryService.js";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const db = useSQLiteContext();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    },[])

    async function loadCategories() {
        const loaded = await db.getAllAsync(
            "SELECT * FROM categories ORDER BY name"
        )
        setCategories(loaded)
    }

    async function createCategory(newCategory) {
        await createCategoryService(db, newCategory);
    }

    return (
        <CategoryContext.Provider  value = {{categories, createCategory, setCategories}}>
            { children }
        </CategoryContext.Provider>
    )
}
    export function useCategories(){
        return useContext(CategoryContext)
    }
