const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Contact = require("../models/Contact");
const Enrollment = require("../models/Enrollment");
const Student = require("../models/Student");

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
            message:
                "Session expired. Please login again."
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
                message:
                    "Could not load dashboard stats."
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
                message:
                    "Could not load enrollments."
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
                message:
                    "Could not load contacts."
            });
        }
    }
);


// =====================================================
// GET ALL STUDENTS
// =====================================================

router.get(
    "/students",
    verifyAdmin,
    async (req, res) => {
        try {

            const students =
                await Student
                    .find()
                    .select("-password")
                    .sort({ createdAt: -1 });

            res.json({
                success: true,
                data: students
            });

        } catch (error) {
            console.error(
                "Student Fetch Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not load students."
            });
        }
    }
);


// =====================================================
// GET PENDING STUDENT REQUESTS
// =====================================================

router.get(
    "/students/pending",
    verifyAdmin,
    async (req, res) => {
        try {

            const students =
                await Student
                    .find({
                        enrollmentStatus: "pending"
                    })
                    .select("-password")
                    .sort({ createdAt: -1 });

            res.json({
                success: true,
                data: students
            });

        } catch (error) {
            console.error(
                "Pending Students Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not load pending student requests."
            });
        }
    }
);


// =====================================================
// APPROVE STUDENT
// =====================================================

router.put(
    "/students/:id/approve",
    verifyAdmin,
    async (req, res) => {
        try {

            const student =
                await Student.findById(
                    req.params.id
                );

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found."
                });
            }

            student.enrollmentStatus =
                "approved";

            student.adminRemark =
                req.body.adminRemark ||
                "Your enrollment request has been approved.";

            await student.save();

            res.json({
                success: true,
                message:
                    "Student approved successfully.",
                student: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    phone: student.phone,
                    course: student.course,
                    role: student.role,
                    enrollmentStatus:
                        student.enrollmentStatus,
                    adminRemark:
                        student.adminRemark
                }
            });

        } catch (error) {
            console.error(
                "Approve Student Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not approve student."
            });
        }
    }
);


// =====================================================
// REJECT STUDENT
// =====================================================

router.put(
    "/students/:id/reject",
    verifyAdmin,
    async (req, res) => {
        try {

            const student =
                await Student.findById(
                    req.params.id
                );

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found."
                });
            }

            student.enrollmentStatus =
                "rejected";

            student.adminRemark =
                req.body.adminRemark ||
                "Your enrollment request has been rejected.";

            await student.save();

            res.json({
                success: true,
                message:
                    "Student rejected successfully.",
                student: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    phone: student.phone,
                    course: student.course,
                    role: student.role,
                    enrollmentStatus:
                        student.enrollmentStatus,
                    adminRemark:
                        student.adminRemark
                }
            });

        } catch (error) {
            console.error(
                "Reject Student Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not reject student."
            });
        }
    }
);


// =====================================================
// UPDATE STUDENT STATUS
// =====================================================

router.put(
    "/students/:id/status",
    verifyAdmin,
    async (req, res) => {
        try {

            const {
                enrollmentStatus,
                adminRemark
            } = req.body;

            if (
                !enrollmentStatus ||
                ![
                    "pending",
                    "approved",
                    "rejected"
                ].includes(enrollmentStatus)
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid enrollment status."
                });
            }

            const student =
                await Student.findById(
                    req.params.id
                );

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found."
                });
            }

            student.enrollmentStatus =
                enrollmentStatus;

            if (
                adminRemark !== undefined
            ) {
                student.adminRemark =
                    adminRemark;
            }

            await student.save();

            res.json({
                success: true,
                message:
                    "Student status updated successfully.",
                student: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    phone: student.phone,
                    course: student.course,
                    role: student.role,
                    enrollmentStatus:
                        student.enrollmentStatus,
                    adminRemark:
                        student.adminRemark
                }
            });

        } catch (error) {
            console.error(
                "Student Status Update Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not update student status."
            });
        }
    }
);


// =====================================================
// EDIT / UPDATE STUDENT
// =====================================================

router.put(
    "/students/:id",
    verifyAdmin,
    async (req, res) => {
        try {

            const {
                name,
                email,
                phone,
                course,
                adminRemark
            } = req.body;


            // ================= VALIDATION =================

            if (
                !name ||
                !email ||
                !phone ||
                !course
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Name, email, phone and course are required."
                });
            }


            // ================= FIND STUDENT =================

            const student =
                await Student.findById(
                    req.params.id
                );

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found."
                });
            }


            // ================= CHECK DUPLICATE EMAIL =================

            const existingStudent =
                await Student.findOne({
                    email: email.trim().toLowerCase(),
                    _id: {
                        $ne: req.params.id
                    }
                });

            if (existingStudent) {
                return res.status(409).json({
                    success: false,
                    message:
                        "Another student is already registered with this email."
                });
            }


            // ================= UPDATE =================

            student.name =
                name.trim();

            student.email =
                email.trim().toLowerCase();

            student.phone =
                phone.trim();

            student.course =
                course.trim();

            if (
                adminRemark !== undefined
            ) {
                student.adminRemark =
                    String(adminRemark).trim();
            }


            // ================= SAVE =================

            await student.save();


            // ================= RESPONSE =================

            res.json({
                success: true,
                message:
                    "Student updated successfully.",
                student: {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    phone: student.phone,
                    course: student.course,
                    role: student.role,
                    enrollmentStatus:
                        student.enrollmentStatus,
                    adminRemark:
                        student.adminRemark
                }
            });

        } catch (error) {

            console.error(
                "Edit Student Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not update student."
            });
        }
    }
);


// =====================================================
// DELETE STUDENT
// =====================================================

router.delete(
    "/students/:id",
    verifyAdmin,
    async (req, res) => {
        try {

            const student =
                await Student.findByIdAndDelete(
                    req.params.id
                );

            if (!student) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Student not found."
                });
            }

            res.json({
                success: true,
                message:
                    "Student deleted successfully."
            });

        } catch (error) {
            console.error(
                "Delete Student Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not delete student."
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
                message:
                    "Enrollment deleted successfully."
            });

        } catch (error) {
            console.error(
                "Delete Enrollment Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not delete enrollment."
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
                message:
                    "Contact deleted successfully."
            });

        } catch (error) {
            console.error(
                "Delete Contact Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Could not delete contact."
            });
        }
    }
);


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;