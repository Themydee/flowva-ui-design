import {Onboarding} from '../models/onboarding.models.js';
import {User} from '../models/auth.models.js';

export const createOnboarding = async (req, res) => {
    const { userId, inputData } = req.body;

    try{
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //this is to check if the user already has an onboarding record created
       let onboarding = await Onboarding.findOne({ userId})
       if(onboarding) {
        return res.status(400).json({ message: 'Onboarding already exists for this user' });
       }

       //create a new onboarding record
       onboarding = new Onboarding({ userId, data: inputData });
       await onboarding.save();
        res.status(201).json({ message: 'Onboarding created successfully', onboarding });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });

    }
}

