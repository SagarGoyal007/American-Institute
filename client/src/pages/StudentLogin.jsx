import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./StudentLogin.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =====================================================
  // STUDENT LOGIN
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/student/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      // =================================================
      // ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Login failed. Please try again."
        );
      }

      // =================================================
      // SAVE LOGIN DATA
      // =================================================

      localStorage.setItem(
        "studentToken",
        result.token
      );

      localStorage.setItem(
        "studentData",
        JSON.stringify(result.student)
      );

      // =================================================
      // STUDENT DASHBOARD
      // =================================================

      navigate("/student-dashboard");

    } catch (error) {
      console.error(
        "Student Login Error:",
        error
      );

      setError(
        error.message ||
          "Unable to login. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="student-login-page">

        <div className="student-login-wrapper">

          {/* =================================================
              LEFT STUDENT SECTION
          ================================================= */}

          <section className="student-welcome">

            <div className="welcome-badge">
              STUDENT PORTAL
            </div>

            <div className="welcome-icon">
              🎓
            </div>

            <h1>
              Welcome to Your
              <span> Student Portal</span>
            </h1>

            <p>
              Access your enrollment details, course
              information and stay connected with
              American Institute.
            </p>

            <div className="student-features">

              <div className="student-feature">
                <span>✓</span>
                <div>
                  <strong>Enrollment Status</strong>
                  <small>
                    Check your admission status
                  </small>
                </div>
              </div>

              <div className="student-feature">
                <span>✓</span>
                <div>
                  <strong>Course Information</strong>
                  <small>
                    View your enrolled courses
                  </small>
                </div>
              </div>

              <div className="student-feature">
                <span>✓</span>
                <div>
                  <strong>Student Account</strong>
                  <small>
                    Manage your account details
                  </small>
                </div>
              </div>

            </div>

          </section>


          {/* =================================================
              LOGIN SECTION
          ================================================= */}

          <section className="student-login-form-section">

            <div className="student-form-header">

              <div className="form-icon">
                👨‍🎓
              </div>

              <div>
                <h2>
                  Student Login
                </h2>

                <p>
                  Sign in to continue
                </p>
              </div>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="student-login-error">
                {error}
              </div>
            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>

              {/* ================= EMAIL ================= */}

              <div className="student-form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <div className="student-input-wrapper">

                  <span className="input-icon">
                    ✉
                  </span>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your registered email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              {/* ================= PASSWORD ================= */}

              <div className="student-form-group">

                <label htmlFor="password">
                  Password
                </label>

                <div className="student-input-wrapper">

                  <span className="input-icon">
                    🔒
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>

                </div>

              </div>


              {/* ================= LOGIN BUTTON ================= */}

              <button
                type="submit"
                className="student-login-button"
                disabled={loading}
              >

                {loading
                  ? "Signing In..."
                  : "Sign In to Student Portal"
                }

                {!loading && (
                  <span>→</span>
                )}

              </button>

            </form>


            {/* =================================================
                REGISTER
            ================================================= */}

            <div className="student-register">

              <span>
                Don't have a student account?
              </span>

              <Link to="/student-register">
                Create Account
              </Link>

            </div>


            {/* =================================================
                BACK HOME
            ================================================= */}

            <Link
              to="/"
              className="student-back-home"
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

export default StudentLogin;