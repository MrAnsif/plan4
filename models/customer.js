import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    companyName: { type: String },
    companyAddress: { type: String },
    companyPhone: { type: String },

    registeredOwner: {
        ownerName: { type: String },
        ownerAddress: { type: String },
        ownerPhone: { type: String },
        ownerEmail: { type: String }
    },

    gstDetails: {
        gstNumber: { type: String },
        typeOfRegistration: {
            type: String,
            enum: ["Regular", "Composition"],

        },
        dateOfRegistration: { type: Date },
        filingStartDate: { type: Date },
        serviceOrSales: { type: String },
        totalTax: { type: Number },
        otherExpense: { type: Number },

        cgst: { type: Number },
        sgst: { type: Number },
        igst: { type: Number },
        cess: { type: Number, default: 0 },

        compositionRate: { type: Number }
    },

    businessDetails: {
        buildingStatus: { type: String },
        rentAmount: { type: Number },
        additionalBranches: [{ type: String }]
    }

}, { timestamps: true });



export default mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
