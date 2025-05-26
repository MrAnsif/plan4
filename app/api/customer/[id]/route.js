import Customer from "@/models/customer";
import connectMongo from "@/lib/mongodb";


export async function GET(request, { params }) {
    try {
        await connectMongo()
        const { id: customerId } = await params

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

export async function PUT(request, { params }) {
    try {
        await connectMongo()
        const { id: customerId } = await params
        const body = await request.json()

        const updatedCustomer = await Customer.findByIdAndUpdate(customerId, body, { new: true })
        return Response.json({ success: true, customer: updatedCustomer })

    } catch (error) {
        console.error('Customer data update failed', error)
        return new Response(JSON.stringify({ error: 'Customer data update failed' }), { status: 500 })
    }
}


export async function DELETE(request, { params }) {
    try {

        await connectMongo()
        const { id: customerId } = await params

        await Customer.findByIdAndDelete(customerId)

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error('Customer data delete failed', error)
        return new Response(JSON.stringify({ error: 'Customer data delete failed ' }), { status: 500 })
    }
}