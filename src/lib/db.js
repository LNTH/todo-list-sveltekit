const DB_NAME = 'todo' 
const DB_VERSION = 1
const STORE_NAME = 'task' 

const TASK_SCHEMA = {
    id: "id",
    order: "order",
    name: "name",
    content: "content",
    dueDate: "dueDate",
    completed: "completed"
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)

        request.onupgradeneeded = (event) => {
            let db = event.target.result
            const store = db.createObjectStore(STORE_NAME, { keyPath: TASK_SCHEMA.id })
            store.createIndex(TASK_SCHEMA.dueDate, TASK_SCHEMA.dueDate, { unique: false }) // index - prop
            // store.createIndex(TASK_SCHEMA.content, TASK_SCHEMA.content, { unique: false }) // no need because no query
            // store.createIndex(TASK_SCHEMA.completed, TASK_SCHEMA.completed, { unique: false }) // no need because no query
        }

        request.onerror = (event) => {
            reject('Database error: ' + event.target.errorCode)
        }

        request.onsuccess = (event) => {
            resolve(event.target.result)
        }
    })
}


export {openDB, STORE_NAME, TASK_SCHEMA}