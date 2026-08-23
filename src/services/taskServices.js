export async function createTask(db, task) {
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