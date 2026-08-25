import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StudentDashboard.css";

function StudentDashboard() {
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================================
    // LOAD STUDENT DATA
    // =====================================================

    useEffect(() => {
        const token =
            localStorage.getItem("studentToken");

        const savedStudent =
            localStorage.getItem("studentData");

        if (!token) {
            navigate("/student-login");
            return;
        }

        if (savedStudent) {
            try {
                setStudent(
                    JSON.parse(savedStudent)
                );
            } catch (error) {
                console.error(
                    "Student Data Error:",
                    error
                );
            }
        }

        fetchStudentData(token);
    }, [navigate]);


    // =====================================================
    // FETCH LATEST STUDENT DATA
    // =====================================================

    const fetchStudentData = async (token) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/student/profile",
                {
                    method: "GET",
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Could not load student profile."
                );
            }

            if (result.student) {
                setStudent(result.student);

                localStorage.setItem(
                    "studentData",
                    JSON.stringify(
                        result.student
                    )
                );
            }

        } catch (error) {
            console.error(
                "Student Dashboard Error:",
                error
            );

            /*
             * Agar profile API abhi available nahi hai,
             * to localStorage wala data use karenge.
             */
            const savedStudent =
                localStorage.getItem(
                    "studentData"
                );

            if (!savedStudent) {
                setError(
                    error.message ||
                    "Unable to load student details."
                );
            }

        } finally {
            setLoading(false);
        }
    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        localStorage.removeItem(
            "studentToken"
        );

        localStorage.removeItem(
            "studentData"
        );

        navigate("/student-login");
    };


    // =====================================================
    // STATUS CONFIG
    // =====================================================

    const getStatusClass = () => {
        if (
            student?.enrollmentStatus ===
            "approved"
        ) {
            return "status-approved";
        }

        if (
            student?.enrollmentStatus ===
            "rejected"
        ) {
            return "status-rejected";
        }

        return "status-pending";
    };


    const getStatusText = () => {
        if (
            student?.enrollmentStatus ===
            "approved"
        ) {
            return "Approved";
        }

        if (
            student?.enrollmentStatus ===
            "rejected"
        ) {
            return "Rejected";
        }

        return "Pending";
    };


    const getStatusMessage = () => {
        if (
            student?.enrollmentStatus ===
            "approved"
        ) {
            return "Your enrollment request has been approved by the administrator.";
        }

        if (
            student?.enrollmentStatus ===
            "rejected"
        ) {
            return "Your enrollment request has been rejected by the administrator.";
        }

        return "Your enrollment request is currently under review.";
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading && !student) {
        return (
            <>
                <Navbar />

                <section className="student-dashboard-loading">
                    <div className="dashboard-loader">
                        <div className="loader-circle"></div>

                        <p>
                            Loading your dashboard...
                        </p>
                    </div>
                </section>

                <Footer />
            </>
        );
    }


    // =====================================================
    // MAIN DASHBOARD
    // =====================================================

    return (
        <>
            <Navbar />

            <main className="student-dashboard">

                {/* =================================================
                    DASHBOARD HEADER
                ================================================= */}

                <section className="student-dashboard-header">

                    <div className="dashboard-header-content">

                        <div>
                            <span className="dashboard-badge">
                                STUDENT PORTAL
                            </span>

                            <h1>
                                Welcome,
                                {" "}
                                {student?.name ||
                                    "Student"}
                                !
                            </h1>

                            <p>
                                Manage your student
                                account and check
                                your enrollment status.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="student-logout-button"
                            onClick={
                                handleLogout
                            }
                        >
                            Logout
                        </button>

                    </div>

                </section>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                    <div className="student-dashboard-error">
                        {error}
                    </div>
                )}


                {/* =================================================
                    DASHBOARD CONTENT
                ================================================= */}

                <section className="student-dashboard-content">

                    {/* =================================================
                        STATUS CARD
                    ================================================= */}

                    <div
                        className={`student-status-card ${getStatusClass()}`}
                    >

                        <div className="status-icon">
                            {student?.enrollmentStatus ===
                            "approved"
                                ? "✓"
                                : student?.enrollmentStatus ===
                                  "rejected"
                                ? "×"
                                : "!"}
                        </div>

                        <div className="status-content">

                            <span className="status-label">
                                Enrollment Status
                            </span>

                            <h2>
                                {getStatusText()}
                            </h2>

                            <p>
                                {getStatusMessage()}
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        INFORMATION CARDS
                    ================================================= */}

                    <div className="student-dashboard-grid">

                        {/* =================================================
                            PROFILE CARD
                        ================================================= */}

                        <div className="student-dashboard-card">

                            <div className="card-heading">

                                <div className="card-heading-icon">
                                    👤
                                </div>

                                <div>
                                    <h2>
                                        Student Profile
                                    </h2>

                                    <p>
                                        Your registered
                                        account details
                                    </p>
                                </div>

                            </div>


                            <div className="student-info-list">

                                <div className="student-info-row">
                                    <span>
                                        Full Name
                                    </span>

                                    <strong>
                                        {student?.name ||
                                            "—"}
                                    </strong>
                                </div>


                                <div className="student-info-row">
                                    <span>
                                        Email Address
                                    </span>

                                    <strong>
                                        {student?.email ||
                                            "—"}
                                    </strong>
                                </div>


                                <div className="student-info-row">
                                    <span>
                                        Phone Number
                                    </span>

                                    <strong>
                                        {student?.phone ||
                                            "—"}
                                    </strong>
                                </div>


                                <div className="student-info-row">
                                    <span>
                                        Account Role
                                    </span>

                                    <strong>
                                        Student
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            COURSE CARD
                        ================================================= */}

                        <div className="student-dashboard-card">

                            <div className="card-heading">

                                <div className="card-heading-icon">
                                    📚
                                </div>

                                <div>
                                    <h2>
                                        Course Details
                                    </h2>

                                    <p>
                                        Your selected
                                        course
                                    </p>
                                </div>

                            </div>


                            <div className="course-display">

                                <span>
                                    Selected Course
                                </span>

                                <h3>
                                    {student?.course ||
                                        "Not available"}
                                </h3>

                                <div
                                    className={`course-status ${getStatusClass()}`}
                                >
                                    {getStatusText()}
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        ADMIN REMARK
                    ================================================= */}

                    <div className="student-dashboard-card admin-remark-card">

                        <div className="card-heading">

                            <div className="card-heading-icon">
                                📝
                            </div>

                            <div>
                                <h2>
                                    Admin Remark
                                </h2>

                                <p>
                                    Message from
                                    administration
                                </p>
                            </div>

                        </div>


                        <div
                            className={`admin-remark-box ${getStatusClass()}`}
                        >

                            <span className="remark-status">
                                {getStatusText()}
                            </span>

                            <p>
                                {student?.adminRemark ||
                                    "No remark has been added by the administrator yet."}
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        STATUS INFORMATION
                    ================================================= */}

                    <div className="student-dashboard-card">

                        <div className="card-heading">

                            <div className="card-heading-icon">
                                ℹ️
                            </div>

                            <div>
                                <h2>
                                    Enrollment Information
                                </h2>

                                <p>
                                    Important information
                                    about your request
                                </p>
                            </div>

                        </div>


                        <div className="enrollment-info">

                            <div className="enrollment-step completed">
                                <div className="step-number">
                                    1
                                </div>

                                <div>
                                    <strong>
                                        Registration
                                    </strong>

                                    <p>
                                        Your student
                                        account has been
                                        created successfully.
                                    </p>
                                </div>
                            </div>


                            <div
                                className={`enrollment-step ${
                                    student?.enrollmentStatus !==
                                    "pending"
                                        ? "completed"
                                        : "active"
                                }`}
                            >
                                <div className="step-number">
                                    2
                                </div>

                                <div>
                                    <strong>
                                        Admin Review
                                    </strong>

                                    <p>
                                        Your enrollment
                                        request is reviewed
                                        by the administrator.
                                    </p>
                                </div>
                            </div>


                            <div
                                className={`enrollment-step ${
                                    student?.enrollmentStatus ===
                                    "approved"
                                        ? "completed"
                                        : ""
                                }`}
                            >
                                <div className="step-number">
                                    3
                                </div>

                                <div>
                                    <strong>
                                        Enrollment Decision
                                    </strong>

                                    <p>
                                        Final enrollment
                                        status is shown
                                        here after review.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        QUICK ACTIONS
                    ================================================= */}

                    <div className="student-quick-actions">

                        <Link
                            to="/"
                            className="student-action-button secondary"
                        >
                            ← Back to Home
                        </Link>

                        <button
                            type="button"
                            className="student-action-button primary"
                            onClick={() => {
                                const token =
                                    localStorage.getItem(
                                        "studentToken"
                                    );

                                if (token) {
                                    fetchStudentData(
                                        token
                                    );
                                }
                            }}
                        >
                            ↻ Refresh Status
                        </button>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default StudentDashboard;