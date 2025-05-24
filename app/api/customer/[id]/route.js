import Customer from "@/models/customer";
import connectMongo from "@/lib/mongodb";


export async function GET(req, { params }) {
    try {
        await connectMongo()
        const customerId = params.id

        const customerDetails = await Customer.findById(customerId)

        if (!customerDetails) {
            return new Response(JSON.stringify({ error: "Customer not found" }), { status: 404 })
        }
        return new Response(JSON.stringify(customerDetails), { status: 200 })

    } catch (error) {
        console.error('Customer data fetch failed', error)
        return new Response(JSON.stringify({ error: 'Customer data fetch failed ' }), { status: 500 })
    }
}