import { login } from "$lib/controller/authController"
import { json, error } from '@sveltejs/kit'

// TODO: handle error here, also review throw error in layers
export async function POST({ request }) {
    try {
        const data = await request.json();
        const { user, accessToken, refreshToken } = await login(data)

        const response = json({user, accessToken, refreshToken})
        response.headers.set('Set-Cookie', [
            `accessToken=${accessToken}; HttpOnly; Path=/; SameSite=Strict`, 
            `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Strict` 
        ].join(', '));

        return response
    } catch (err) {
        console.error("Error parsing request body:", err)
        error(400, { error: 'Bad Request' })
    }
}

export async function GET({ request }) {
    return json("hello")
}

