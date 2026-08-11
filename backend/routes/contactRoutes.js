const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();


// ================= SUBMIT CONTACT FORM =================

router.post("/", async (req, res) => {

    try {

        const { name, email, phone, message } = req.body;


        // Basic validation

        if (!name || !email || !phone || !message) {

            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });

        }


        // Create new contact

        const newContact = new Contact({
            name,
            email,
            phone,
            message
        });


        // Save to MongoDB

        const savedContact = await newContact.save();


        res.status(201).json({

            success: true,

            message: "Message submitted successfully.",

            data: savedContact

        });

    } catch (error) {

        console.error("Contact API Error:", error);

        res.status(500).json({

            success: false,

            message: "Server error. Please try again."

        });

    }

});


module.exports = router;