import { loginService } from "$lib/service/userService"
import { json } from "@sveltejs/kit";

export async function login(requestData) {
    const { email, password } = requestData
    // maybe some more validate here
    const user = loginService(email, password);
    return json(user)
}