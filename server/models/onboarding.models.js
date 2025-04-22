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
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const Onboarding = mongoose.model('Onboarding', onboardingSchema);
