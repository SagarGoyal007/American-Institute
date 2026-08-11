const express = require("express");
const Enrollment = require("../models/Enrollment");

const router = express.Router();


// =====================================================
// SUBMIT ENROLLMENT
// =====================================================

router.post("/", async (req, res) => {

    try {

        const {
            name,
            phone,
            email,
            course,
            batch,
            branch,
            message
        } = req.body;


        // ================= VALIDATION =================

        if (
            !name ||
            !phone ||
            !email ||
            !course ||
            !batch ||
            !branch
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill all required fields."

            });

        }


        // ================= CREATE ENROLLMENT =================

        const newEnrollment = new Enrollment({

            name,

            phone,

            email,

            course,

            batch,

            branch,

            message: message || ""

        });


        // ================= SAVE TO MONGODB =================

        const savedEnrollment =
            await newEnrollment.save();


        // ================= SUCCESS RESPONSE =================

        res.status(201).json({

            success: true,

            message:
                "Enrollment submitted successfully.",

            data: savedEnrollment

        });


    } catch (error) {

        console.error(
            "Enrollment API Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Server error. Please try again."

        });

    }

});


module.exports = router;