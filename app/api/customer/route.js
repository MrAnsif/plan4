import Customer from "@/models/customer";
import connectMongo from "@/lib/mongodb";

export async function GET() {
    try {
        await connectMongo()

        const customersData = await Customer.find({})
            .select('companyName registeredOwner.ownerName gstDetails.typeOfRegistration gstDetails.filingStartDate createdAt')

        if (!customersData) {
            return new Response(JSON.stringify({ error: 'No customer' }), { status: 404 })
        }
        return new Response(JSON.stringify(customersData), { status: 200 })

    } catch (error) {
        console.error('Failed to fetch customers data', error)
        return new Response(JSON.stringify({ error: 'Failed to fetch customers data' }), { status: 500 })
    }
}