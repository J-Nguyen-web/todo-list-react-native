export default function categoriesGroup(tasks) {
        const grouped = tasks.reduce((acc, task) => {
            if (!acc[task.category]) {
                acc[task.category] = [];
            }

            acc[task.category].push(task)
            return acc
        })
        
        return Object.entries(grouped).map(([category, tasks]) => ({category, tasks}));
}