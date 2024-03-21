<script>
    import { onMount } from "svelte";
    import { getTodayDateEvent } from "./event";
    import {
        todosStore,
        getTodosByDueDateStore,
        addTodoStore,
        completeTodoStore,
        getLargestTodoOrder
    } from "../../stores/todoStore";
    import { generateUniqueId, getTodayDate } from "$lib/utils";

    // onMount to run on 1st time open page
    let selectedDate = "";
    onMount(async () => {
        selectedDate = getTodayDate()
        await getTodosByDueDateStore(selectedDate)
    });

    // this one to run after each time date picker value changed
    $: if (selectedDate) {
        (async () => {
            await getTodosByDueDateStore(selectedDate);
        })();
    }

    let newTodo = "";
    const addTodo = async () => {
        if (newTodo !== "") {

            let todoOrder = getLargestTodoOrder() + 1

            const todo = {
                id: generateUniqueId(),
                order: todoOrder,
                name: newTodo,
                content: "",
                dueDate: selectedDate,
                completed: false,
            };

            await addTodoStore(todo)
            newTodo = ""
        }
    };

    const completeTodo = async (todoId) => {
        await completeTodoStore(todoId)
    }

    // $: numTodos = todos.filter((todo) => todo.completed === false).length;

</script>

<div class="todo flex flex-col">
    <div
        class="flex flex-col md:flex-row w-full border-stone-600 border-b-2 rounded-t-md bg-white justify-center md:items-center"
    >
    <form 
        class="md:basis-3/5 lg:basis-4/5"
        on:submit|preventDefault={addTodo}
    >
        <input
            placeholder="What needs to be done?"
            class="rounded-t-md w-full py-4 pl-4 md:pl-14 lg:pl-24 text-lg md:text-2xl lg:text-4xl outline-none"
            maxlength="60"
            bind:value={newTodo}
        />
            <button class="hidden"></button>
        </form>
        <div class="md:basis-2/5 lg:basis-1/5 flex justify-end">
            <input
                type="date"
                id="date-picker"
                class="text-md md:text-2xl lg:text-4xl md:py-4 outline-none pl-4 pr-8 text-neutral-500"
                use:getTodayDateEvent
                bind:value={selectedDate}
            />
        </div>
    </div>

    <div class="rounded-b-md w-full divide-y divide-stone-600 divide-dashed">
        <div
            class="text-md md:text-2xl py-4 pl-4 md:pl-14 lg:pl-24 text-neutral-500"
        >
            <!-- {numTodos} remaining -->
        </div>
        {#each $todosStore as { id, name, completed }, index}
            <!-- svelte-ignore a11y-no-static-element-interactions -->

            <div
                class="w-full flex flex-row items-center p-4 text-md md:text-2xl drop-zone"
                draggable="true"
            >
                <div class="basis-1/12 flex items-center justify-center">
                    <input
                        type="checkbox"
                        id="todo-done-chkb"
                        class="checkbox"
                        checked={completed}
                        on:click|preventDefault={completeTodo(id)}
                    />
                </div>
                <div
                    class="basis-10/12 truncate px-2
                    {completed ? 'line-through' : ''}
                    "
                >
                    {name}
                </div>

                <a
                    href="/todo/{id}"
                    class="basis-1/12 flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                    </svg>
                </a>
            </div>
        {/each}
    </div>
</div>

<!-- reduce padding of Calendar picker (not work) -->
<style lang="postcss">
    input::-webkit-calendar-picker-indicator {
        @apply ml-0;
    }
    ::-webkit-calendar-picker-indicator {
        @apply ml-0;
    }
</style>
