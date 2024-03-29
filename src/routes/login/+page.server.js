import { redirect } from "@sveltejs/kit";

// TODO: handle error on UI
export const actions = {
    default: async (event) => {
        const data = await event.request.formData()
        const email = data.get("email")
        const password = data.get("password")
        const jsonBody = JSON.stringify({email, password})

        const response = await event.fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonBody
        })

        if ( !response.ok ) {
            return {
                error: "Authentication failed"
            }
        }

        const responseBody = await response.json()

        event.cookies.set("accessToken", responseBody.accessToken, {
            path: "/",
            httpOnly: true,
        })
        event.cookies.set("refreshToken", responseBody.refreshToken, {
            path: "/",
            httpOnly: true,
        })
        throw redirect(303, "/todo")
    }
}