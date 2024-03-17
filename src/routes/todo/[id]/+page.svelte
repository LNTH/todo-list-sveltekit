<script>
    export let data
</script>

<div class="w-full bg-inherit flex flex-col p-4">
    <h1 class="text-2xl">{data.todo.title}</h1>
    <h2 class="text-xl">{data.todo.description}</h2>
    <input
        type="checkbox"
        class="basis-1/12 md:h-6 md:w-6"
        bind:checked={data.todo.completed}
    />
</div>