import { findUserByEmail } from "$lib/repo/userRepo";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

export async function loginService(email, password) {
    const user = await findUserByEmail(email)
    console.log(user)
}