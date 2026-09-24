import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";
import { createCategoryService, deleteCategoryService, getCategories, updateCategoryService } from "../services/categoryService.js";

const CategoryContext = createContext();

export function CategoryProvider({ children }) {
    const db = useSQLiteContext();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    },[])

    async function loadCategories() {
        const loaded = await getCategories(db);
        setCategories(loaded)
    }

    async function createCategory(newCategory) {
        await createCategoryService(db, newCategory);
        await loadCategories();
    }

    async function updateCategory(id, updates) {
        await updateCategoryService(db, id, updates);
        await loadCategories();
    }
    
    async function deleteCategory(id) {
        await deleteCategoryService(db, id)
        await loadCategories();
    }

    return (
        <CategoryContext.Provider  value = {{categories, setCategories, createCategory, updateCategory, deleteCategory}}>
            { children }
        </CategoryContext.Provider>
    )
}
    export function useCategories(){
        return useContext(CategoryContext)
    }
