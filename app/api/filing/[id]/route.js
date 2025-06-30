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

export async function PUT(request, { params }) {
    try {
        await connectMongo()
        const { id: filingId } = await params
        const body = await request.json()

        if (!filingId) {
            return NextResponse.json({ error: "Filing ID is required" }, { status: 400 });
        }

        // Validate required fields
        const { customerId, filingDate, income, totalTaxPayable, typeOfRegistration } = body

        if (!customerId || !filingDate || income === undefined || !totalTaxPayable || !typeOfRegistration) {
            return NextResponse.json({ 
                error: "Missing required fields: customerId, filingDate, income, totalTaxPayable, typeOfRegistration" 
            }, { status: 400 });
        }

        // Update the filing
        const updatedFiling = await Filing.findByIdAndUpdate(
            filingId,
            {
                customerId,
                filingDate,
                income: parseFloat(income) || 0,
                totalTaxPayable: {
                    totalTax: parseFloat(totalTaxPayable.totalTax) || 0,
                    cgst: parseFloat(totalTaxPayable.cgst) || 0,
                    sgst: parseFloat(totalTaxPayable.sgst) || 0,
                    igst: parseFloat(totalTaxPayable.igst) || 0,
                    cess: parseFloat(totalTaxPayable.cess) || 0,
                    compositionTax: parseFloat(totalTaxPayable.compositionTax) || 0,
                },
                typeOfRegistration,
                gstr1: body.gstr1 || '',
                gstr3b: body.gstr3b || '',
                gstr9: body.gstr9 || '',
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        )

        if (!updatedFiling) {
            return NextResponse.json({ error: "Filing not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            message: "Filing updated successfully",
            filing: updatedFiling
        }, { status: 200 });

    } catch (error) {
        console.error('Failed to update filing:', error);
        return NextResponse.json({ 
            error: error.message || "Failed to update filing" 
        }, { status: 500 });
    }
}