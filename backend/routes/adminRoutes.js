const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Contact = require("../models/Contact");
const Enrollment = require("../models/Enrollment");

const router = express.Router();


// =====================================================
// ADMIN LOGIN
// =====================================================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });

        }


        // ================= CHECK EMAIL =================

        if (email !== process.env.ADMIN_EMAIL) {

            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials."
            });

        }


        // ================= CHECK PASSWORD =================

        const passwordMatch = await bcrypt.compare(
            password,
            await bcrypt.hash(
                process.env.ADMIN_PASSWORD,
                10
            )
        );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials."
            });

        }


        // ================= CREATE TOKEN =================

        const token = jwt.sign(

            {
                email: process.env.ADMIN_EMAIL,
                role: "admin"
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );


        res.json({

            success: true,

            message: "Login successful.",

            token

        });


    } catch (error) {

        console.error(
            "Admin Login Error:",
            error
        );

        res.status(500).json({

            success: false,

            message: "Server error."

        });

    }

});


// =====================================================
// ADMIN AUTH MIDDLEWARE
// =====================================================

const verifyAdmin = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: "Access denied."
            });

        }


        const token =
            authHeader.split(" ")[1];


        if (!token) {

            return res.status(401).json({
                success: false,
                message: "Invalid token."
            });

        }


        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        if (decoded.role !== "admin") {

            return res.status(403).json({
                success: false,
                message: "Admin access required."
            });

        }


        req.admin = decoded;

        next();


    } catch (error) {

        return res.status(401).json({

            success: false,

            message: "Session expired. Please login again."

        });

    }

};


// =====================================================
// DASHBOARD STATS
// =====================================================

router.get(
    "/stats",
    verifyAdmin,
    async (req, res) => {

        try {

            const totalContacts =
                await Contact.countDocuments();


            const totalEnrollments =
                await Enrollment.countDocuments();


            const ielts =
                await Enrollment.countDocuments({
                    course: "IELTS"
                });


            const pte =
                await Enrollment.countDocuments({
                    course: "PTE"
                });


            const spokenEnglish =
                await Enrollment.countDocuments({
                    course: "Spoken English"
                });


            res.json({

                success: true,

                stats: {

                    totalContacts,

                    totalEnrollments,

                    ielts,

                    pte,

                    spokenEnglish

                }

            });


        } catch (error) {

            console.error(
                "Stats Error:",
                error
            );

            res.status(500).json({

                success: false,

                message: "Could not load dashboard stats."

            });

        }

    }
);


// =====================================================
// GET ALL ENROLLMENTS
// =====================================================

router.get(
    "/enrollments",
    verifyAdmin,
    async (req, res) => {

        try {

            const enrollments =
                await Enrollment
                    .find()
                    .sort({ createdAt: -1 });


            res.json({

                success: true,

                data: enrollments

            });


        } catch (error) {

            console.error(
                "Enrollment Fetch Error:",
                error
            );

            res.status(500).json({

                success: false,

                message: "Could not load enrollments."

            });

        }

    }
);


// =====================================================
// GET ALL CONTACTS
// =====================================================

router.get(
    "/contacts",
    verifyAdmin,
    async (req, res) => {

        try {

            const contacts =
                await Contact
                    .find()
                    .sort({ createdAt: -1 });


            res.json({

                success: true,

                data: contacts

            });


        } catch (error) {

            console.error(
                "Contact Fetch Error:",
                error
            );

            res.status(500).json({

                success: false,

                message: "Could not load contacts."

            });

        }

    }
);


// =====================================================
// DELETE ENROLLMENT
// =====================================================

router.delete(
    "/enrollments/:id",
    verifyAdmin,
    async (req, res) => {

        try {

            await Enrollment.findByIdAndDelete(
                req.params.id
            );


            res.json({

                success: true,

                message: "Enrollment deleted successfully."

            });


        } catch (error) {

            console.error(
                "Delete Enrollment Error:",
                error
            );

            res.status(500).json({

                success: false,

                message: "Could not delete enrollment."

            });

        }

    }
);


// =====================================================
// DELETE CONTACT
// =====================================================

router.delete(
    "/contacts/:id",
    verifyAdmin,
    async (req, res) => {

        try {

            await Contact.findByIdAndDelete(
                req.params.id
            );


            res.json({

                success: true,

                message: "Contact deleted successfully."

            });


        } catch (error) {

            console.error(
                "Delete Contact Error:",
                error
            );

            res.status(500).json({

                success: false,

                message: "Could not delete contact."

            });

        }

    }
);


module.exports = router;