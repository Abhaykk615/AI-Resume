import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import resumeRouter from "./routes/resume.routes.js";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS setup
const allowedOrigins = process.env.ALLOWED_SITE.split(',');
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
app.use(cors(corsOptions));

// ✅ CSP setup to allow frontend & DevTools connections
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; connect-src 'self' http://localhost:5173 http://localhost:5000 ws://localhost:5173; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';"
    );
    next();
});

// API routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);

export default app;
