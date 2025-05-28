import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    companyPhone: { type: String, required: true },

    registeredOwner: {
        ownerName: { type: String, required: true },
        ownerAddress: { type: String, required: true },
        ownerPhone: { type: String, required: true },
        ownerEmail: { type: String, required: true }
    },

    gstDetails: {
        gstNumber: { type: String, required: true },
        typeOfRegistration: {
            type: String,
            enum: ["Regular", "Composition"],
            required: true
        },
        dateOfRegistration: { type: Date, required: true },
        filingStartDate: { type: Date, required: true },
        serviceOrSales: { type: String, required: true },
        totalTax: { type: Number },
        otherExpense: { type: Number },

        cgst: { type: Number },
        sgst: { type: Number },
        igst: { type: Number },
        cess: { type: Number, default: 0 },

        compositionRate: { type: Number }
    },

    businessDetails: {
        buildingStatus: { type: String, required: true },
        rentAmount: { type: Number },
        additionalBranches: [{ type: String }]
    }

}, { timestamps: true });



export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
