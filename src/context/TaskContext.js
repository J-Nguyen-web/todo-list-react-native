import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteTask } from "../services/taskServices.js";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const db = useSQLiteContext(); // react hook - must be called from component not ordinary services, thats why its here not in service
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
        await createTaskServic(db, task);
        await loadTasks();
    }
    
    async function updateTask(db, task, id) {
        await updateTaskService(db, id)
        await loadTasks();
    }

    async function removeTask(id) {
        await deleteTask(db, id)
        await loadTasks();
    }

    return (
        <TaskContext.Provider  value = {{tasks, createTask, removeTask}}>
            { children }
        </TaskContext.Provider>
    )
}
    export function useTasks(task, ){
        return useContext(TaskContext)
    }
