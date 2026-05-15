import rateLimit from "express-rate-limit";

const bookingLimiter = rateLimit({

    windowMs: 1 * 60 * 1000,

    max: 2,

    message: {
        success: false,
        message: "Too many booking requests. Try again later."
    }
});
export default bookingLimiter;