import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { db } from "./dbconnector/Connect.js"
import authRoutes from "./routes/auth.route.js"
import onboardingRoutes from "./routes/onboarding.route.js"

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors({
    origin: "https://flowva-ui-design-ohd1.vercel.app/",
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
app.use("/api/onboarding", onboardingRoutes);

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
