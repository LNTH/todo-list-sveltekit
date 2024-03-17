import { STORE_NAME, TASK_SCHEMA } from "$lib/db"

export function getTodoByDueDateDB(db, dueDate) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly")
        const store = transaction.objectStore(STORE_NAME)
        const index = store.index(TASK_SCHEMA.dueDate)
        const query = index.getAll(dueDate)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(query.result)
        }
    })
}

export function addTodoDB(db, data) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite")
        const store = transaction.objectStore(STORE_NAME)
        const query = store.add(data)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(query.result)
        }
    })
}

function getTaskById(db, taskId) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly")
        const store = transaction.objectStore(STORE_NAME)
        const query = store.get(taskId)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(query.result)
        }
    })
}

export async function completeTodoDB(db, taskId) {
    try {
        const task = await getTaskById(db, taskId)
        task.completed= !task.completed
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], "readwrite")
            const store = transaction.objectStore(STORE_NAME)
            const query = store.put(task)

            query.onerror = () => {
                reject(query.error)
            }

            query.onsuccess = () => {
                resolve(query.result)
            }
        })
    } catch (error) {
        console.error("Error:", error);
    }


}
