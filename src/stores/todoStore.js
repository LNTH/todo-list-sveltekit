import { writable, get } from 'svelte/store';
import {
    getTodosByDueDateDB,
    addTodoDB,
    getTodoByIdDB,
    updateTodoDB
} from '$lib/todo_service'

export const todosStore = writable([]);

export async function getTodosByDueDateStore(dueDateStr) {
    try {
        
        if (!dueDateStr) {
            throw new Error("dueDateStr is empty, pls check", dueDateStr)
        }

        const todos = await getTodosByDueDateDB(dueDateStr)
        
        if (!todos) {
            throw new Error("todos is not good, pls check", todos)
        }

        todosStore.set(todos)

    } catch (error) {
        console.log("failed to get todo by duedate", error)
    }
}

export async function addTodoStore(todo) {
    try {
        await addTodoDB(todo)
        todosStore.update(currentTodos => [...currentTodos, todo])
    } catch (error) {
        console.log("failed to add", error)
    }
}

export async function completeTodoStore(todoId) {
    try {
        
        let todo = await getTodoByIdDB(todoId)
        
        if (!todo) {
            throw new Error("todo is not good, pls check", todo)
        }
        
        todo.completed= !todo.completed
        todo = await updateTodoDB(todo)

        todosStore.update(currentTodos => {
            const index = currentTodos.findIndex(todo => todo.id === todoId)
            if (index >= 0) {
                currentTodos[index] = todo
            } else {
                todosStore.update(currentTodos => [...currentTodos, todo])
            }
            return currentTodos
        })
    } catch (error) {
        console.log("failed to complete todo", error);
    }
}

export function getLargestTodoOrder() {
    const todos = get(todosStore)
    console.log(todos);
    if (todos.length === 0) {
        return 0
    }

    const largestOrder = Math.max(...todos.map(todo => todo.order))

    return largestOrder
}