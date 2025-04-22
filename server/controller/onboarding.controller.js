import { Onboarding } from '../models/onboarding.models.js';
import { User } from '../models/auth.models.js';

export const createOnboarding = async (req, res) => {
    const { email, inputData } = req.body;

    // Validate inputData presence
    if (!inputData) {
        return res.status(400).json({ message: 'Input data is required' });
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Valid email is required' });
    }

    console.log('Received email:', email);
    console.log('Received inputData:', inputData);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let onboarding = await Onboarding.findOne({ userId: user._id });

        // Step progression logic
        const stepOrder = ['step1', 'step2', 'step3', 'step4', 'step5'];
        const nextStep = inputData.currentStep;

        if (!stepOrder.includes(nextStep)) {
            return res.status(400).json({ message: 'Invalid step provided' });
        }

        // Create new onboarding if none exists
        if (!onboarding) {
            if (nextStep !== 'step1') {
                return res.status(400).json({ message: 'Please start from step1' });
            }

            onboarding = new Onboarding({
                userId: user._id,
                data: inputData,
                currentStep: nextStep,
            });
        } else {
            const currentIndex = stepOrder.indexOf(onboarding.currentStep);
            const nextIndex = stepOrder.indexOf(nextStep);

            if (nextIndex > currentIndex + 1) {
                return res.status(400).json({ message: 'Please complete all previous steps before proceeding' });
            }

            if (nextIndex >= currentIndex) {
                onboarding.currentStep = nextStep;
            }

            onboarding.data = { ...onboarding.data, ...inputData };
            onboarding.markModified('data'); // ✅ Ensure deep changes are detected
        }

        await onboarding.save();

        console.log('✅ Onboarding saved successfully:', onboarding);

        res.status(200).json({ message: 'Onboarding saved/updated successfully', onboarding });
    } catch (error) {
        console.error('❌ Error saving or updating onboarding:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
