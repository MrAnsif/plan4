import connectMongo from "@/lib/mongodb";
import Customer from "@/models/customer";

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    
    // Build gstDetails object conditionally
    const gstDetails = {
      gstNumber: body.gstDetails?.gstNumber,
      typeOfRegistration: body.gstDetails?.typeOfRegistration,
      dateOfRegistration: new Date(body.gstDetails?.dateOfRegistration),
      filingStartDate: new Date(body.gstDetails?.filingStartDate),
      serviceOrSales: body.gstDetails?.serviceOrSales,
    };

    // Add optional fields if provided
    if (body.gstDetails?.totalTax !== undefined) {
      gstDetails.totalTax = body.gstDetails.totalTax;
    }
    if (body.gstDetails?.otherExpense !== undefined) {
      gstDetails.otherExpense = body.gstDetails.otherExpense;
    }

    // Only add Regular taxpayer fields if type is "Regular" and values are provided
    if (body.gstDetails?.typeOfRegistration === "Regular") {
      if (body.gstDetails?.cgst !== undefined) gstDetails.cgst = body.gstDetails.cgst;
      if (body.gstDetails?.sgst !== undefined) gstDetails.sgst = body.gstDetails.sgst;
      if (body.gstDetails?.igst !== undefined) gstDetails.igst = body.gstDetails.igst;
      if (body.gstDetails?.cess !== undefined) gstDetails.cess = body.gstDetails.cess;
    }

    // Only add Composition field if type is "Composition" and value is provided
    if (body.gstDetails?.typeOfRegistration === "Composition" && body.gstDetails?.compositionRate !== undefined) {
      gstDetails.compositionRate = body.gstDetails.compositionRate;
    }

    const newCustomer = await Customer.create({
      companyName: body.companyName,
      companyAddress: body.companyAddress,
      companyPhone: body.companyPhone,
      registeredOwner: {
        ownerName: body.registeredOwner?.ownerName,
        ownerAddress: body.registeredOwner?.ownerAddress,
        ownerPhone: body.registeredOwner?.ownerPhone,
        ownerEmail: body.registeredOwner?.ownerEmail,
      },
      gstDetails,
      businessDetails: {
        buildingStatus: body.businessDetails?.buildingStatus,
        rentAmount: body.businessDetails?.rentAmount,
        additionalBranches: body.businessDetails?.additionalBranches || [],
      }
    });
    
    return Response.json({ success: true, customer: newCustomer });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error adding customer' }), { status: 500 });
  }
}