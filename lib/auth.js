import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.SESSION_SECRET)
const authEmail = process.env.AUTH_EMAIL
const authPassword = process.env.AUTH_PASSWORD


// edge supported
export async function signIn(email, password) {
    if (email !== authEmail) {
        throw new Error('Invalid credentials')
    }

    if (password !== authPassword) {
        throw new Error('Invalid credentials')
    }

    const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(secret)

    return token
}

export async function verifySession() {
    const cookieStore = await cookies()
    const token = cookieStore.get('session_token')?.value

    if (!token) {
        console.error('there no token')
        return null
    }

    try {
        const { payload } = await jwtVerify(token, secret)
        if (payload.email !== authEmail) {
            return null
        }
        return payload
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function setSessionCookie(token) {
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
    })
}

export async function clearSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete('session_token')
}