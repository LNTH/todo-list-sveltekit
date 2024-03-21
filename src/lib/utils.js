export function generateUniqueId() {
    const timestamp = Date.now()
    const randomPart = Math.floor(Math.random() * 100000)

    return `id-${timestamp}-${randomPart}`
}

export function getTodayDate() {
    const today = new Date()
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`;
}