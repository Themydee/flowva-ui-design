import mongoose from 'mongoose';

const onboardingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    stepsCompleted: {
        type: [String], // Array of completed steps
        default: [],
    },
    currentStep: {
        type: String, // The current step the user is on
        enum: ['profile_setup', 'preferences', 'tutorial', 'finished'], // Define possible steps
        default: 'profile_setup',
    },
    isCompleted: {
        type: Boolean, // Whether the onboarding process is completed
        default: false,
    },
    data: {
        type: Object, // Flexible structure to store input data for each step
        default: {}, // Default to an empty object
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