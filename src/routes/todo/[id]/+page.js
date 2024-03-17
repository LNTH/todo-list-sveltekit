// can not be used for SSR since required IndexedDB
export function load({ params }) {

    return {
        todo: {
            id: params.id,
            title: "test todo",
            description: "test description",
            completed: false
        }
    }
}