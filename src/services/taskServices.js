export async function createTaskService(db, task) {
    const now = new Date().toISOString();

    const result = await db.runAsync(
        `
        INSERT INTO tasks (
        title,
        description,
        category_id,
        completed,
        schedule_type,
        date,
        start_time,
        end_time,
        recurrence_type,
        recurrence_data,
        created_at,
        updated_at
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        `,
        task.title,
        task.description || null,
        task.categoryId || null,
        0,
        task.scheduleType || "none",
        task.date || null,
        task.startTime || null,
        task.endTime || null,
        task.recurrenceType || "none",
        task.recurrenceData
            ? JSON.stringify(task.recurrenceData)
            : null,
        now,
        now
    );
    
    return result.lastInsertRowId;
}

export async function getTasksService(db) {
    const tasks = await db.getAllAsync(`
        SELECT * FROM tasks
        ORDER BY created_at DESC
    `);

    const tasksWithSubtasks = await Promise.all(
        tasks.map( async (task) => {

            const subtasks = await db.getAllAsync(
                `
                SELECT * FROM subtasks
                WHERE task_id = ?
                ORDER BY position ASC
                `,
                task.id
            );

            // explicitly transfer the value, that keeps the JS camelStructure and SQL convention for names
            return {
                id: task.id,
                title: task.title,
                description: task.description,
                categoryId: task.category_id,
                
                completed: task.completed,
                
                scheduleType: task.schedule_type,
                date: task.date,
                startTime: task.start_time,
                endTime: task.end_time,

                recurrenceType: task.recurrence_type,
                recurrenceData: task.recurrence_data
                    ? JSON.parse(task.recurrence_data)
                    : null,

                createdAt: task.created_at,
                updatedAt: task.updated_at,
                subtasks,
            };
        })
    );

    return tasksWithSubtasks;
}

export async function updateTaskService(db, task, id) {
    await db.runAsync(
        `UPDATE tasks
        SET title = ?,
            description = ?,
            category_id = ?,
            updated_at = ?

        WHERE id = ?`,
        task.title,
        task.description,
        task.category_id,
        new Date().toISOString(),
        id        
    )
}

export async function deleteTask(db, id) {
    return await db.runAsync (
        "DELETE FROM tasks WHERE id = ?",
        id
    )
}