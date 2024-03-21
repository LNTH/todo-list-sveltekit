

// $: numTodos = todos.filter((todo) => todo.completed === false).length;


export let getTodayDateEvent = (node) => {
    const today = new Date()
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`;

    node.value = formattedDate
    
    return {
        destroy() {
            console.log("destroy, do something pls")
        }
    }
}




// let currentDragItemIdx;
// const handleDragStart = (event, index) => {
//     currentDragItemIdx = index;
//     console.log("drag index", currentDragItemIdx);
// };

// let currentDropTargetIndex;
// function handleDragOver(event, index) {
//     event.preventDefault();
//     console.log("drag to index", index);
//     currentDropTargetIndex = index;
// }