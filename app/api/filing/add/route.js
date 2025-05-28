import connectMongo from "@/lib/mongodb";
import Filing from "@/models/filings";
import Customer from "@/models/customer";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectMongo()
        const body = await req.json();

        const { customerId } = body;
        const customer = await Customer.findById(customerId)

        if (!customer) {
            return res.status(404).json({ error: 'Customer not founded' })
        }

        const typeOfRegistration = customer.gstDetails.typeOfRegistration

        const newFiling = await Filing.create({
            customerId: body.customerId,
            filingDate: body.filingDate,
            income: body.income,
            totalTaxPayable: {
                totalTax: body.totalTaxPayable?.totalTax,
                cgst: body.totalTaxPayable?.cgst,
                sgst: body.totalTaxPayable?.sgst,
                igst: body.totalTaxPayable?.igst,
                cess: body.totalTaxPayable?.cess,
                compositionTax: body.totalTaxPayable?.compositionTax
            },
            typeOfRegistration: typeOfRegistration,
        })

        return NextResponse.json({ success: true, filing: newFiling })
    } catch (error) {
        console.error('Failed to add filing:', error);
        return NextResponse.json({ error: "Failed to add filing" }, { status: 500 });
    }
}
