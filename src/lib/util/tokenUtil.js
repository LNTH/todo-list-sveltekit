import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

dotenv.config();
// TODO: update exprired day using env var
export function generateAccessAndRefreshTokens(user) {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET 
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET

    const accessToken = jwt.sign(
        {
            email: user.email,
        },
        accessTokenSecret,
        { expiresIn: "1d" } 
    );

    const refreshToken = jwt.sign(
        {
            email: user.email,
        },
        refreshTokenSecret,
        { expiresIn: "30d" } 
    );

    return { accessToken, refreshToken };
}