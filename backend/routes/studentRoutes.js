const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");

const router = express.Router();


// =====================================================
// STUDENT AUTH MIDDLEWARE
// =====================================================

const verifyStudent = (req, res, next) => {
    try {
        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Please login."
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

        if (decoded.role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Student access required."
            });
        }

        req.student = decoded;

        next();

    } catch (error) {
        console.error(
            "Student Auth Error:",
            error
        );

        return res.status(401).json({
            success: false,
            message:
                "Session expired. Please login again."
        });
    }
};


// =====================================================
// STUDENT REGISTRATION
// =====================================================

router.post("/register", async (req, res) => {
    try {

        const {
            name,
            email,
            phone,
            password,
            course
        } = req.body;


        // ================= REQUIRED FIELDS =================

        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !course
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields are required."
            });
        }


        // ================= EMAIL VALIDATION =================

        const cleanEmail =
            email.toLowerCase().trim();

        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message:
                    "Please enter a valid email address."
            });
        }


        // ================= GMAIL VALIDATION =================
        // Only Gmail addresses are allowed.
        // Example:
        // rahul@gmail.com       = VALID
        // rahul@gmail.comfdf    = INVALID
        // rahul@yahoo.com       = INVALID

        if (!cleanEmail.endsWith("@gmail.com")) {
            return res.status(400).json({
                success: false,
                message:
                    "Please enter a valid Gmail address ending with @gmail.com."
            });
        }


        // ================= PHONE VALIDATION =================

        const cleanPhone =
            phone.trim();

        if (!/^[0-9]{10}$/.test(cleanPhone)) {
            return res.status(400).json({
                success: false,
                message:
                    "Phone number must contain exactly 10 digits."
            });
        }


        // ================= PASSWORD VALIDATION =================

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters long."
            });
        }


        // ================= CHECK EXISTING STUDENT =================

        const existingStudent =
            await Student.findOne({
                email: cleanEmail
            });

        if (existingStudent) {
            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists."
            });
        }


        // ================= HASH PASSWORD =================

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // ================= CREATE STUDENT =================

        const student =
            await Student.create({
                name:
                    name.trim(),

                email:
                    cleanEmail,

                phone:
                    cleanPhone,

                password:
                    hashedPassword,

                course:
                    course.trim(),

                role:
                    "student",

                enrollmentStatus:
                    "pending",

                adminRemark:
                    ""
            });


        // ================= RESPONSE =================

        return res.status(201).json({
            success: true,

            message:
                "Student registration successful. Your enrollment is pending admin approval.",

            student: {
                id:
                    student._id,

                name:
                    student.name,

                email:
                    student.email,

                phone:
                    student.phone,

                course:
                    student.course,

                role:
                    student.role,

                enrollmentStatus:
                    student.enrollmentStatus,

                adminRemark:
                    student.adminRemark
            }
        });

    } catch (error) {

        console.error(
            "Student Registration Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error. Please try again later."
        });
    }
});


// =====================================================
// STUDENT LOGIN
// =====================================================

router.post("/login", async (req, res) => {
    try {

        const {
            email,
            password
        } = req.body;


        // ================= REQUIRED FIELDS =================

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required."
            });
        }


        // ================= FIND STUDENT =================

        const student =
            await Student.findOne({
                email:
                    email.toLowerCase().trim()
            });

        if (!student) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password."
            });
        }


        // ================= CHECK PASSWORD =================

        const passwordMatch =
            await bcrypt.compare(
                password,
                student.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password."
            });
        }


        // =================================================
        // CREATE JWT TOKEN
        // =================================================

        const token =
            jwt.sign(
                {
                    id:
                        student._id,

                    role:
                        student.role,

                    email:
                        student.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1d"
                }
            );


        // ================= LOGIN SUCCESS =================

        return res.status(200).json({
            success: true,

            message:
                "Student login successful.",

            token,

            student: {
                id:
                    student._id,

                name:
                    student.name,

                email:
                    student.email,

                phone:
                    student.phone,

                course:
                    student.course,

                role:
                    student.role,

                enrollmentStatus:
                    student.enrollmentStatus,

                adminRemark:
                    student.adminRemark
            }
        });

    } catch (error) {

        console.error(
            "Student Login Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error. Please try again later."
        });
    }
});


// =====================================================
// GET STUDENT PROFILE
// =====================================================

router.get(
    "/profile",
    verifyStudent,
    async (req, res) => {

        try {

            const student =
                await Student.findById(
                    req.student.id
                ).select("-password");


            // ================= STUDENT NOT FOUND =================

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Student account not found."
                });
            }


            // ================= RESPONSE =================

            return res.status(200).json({
                success: true,

                student: {
                    id:
                        student._id,

                    name:
                        student.name,

                    email:
                        student.email,

                    phone:
                        student.phone,

                    course:
                        student.course,

                    role:
                        student.role,

                    enrollmentStatus:
                        student.enrollmentStatus,

                    adminRemark:
                        student.adminRemark
                }
            });

        } catch (error) {

            console.error(
                "Student Profile Error:",
                error
            );

            return res.status(500).json({
                success: false,
                message:
                    "Could not load student profile."
            });
        }
    }
);


// =====================================================
// LOGOUT
// =====================================================

router.post(
    "/logout",
    verifyStudent,
    async (req, res) => {

        return res.status(200).json({
            success: true,
            message:
                "Student logged out successfully."
        });
    }
);


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;