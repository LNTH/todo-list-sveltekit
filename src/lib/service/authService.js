import { findUserByEmail } from "$lib/repo/userRepo";
import bcrypt from "bcrypt"
import { generateAccessAndRefreshTokens } from "$lib/util/tokenUtil"

export async function loginService(email, password) {
    const user = await findUserByEmail(email)
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        throw Error("user not found")
    }
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user)

    return { user, accessToken, refreshToken }
}