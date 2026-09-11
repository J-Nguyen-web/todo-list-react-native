import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";

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

    return (
        <CategoryContext.Provider  value = {{categories, setCategories}}>
            { children  }
        </CategoryContext.Provider>
    )
}
    export function useCategories(){
        return useContext(CategoryContext)
    }
