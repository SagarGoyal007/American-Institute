const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // =========================
    // STUDENT BASIC DETAILS
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // LOGIN PASSWORD
    // =========================

    password: {
      type: String,
      required: true,
    },

    // =========================
    // STUDENT ROLE
    // =========================

    role: {
      type: String,
      default: "student",
      enum: ["student"],
    },

    // =========================
    // COURSE
    // =========================

    course: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // ENROLLMENT STATUS
    // =========================

    enrollmentStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // =========================
    // ADMIN REMARK
    // =========================

    adminRemark: {
      type: String,
      default: "",
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

const Student = mongoose.model(
  "Student",
  studentSchema
);

module.exports = Student;