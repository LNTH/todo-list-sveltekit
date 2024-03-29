import sql from '$lib/superbase'; 

export async function findUserByEmail(email) {
    console.log("repo layer", email)
    try {
        const user = await sql`SELECT * FROM public.user WHERE email = ${email}`;
        return user
    } catch (err) {
        console.log(err)
        return {email: "sai email"}
    }
    
}