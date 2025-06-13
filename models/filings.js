import mongoose from "mongoose";

const FilingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    filingDate: {
        type: Date
    },
    income: {
        type: Number
    },
    totalTaxPayable: {
        totalTax: { type: Number, default: 0 },
        cgst: { type: Number, default: 0 },
        sgst: { type: Number, default: 0 },
        igst: { type: Number, default: 0 },
        cess: { type: Number, default: 0 },
        compositionTax: { type: Number, default: 0 }
    },
    typeOfRegistration: {
        type: String,
        enum: ['Regular', 'Composition']
    }
}, { timestamps: true });

export default mongoose.models.Filing || mongoose.model('Filing', FilingSchema);