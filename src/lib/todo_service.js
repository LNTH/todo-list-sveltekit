import { openDB, STORE_NAME, TASK_SCHEMA } from "$lib/db"

export async function getTodosByDueDateDB(dueDateStr) {
    const db = await openDB()
    const transaction = db.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const index = store.index(TASK_SCHEMA.dueDate)
        const query = index.getAll(dueDateStr)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(query.result)
        }
    })
}

export async function addTodoDB(todo) {
    const db = await openDB()
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const query = store.add(todo)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(query.result)
        }
    })
}

export async function getTodoByIdDB(todoId) {
    const db = await openDB()
    const transaction = db.transaction([STORE_NAME], "readonly")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const query = store.get(todoId)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(query.result)
        }
    })
}

export async function updateTodoDB(todo) {
    const db = await openDB()
    const transaction = db.transaction([STORE_NAME], "readwrite")
    const store = transaction.objectStore(STORE_NAME)

    return new Promise((resolve, reject) => {
        const query = store.put(todo)

        query.onerror = () => {
            reject(query.error)
        }

        query.onsuccess = () => {
            resolve(todo)
        }
    })
}
