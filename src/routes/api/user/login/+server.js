import { login } from "$lib/controller/userController"
import { json, error  } from '@sveltejs/kit';

export async function POST({request}) {
    try {
        const data = await request.json();
        const user = await login(data)
        return json(user)
    } catch (err) {
        console.error("Error parsing request body:", err);
        return error(400, { error: 'Bad Request' });
    }

}

export async function GET({request}) {
    return json("hello")
}

