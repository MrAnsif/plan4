
import { signIn, setSessionCookie } from '@/lib/auth'

export async function POST(request) {
    try {
        const { email, password } = await request.json()
        const token = await signIn(email, password)
        await setSessionCookie(token)
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}