<script>
    import "../app.css";
</script>

<a href="/test">to test page</a>

<div class="container mx-auto">
    <h1 class="text-orange-600 shadow-sm text-center mt-14 md:mt-28 text-6xl md:text-8xl">Todos</h1>
    <div class="w-full mt-8 px-4 md:px-11">
        <div class="todo-container w-full bg-stone-200 rounded-lg">
            <slot/>
        </div>
    </div>
    <div class="footer h-10"></div>
</div>

<style lang="postcss">
    :root {
      @apply bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900;
      @apply font-sans
    }
</style>