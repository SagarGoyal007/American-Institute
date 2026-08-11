import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";


function AdminDashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalContacts: 0,
        totalEnrollments: 0,
        ielts: 0,
        pte: 0,
        spokenEnglish: 0,
    });

    const [enrollments, setEnrollments] = useState([]);
    const [contacts, setContacts] = useState([]);

    const [activePage, setActivePage] =
        useState("dashboard");

    const [loading, setLoading] =
        useState(true);

    const [sidebarOpen, setSidebarOpen] =
        useState(false);


    // =====================================================
    // TOKEN
    // =====================================================

    const token =
        localStorage.getItem("adminToken");


    // =====================================================
    // AUTH CHECK
    // =====================================================

    useEffect(() => {

        if (!token) {

            navigate("/admin");

            return;

        }

        loadDashboard();

    }, []);


    // =====================================================
    // LOAD DASHBOARD
    // =====================================================

    const loadDashboard = async () => {

        try {

            setLoading(true);


            const headers = {

                Authorization:
                    `Bearer ${token}`,

            };


            // ================= STATS =================

            const statsResponse =
                await fetch(
                    "http://localhost:5000/api/admin/stats",
                    {
                        headers,
                    }
                );


            if (
                statsResponse.status === 401
            ) {

                logout();

                return;

            }


            const statsResult =
                await statsResponse.json();


            // ================= ENROLLMENTS =================

            const enrollmentResponse =
                await fetch(
                    "http://localhost:5000/api/admin/enrollments",
                    {
                        headers,
                    }
                );


            const enrollmentResult =
                await enrollmentResponse.json();


            // ================= CONTACTS =================

            const contactResponse =
                await fetch(
                    "http://localhost:5000/api/admin/contacts",
                    {
                        headers,
                    }
                );


            const contactResult =
                await contactResponse.json();


            // ================= SET DATA =================

            if (statsResult.success) {

                setStats(
                    statsResult.stats
                );

            }


            if (enrollmentResult.success) {

                setEnrollments(
                    enrollmentResult.data
                );

            }


            if (contactResult.success) {

                setContacts(
                    contactResult.data
                );

            }


        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const logout = () => {

        localStorage.removeItem(
            "adminToken"
        );

        navigate("/admin");

    };


    // =====================================================
    // DELETE ENROLLMENT
    // =====================================================

    const deleteEnrollment = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this enrollment?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/admin/enrollments/${id}`,
                    {
                        method: "DELETE",

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
                    "Delete failed"
                );

            }


            setEnrollments(
                enrollments.filter(
                    item => item._id !== id
                )
            );


            setStats(prev => ({

                ...prev,

                totalEnrollments:
                    Math.max(
                        0,
                        prev.totalEnrollments - 1
                    ),

            }));


        } catch (error) {

            alert(
                error.message ||
                "Could not delete enrollment."
            );

        }

    };


    // =====================================================
    // DELETE CONTACT
    // =====================================================

    const deleteContact = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this message?"
            );


        if (!confirmDelete) {

            return;

        }


        try {

            const response =
                await fetch(
                    `http://localhost:5000/api/admin/contacts/${id}`,
                    {
                        method: "DELETE",

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
                    "Delete failed"
                );

            }


            setContacts(
                contacts.filter(
                    item => item._id !== id
                )
            );


            setStats(prev => ({

                ...prev,

                totalContacts:
                    Math.max(
                        0,
                        prev.totalContacts - 1
                    ),

            }));


        } catch (error) {

            alert(
                error.message ||
                "Could not delete message."
            );

        }

    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {

            return "-";

        }


        return new Date(date)
            .toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                }
            );

    };


    // =====================================================
    // SIDEBAR PAGE
    // =====================================================

    const changePage = (page) => {

        setActivePage(page);

        setSidebarOpen(false);

    };


    return (

        <div className="admin-dashboard">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside
                className={
                    `admin-sidebar ${
                        sidebarOpen
                            ? "sidebar-open"
                            : ""
                    }`
                }
            >


                {/* ================= LOGO ================= */}

                <div className="dashboard-logo">

                    <div className="dashboard-logo-icon">
                        AI
                    </div>

                    <div>

                        <h2>
                            American
                        </h2>

                        <span>
                            Institute
                        </span>

                    </div>

                </div>


                {/* ================= MENU ================= */}

                <nav className="dashboard-menu">


                    <button
                        className={
                            activePage === "dashboard"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            changePage(
                                "dashboard"
                            )
                        }
                    >

                        <span>
                            📊
                        </span>

                        Dashboard

                    </button>


                    <button
                        className={
                            activePage === "enrollments"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            changePage(
                                "enrollments"
                            )
                        }
                    >

                        <span>
                            🎓
                        </span>

                        Enrollments

                        <b>
                            {stats.totalEnrollments}
                        </b>

                    </button>


                    <button
                        className={
                            activePage === "contacts"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            changePage(
                                "contacts"
                            )
                        }
                    >

                        <span>
                            📩
                        </span>

                        Messages

                        <b>
                            {stats.totalContacts}
                        </b>

                    </button>


                </nav>


                {/* ================= SIDEBAR BOTTOM ================= */}

                <div className="sidebar-bottom">

                    <button
                        onClick={logout}
                    >

                        <span>
                            🚪
                        </span>

                        Logout

                    </button>

                </div>

            </aside>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="admin-main">


                {/* =================================================
                    TOPBAR
                ================================================= */}

                <header className="admin-topbar">


                    <button
                        className="mobile-menu"
                        onClick={() =>
                            setSidebarOpen(
                                !sidebarOpen
                            )
                        }
                    >
                        ☰
                    </button>


                    <div>

                        <h1>

                            {activePage === "dashboard"
                                ? "Dashboard"
                                : activePage === "enrollments"
                                    ? "Enrollments"
                                    : "Contact Messages"
                            }

                        </h1>

                        <p>
                            Welcome back, Admin 👋
                        </p>

                    </div>


                    <div className="admin-profile">

                        <div className="profile-avatar">
                            A
                        </div>

                        <div>

                            <strong>
                                Administrator
                            </strong>

                            <span>
                                Admin
                            </span>

                        </div>

                    </div>

                </header>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="dashboard-content">


                    {/* =================================================
                        DASHBOARD
                    ================================================= */}

                    {activePage === "dashboard" && (

                        <>


                            {/* ================= STATS ================= */}

                            <div className="stats-grid">


                                <div className="dashboard-stat blue">

                                    <div>

                                        <span>
                                            Total Enrollments
                                        </span>

                                        <strong>
                                            {stats.totalEnrollments}
                                        </strong>

                                    </div>

                                    <div className="stat-icon">
                                        🎓
                                    </div>

                                </div>


                                <div className="dashboard-stat yellow">

                                    <div>

                                        <span>
                                            Contact Messages
                                        </span>

                                        <strong>
                                            {stats.totalContacts}
                                        </strong>

                                    </div>

                                    <div className="stat-icon">
                                        📩
                                    </div>

                                </div>


                                <div className="dashboard-stat green">

                                    <div>

                                        <span>
                                            IELTS Students
                                        </span>

                                        <strong>
                                            {stats.ielts}
                                        </strong>

                                    </div>

                                    <div className="stat-icon">
                                        📚
                                    </div>

                                </div>


                                <div className="dashboard-stat purple">

                                    <div>

                                        <span>
                                            PTE Students
                                        </span>

                                        <strong>
                                            {stats.pte}
                                        </strong>

                                    </div>

                                    <div className="stat-icon">
                                        💻
                                    </div>

                                </div>


                            </div>


                            {/* ================= COURSE STATS ================= */}

                            <div className="course-summary">

                                <div className="summary-header">

                                    <div>

                                        <h2>
                                            Course Overview
                                        </h2>

                                        <p>
                                            Enrollment distribution
                                        </p>

                                    </div>

                                </div>


                                <div className="course-summary-grid">


                                    <div>

                                        <span>
                                            IELTS
                                        </span>

                                        <strong>
                                            {stats.ielts}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            PTE
                                        </span>

                                        <strong>
                                            {stats.pte}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Spoken English
                                        </span>

                                        <strong>
                                            {stats.spokenEnglish}
                                        </strong>

                                    </div>


                                </div>

                            </div>


                            {/* ================= RECENT ENROLLMENTS ================= */}

                            <div className="dashboard-table-card">

                                <div className="table-header">

                                    <div>

                                        <h2>
                                            Recent Enrollments
                                        </h2>

                                        <p>
                                            Latest course registrations
                                        </p>

                                    </div>


                                    <button
                                        onClick={() =>
                                            changePage(
                                                "enrollments"
                                            )
                                        }
                                    >
                                        View All →
                                    </button>

                                </div>


                                {loading ? (

                                    <div className="dashboard-loading">
                                        Loading...
                                    </div>

                                ) : enrollments.length === 0 ? (

                                    <div className="empty-state">

                                        <span>
                                            🎓
                                        </span>

                                        <p>
                                            No enrollments yet.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="table-wrapper">

                                        <table>

                                            <thead>

                                                <tr>

                                                    <th>
                                                        Student
                                                    </th>

                                                    <th>
                                                        Course
                                                    </th>

                                                    <th>
                                                        Branch
                                                    </th>

                                                    <th>
                                                        Date
                                                    </th>

                                                </tr>

                                            </thead>


                                            <tbody>

                                                {enrollments
                                                    .slice(0, 5)
                                                    .map(
                                                        item => (

                                                            <tr
                                                                key={
                                                                    item._id
                                                                }
                                                            >

                                                                <td>

                                                                    <strong>
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </strong>

                                                                    <small>
                                                                        {
                                                                            item.phone
                                                                        }
                                                                    </small>

                                                                </td>

                                                                <td>

                                                                    <span className="course-badge">
                                                                        {
                                                                            item.course
                                                                        }
                                                                    </span>

                                                                </td>

                                                                <td>
                                                                    {
                                                                        item.branch
                                                                    }
                                                                </td>

                                                                <td>
                                                                    {
                                                                        formatDate(
                                                                            item.createdAt
                                                                        )
                                                                    }
                                                                </td>

                                                            </tr>

                                                        )
                                                    )}

                                            </tbody>

                                        </table>

                                    </div>

                                )}

                            </div>

                        </>

                    )}


                    {/* =================================================
                        ENROLLMENTS
                    ================================================= */}

                    {activePage === "enrollments" && (

                        <div className="dashboard-table-card full-card">

                            <div className="table-header">

                                <div>

                                    <h2>
                                        All Enrollments
                                    </h2>

                                    <p>
                                        Manage course enrollment requests
                                    </p>

                                </div>

                            </div>


                            {enrollments.length === 0 ? (

                                <div className="empty-state">

                                    <span>
                                        🎓
                                    </span>

                                    <p>
                                        No enrollments found.
                                    </p>

                                </div>

                            ) : (

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>

                                                <th>
                                                    Student
                                                </th>

                                                <th>
                                                    Contact
                                                </th>

                                                <th>
                                                    Course
                                                </th>

                                                <th>
                                                    Batch
                                                </th>

                                                <th>
                                                    Branch
                                                </th>

                                                <th>
                                                    Date
                                                </th>

                                                <th>
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {enrollments.map(
                                                item => (

                                                    <tr
                                                        key={
                                                            item._id
                                                        }
                                                    >

                                                        <td>

                                                            <strong>
                                                                {
                                                                    item.name
                                                                }
                                                            </strong>

                                                        </td>


                                                        <td>

                                                            <small>
                                                                {
                                                                    item.phone
                                                                }
                                                            </small>

                                                            <small>
                                                                {
                                                                    item.email
                                                                }
                                                            </small>

                                                        </td>


                                                        <td>

                                                            <span className="course-badge">
                                                                {
                                                                    item.course
                                                                }
                                                            </span>

                                                        </td>


                                                        <td>
                                                            {
                                                                item.batch
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                item.branch
                                                            }
                                                        </td>


                                                        <td>
                                                            {
                                                                formatDate(
                                                                    item.createdAt
                                                                )
                                                            }
                                                        </td>


                                                        <td>

                                                            <button
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    deleteEnrollment(
                                                                        item._id
                                                                    )
                                                                }
                                                            >
                                                                🗑️
                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    )}


                    {/* =================================================
                        CONTACTS
                    ================================================= */}

                    {activePage === "contacts" && (

                        <div className="dashboard-table-card full-card">

                            <div className="table-header">

                                <div>

                                    <h2>
                                        Contact Messages
                                    </h2>

                                    <p>
                                        Messages received from website visitors
                                    </p>

                                </div>

                            </div>


                            {contacts.length === 0 ? (

                                <div className="empty-state">

                                    <span>
                                        📩
                                    </span>

                                    <p>
                                        No messages found.
                                    </p>

                                </div>

                            ) : (

                                <div className="table-wrapper">

                                    <table>

                                        <thead>

                                            <tr>

                                                <th>
                                                    Name
                                                </th>

                                                <th>
                                                    Contact
                                                </th>

                                                <th>
                                                    Message
                                                </th>

                                                <th>
                                                    Date
                                                </th>

                                                <th>
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>


                                        <tbody>

                                            {contacts.map(
                                                item => (

                                                    <tr
                                                        key={
                                                            item._id
                                                        }
                                                    >

                                                        <td>

                                                            <strong>
                                                                {
                                                                    item.name
                                                                }
                                                            </strong>

                                                        </td>


                                                        <td>

                                                            <small>
                                                                {
                                                                    item.phone
                                                                }
                                                            </small>

                                                            <small>
                                                                {
                                                                    item.email
                                                                }
                                                            </small>

                                                        </td>


                                                        <td className="message-cell">

                                                            {
                                                                item.message
                                                            }

                                                        </td>


                                                        <td>
                                                            {
                                                                formatDate(
                                                                    item.createdAt
                                                                )
                                                            }
                                                        </td>


                                                        <td>

                                                            <button
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    deleteContact(
                                                                        item._id
                                                                    )
                                                                }
                                                            >
                                                                🗑️
                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    )}

                </div>

            </main>

        </div>

    );

}


export default AdminDashboard;