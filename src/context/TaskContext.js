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

    async function createTask(task) {
        await createTask(db, task);
        await loadTasks();
        }
    }

    async function removeTask(id) {
        async function deleteTask(id, id)
    }

    return (
        <TaskContext.Provider  value = {{tasks, setTasks, removeTask}}>
            { children }
        </TaskContext.Provider>
    )
}
    export function useTasks(task, ){
        return useContext(TaskContext)
    }
