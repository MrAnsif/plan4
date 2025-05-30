import connectMongo from "@/lib/mongodb";
import Filing from "@/models/filings";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await connectMongo()
        const { id: customerId } = await params
        if (!customerId) {
            return NextResponse.json({ error: "Customer ID is required" }, { status: 400 });
        }

        const filings = await Filing.find({ customerId }).sort({ filingDate: -1 })

        return NextResponse.json({ success: true, filings })

    } catch (error) {
        console.error('Failed to get filing data:', error);
        return NextResponse.json({ error: "Failed to get filing data" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectMongo()
        const { id: filingId } = await params

        await Filing.findByIdAndDelete(filingId)
        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error('Failed to delete record:', error);
        return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
    }
}