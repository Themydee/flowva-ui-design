import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import {User} from "../models/auth.models.js"
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from '../mailer/email.template.js'
import transporter from '../mailer/mailsend.config.js'
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js'

export const signup = async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'}) // this allows all field to be filled and ensures they are filled
        }

        const userExists = await User.findOne({ email })
        if(userExists){
            return res.status(400).json({message: "User already exists"}) // this checks if a user with the same email exists and if it does double registration isn't possible 
        }

        const protectPassword = await bcrypt.hash(password, 10)  // to encrypt users password

        const verificationToken = Math.floor(10000 + Math.random() * 90000).toString(); // this sends a unique token to the user when signing up

        const newUser = new User({
            email,
            password: protectPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        await newUser.save();
        generateTokenAndSetCookie(res, newUser._id);

        //send verification mail

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Verify Your Flowvo Account',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Verification",
        }

        await transporter.sendMail(mailOptions)

        res.status(201).json(
            {
                success: true,
                message: "User created successfully",
                user: {
                    _id: newUser._id,
                    email: newUser.email,
                },
            }
        )
    } catch (error) { 
        res.status(400).json({success: false, message: error.message})
    }
}

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code, 
            verificationTokenExpiresAt: {$gt: Date.now()}
        }) // this checks if the token is valid and not expired 

        if(!User) {
            cosnole.log("Invalid or expired token")
            return res.status(400).json({success: false, message: "Invalid or expired token"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        // Send welcome email
        const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Welcome to the platform!",
        html: WELCOME_EMAIL_TEMPLATE.replace("{name}", user.name),
        category: "welcome",
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
              _id: user._id,
              email: user.email,  
              isVerified: user.isVerified,
              lastLogin: user.lastLogin,
            }
          });
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({success: false, message: "Invalid Email"}) //if no user with the email is found it sends this response
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({success: false, message: 'Invalid Password' }) //if password doesnt match with password in the database it sends this response
        }

        //Generate jwt token here
        const token = jwt.sign(
            {   userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h'}
        );

        //set token in a cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3600000, //1hour
        })

        user.lastLogin = new Date();
        await user.save()


        res.status(201).json({
            success: true,
            message: 'You have been successfully logged in',
            token,
            user: {
                _id: user._id,
                email: user.email,
                isVerified: user.isVerified,
                lastLogin: user.lastLogin
            }
            
        })

    } catch (error) {
        console.error("Login error", error)
        res.status(500).json({success: false, message: "Internal server error"})
    }
}