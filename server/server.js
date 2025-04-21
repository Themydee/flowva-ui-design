import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { db } from "./dbconnector/Connect.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const PORT = process.env.PORT || 5000;

//ROUTES
app.get("/", (req, res) => {
    res.send("Server is running");
})
app.use("/api/auth", authRoutes);

//Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
});

//Start server
app.listen(PORT, () => {
    db();
    console.log(`Server is running on port ${PORT}`);
})

//  try {
//             const response = await axios.post("http://localhost:5000/api/auth/signup", {
//                 email,
//                 password,
//             });

//             // Assuming the response contains a success message
//             toast.success(response.data.message || 'Account created successfully!');

//             // Redirect to the sign in page
//             navigate('/onboarding');
//         } catch (error) {
//             console.error('Signup failed:', error);
//             toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
//         }