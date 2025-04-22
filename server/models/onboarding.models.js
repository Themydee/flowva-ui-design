import mongoose from 'mongoose';

const onboardingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    currentStep: {
        type: String,
        enum: ['step1', 'step2', 'step3', 'step4', 'step5'],
        default: 'step1',
    },
    data: {
        type: Object,
        default: {},
    }
}, { timestamps: true }); // 🔥 This adds and updates createdAt and updatedAt automatically


export const Onboarding = mongoose.model('Onboarding', onboardingSchema);
