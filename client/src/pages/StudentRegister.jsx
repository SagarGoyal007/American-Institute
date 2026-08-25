import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./StudentRegister.css";

function StudentRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    // Phone number mein sirf digits allow
    if (name === "phone") {

      const onlyNumbers = value
        .replace(/\D/g, "")
        .slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        phone: onlyNumbers,
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

    }

    setError("");
    setSuccess("");
  };


  // =====================================================
  // REGISTER STUDENT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");


    // =================================================
    // PHONE VALIDATION
    // =================================================

    if (!/^[0-9]{10}$/.test(formData.phone)) {

      setError(
        "Phone number must contain exactly 10 digits."
      );

      return;
    }


    // =================================================
    // PASSWORD CHECK
    // =================================================

    if (formData.password !== formData.confirmPassword) {

      setError(
        "Password and confirm password do not match."
      );

      return;
    }


    if (formData.password.length < 6) {

      setError(
        "Password must be at least 6 characters long."
      );

      return;
    }


    // =================================================
    // COURSE CHECK
    // =================================================

    if (!formData.course) {

      setError(
        "Please select a course."
      );

      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/student/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone,
            course: formData.course,
            password: formData.password,
          }),
        }
      );


      const result = await response.json();


      // =================================================
      // ERROR
      // =================================================

      if (!response.ok) {

        throw new Error(
          result.message ||
          "Registration failed. Please try again."
        );

      }


      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        result.message ||
        "Registration submitted successfully. Please wait for admin approval."
      );


      // =================================================
      // CLEAR FORM
      // =================================================

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        password: "",
        confirmPassword: "",
      });


      // =================================================
      // GO TO LOGIN
      // =================================================

      setTimeout(() => {

        navigate("/student-login");

      }, 2500);


    } catch (error) {

      console.error(
        "Student Registration Error:",
        error
      );

      setError(
        error.message ||
        "Unable to create account. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <>
      <Navbar />

      <main className="student-register-page">

        <div className="student-register-wrapper">

          {/* =================================================
              LEFT INFORMATION
          ================================================= */}

          <section className="student-register-info">

            <div className="register-badge">
              STUDENT REGISTRATION
            </div>

            <div className="register-icon">
              🎓
            </div>

            <h1>
              Start Your
              <span> Student Journey</span>
            </h1>

            <p>
              Create your student account at
              American Institute and stay connected
              with your enrollment and course details.
            </p>


            <div className="register-points">

              <div className="register-point">

                <span>✓</span>

                <div>
                  <strong>
                    Easy Registration
                  </strong>

                  <small>
                    Create your account in a few steps
                  </small>
                </div>

              </div>


              <div className="register-point">

                <span>✓</span>

                <div>
                  <strong>
                    Admin Verification
                  </strong>

                  <small>
                    Your account will be reviewed by admin
                  </small>
                </div>

              </div>


              <div className="register-point">

                <span>✓</span>

                <div>
                  <strong>
                    Secure Student Portal
                  </strong>

                  <small>
                    Access your account after approval
                  </small>
                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              REGISTRATION FORM
          ================================================= */}

          <section className="student-register-form-section">

            <div className="register-form-header">

              <div className="register-form-icon">
                👨‍🎓
              </div>

              <div>

                <h2>
                  Create Student Account
                </h2>

                <p>
                  Enter your details to register
                </p>

              </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

              <div className="student-register-error">
                {error}
              </div>

            )}


            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (

              <div className="student-register-success">
                {success}
              </div>

            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>

              {/* ================= NAME ================= */}

              <div className="register-form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* ================= EMAIL ================= */}

              <div className="register-form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* ================= PHONE ================= */}

              <div className="register-form-group">

                <label htmlFor="phone">
                  Phone Number
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength="10"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  required
                />

              </div>


              {/* ================= COURSE ================= */}

              <div className="register-form-group">

                <label htmlFor="course">
                  Select Course
                </label>

                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select your course
                  </option>

                  <option value="IELTS">
                    IELTS
                  </option>

                  <option value="PTE">
                    PTE
                  </option>

                  <option value="Spoken English">
                    Spoken English
                  </option>

                </select>

              </div>


              {/* ================= PASSWORD ================= */}

              <div className="register-form-group">

                <label htmlFor="password">
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  required
                />

              </div>


              {/* ================= CONFIRM PASSWORD ================= */}

              <div className="register-form-group">

                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  minLength="6"
                  required
                />

              </div>


              {/* ================= SUBMIT ================= */}

              <button
                type="submit"
                className="student-register-button"
                disabled={loading}
              >

                {loading
                  ? "Creating Account..."
                  : "Create Student Account"
                }

                {!loading && (
                  <span>→</span>
                )}

              </button>

            </form>


            {/* =================================================
                LOGIN LINK
            ================================================= */}

            <div className="student-login-link">

              <span>
                Already have an account?
              </span>

              <Link to="/student-login">
                Student Login
              </Link>

            </div>


            {/* =================================================
                HOME
            ================================================= */}

            <Link
              to="/"
              className="student-register-home"
            >
              ← Back to Home
            </Link>

          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default StudentRegister;