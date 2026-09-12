import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const db = useSQLiteContext();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    },[])

    async function loadTasks() {
        const loaded = await db.getAllAsync(
            "SELECT * FROM tasks ORDER BY name"
        )
        setTasks(loaded)
    }

    return (
        <TaskContext.Provider  value = {{tasks, setTasks}}>
            { children }
        </TaskContext.Provider>
    )
}
    export function useTasks(){
        return useContext(TaskContext)
    }
