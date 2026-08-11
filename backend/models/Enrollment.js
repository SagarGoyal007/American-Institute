const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        course: {
            type: String,
            required: true,
            trim: true,
        },

        batch: {
            type: String,
            required: true,
            enum: [
                "morning",
                "afternoon",
                "evening",
            ],
        },

        branch: {
            type: String,
            required: true,
            enum: [
                "agra",
                "delhi",
                "noida",
                "lucknow",
                "jaipur",
            ],
        },

        message: {
            type: String,
            trim: true,
            default: "",
        },
    },

    {
        timestamps: true,
    }
);


const Enrollment = mongoose.model(
    "Enrollment",
    enrollmentSchema
);


module.exports = Enrollment;