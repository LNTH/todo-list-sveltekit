import sql from '$lib/superbase'; 

export async function findUserByEmail(email) {
    try {
        const users = await sql`SELECT * FROM public.user WHERE email = ${email}`
        if (!users || !users[0]){
            throw Error("user rỗng")
        }
        return users[0]
    } catch (err) {
        throw Error("can not fetch user from database")
    }
    
}