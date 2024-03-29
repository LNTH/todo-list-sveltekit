import { loginService } from "$lib/service/authService"

export async function login(requestData) {
    const { email, password } = requestData
    // maybe some more validate here
    const { user, accessToken, refreshToken } = await loginService(email, password);
    
    return { user, accessToken, refreshToken }
}