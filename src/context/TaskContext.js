import { useSQLiteContext } from "expo-sqlite";
import { createContext, useContext, useEffect, useState } from "react";
import { createTaskService, deleteTask, getTasksService } from "../services/taskServices.js";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const db = useSQLiteContext(); // react hook - must be called from component not ordinary services, thats why its here not in service
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    },[])

    async function loadTasks() {
        const loaded = await getTasksService(db)
        setTasks(loaded)
    }

    async function createTask(task) {
        await createTaskService(db, task);
        await loadTasks();
    }
    
    async function updateTask(db, task, id) {
        await updateTaskService(db, task, id)
        await loadTasks();
    }

    async function removeTask(id) {
        await deleteTask(db, id)
        await loadTasks();
    }

    return (
        <TaskContext.Provider  value = {{tasks, createTask, updateTask, removeTask}}>
            { children }
        </TaskContext.Provider>
    )
}
    export function useTasks(){
        return useContext(TaskContext)
    }
