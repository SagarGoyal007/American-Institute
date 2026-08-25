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
    const [students, setStudents] = useState([]);

    const [activePage, setActivePage] =
        useState("dashboard");

    const [loading, setLoading] =
        useState(true);

    const [studentLoading, setStudentLoading] =
        useState(false);

    const [sidebarOpen, setSidebarOpen] =
        useState(false);

    // =====================================================
    // STUDENT DETAILS MODAL
    // =====================================================

    const [selectedStudent, setSelectedStudent] =
        useState(null);

    // =====================================================
    // EDIT STUDENT
    // =====================================================

    const [editingStudent, setEditingStudent] =
        useState(null);

    const [editStudentForm, setEditStudentForm] =
        useState({
            name: "",
            email: "",
            phone: "",
            course: "",
            adminRemark: "",
        });

    const [editStudentLoading, setEditStudentLoading] =
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


            if (
                enrollmentResponse.status === 401
            ) {

                logout();

                return;

            }


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


            if (
                contactResponse.status === 401
            ) {

                logout();

                return;

            }


            const contactResult =
                await contactResponse.json();


            // ================= STUDENTS =================

            const studentResponse =
                await fetch(
                    "http://localhost:5000/api/admin/students",
                    {
                        headers,
                    }
                );


            if (
                studentResponse.status === 401
            ) {

                logout();

                return;

            }


            const studentResult =
                await studentResponse.json();


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


            if (studentResult.success) {

                setStudents(
                    studentResult.data
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
                    item =>
                        item._id !== id
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
                    item =>
                        item._id !== id
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
    // APPROVE STUDENT
    // =====================================================

    const approveStudent = async (id) => {

        const confirmApprove =
            window.confirm(
                "Are you sure you want to approve this student?"
            );


        if (!confirmApprove) {

            return;

        }


        try {

            setStudentLoading(true);


            const response =
                await fetch(
                    `http://localhost:5000/api/admin/students/${id}/approve`,
                    {
                        method: "PUT",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json",
                        },
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Could not approve student."
                );

            }


            setStudents(prev =>
                prev.map(student =>

                    student._id === id

                        ? {
                            ...student,

                            enrollmentStatus:
                                "approved",

                            adminRemark:
                                result.student?.adminRemark ||
                                "",
                        }

                        : student

                )
            );


            alert(
                "Student approved successfully."
            );


        } catch (error) {

            console.error(
                "Approve Student Error:",
                error
            );


            alert(
                error.message ||
                "Could not approve student."
            );


        } finally {

            setStudentLoading(false);

        }

    };


    // =====================================================
    // REJECT STUDENT
    // =====================================================

    const rejectStudent = async (id) => {

        const remark =
            window.prompt(
                "Enter reason for rejecting this student:"
            );


        if (remark === null) {

            return;

        }


        if (!remark.trim()) {

            alert(
                "Please enter a rejection reason."
            );

            return;

        }


        try {

            setStudentLoading(true);


            const response =
                await fetch(
                    `http://localhost:5000/api/admin/students/${id}/reject`,
                    {
                        method: "PUT",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,

                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify({

                            adminRemark:
                                remark.trim(),

                        }),
                    }
                );


            const result =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Could not reject student."
                );

            }


            setStudents(prev =>
                prev.map(student =>

                    student._id === id

                        ? {
                            ...student,

                            enrollmentStatus:
                                "rejected",

                            adminRemark:
                                remark.trim(),
                        }

                        : student

                )
            );


            alert(
                "Student rejected successfully."
            );


        } catch (error) {

            console.error(
                "Reject Student Error:",
                error
            );


            alert(
                error.message ||
                "Could not reject student."
            );


        } finally {

            setStudentLoading(false);

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


    // =====================================================
    // PENDING STUDENT COUNT
    // =====================================================

    const pendingStudents =
        students.filter(
            student =>
                student.enrollmentStatus ===
                "pending"
        ).length;


    // =====================================================
    // STUDENT DETAILS MODAL
    // =====================================================

    const openStudentDetails = (student) => {
        setSelectedStudent(student);
    };

    const closeStudentDetails = () => {
        setSelectedStudent(null);
        setEditingStudent(null);
    };

    const openEditStudent = (student) => {
        setEditingStudent(student);
        setEditStudentForm({
            name: student.name || "",
            email: student.email || "",
            phone: student.phone || "",
            course: student.course || "",
            adminRemark: student.adminRemark || "",
        });
    };

    const closeEditStudent = () => {
        if (editStudentLoading) return;
        setEditingStudent(null);
    };

    const handleEditStudentChange = (e) => {
        const { name, value } = e.target;
        setEditStudentForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveEditedStudent = async (e) => {
        e.preventDefault();

        if (!editingStudent) return;

        if (
            !editStudentForm.name.trim() ||
            !editStudentForm.email.trim() ||
            !editStudentForm.phone.trim() ||
            !editStudentForm.course.trim()
        ) {
            alert("Name, email, phone and course are required.");
            return;
        }

        try {
            setEditStudentLoading(true);

            const response = await fetch(
                `http://localhost:5000/api/admin/students/${editingStudent._id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: editStudentForm.name.trim(),
                        email: editStudentForm.email.trim().toLowerCase(),
                        phone: editStudentForm.phone.trim(),
                        course: editStudentForm.course.trim(),
                        adminRemark: editStudentForm.adminRemark.trim(),
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Could not update student."
                );
            }

            const updatedStudent = result.student || {
                ...editingStudent,
                ...editStudentForm,
            };

            setStudents(prev =>
                prev.map(student =>
                    student._id === editingStudent._id
                        ? { ...student, ...updatedStudent, _id: student._id }
                        : student
                )
            );

            setSelectedStudent(prev =>
                prev
                    ? { ...prev, ...updatedStudent, _id: prev._id }
                    : prev
            );

            setEditingStudent(null);
            alert("Student updated successfully.");
        } catch (error) {
            console.error("Edit Student Error:", error);
            alert(error.message || "Could not update student.");
        } finally {
            setEditStudentLoading(false);
        }
    };

    // =====================================================
    // RETURN
    // =====================================================

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


                    {/* ================= DASHBOARD ================= */}

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


                    {/* ================= ENROLLMENTS ================= */}

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
                            {
                                stats.totalEnrollments
                            }
                        </b>

                    </button>


                    {/* ================= STUDENT REQUESTS ================= */}

                    <button
                        className={
                            activePage === "students"
                                ? "active"
                                : ""
                        }

                        onClick={() =>
                            changePage(
                                "students"
                            )
                        }
                    >

                        <span>
                            👨‍🎓
                        </span>

                        Student Requests

                        {pendingStudents > 0 && (

                            <b>
                                {
                                    pendingStudents
                                }
                            </b>

                        )}

                    </button>


                    {/* ================= MESSAGES ================= */}

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
                            {
                                stats.totalContacts
                            }
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

                            {
                                activePage ===
                                    "dashboard"

                                    ? "Dashboard"

                                    : activePage ===
                                        "enrollments"

                                        ? "Enrollments"

                                        : activePage ===
                                            "students"

                                            ? "Student Requests"

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
                                            {
                                                stats.totalEnrollments
                                            }
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
                                            {
                                                stats.totalContacts
                                            }
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
                                            {
                                                stats.ielts
                                            }
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
                                            {
                                                stats.pte
                                            }
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
                                            {
                                                stats.ielts
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            PTE
                                        </span>

                                        <strong>
                                            {
                                                stats.pte
                                            }
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Spoken English
                                        </span>

                                        <strong>
                                            {
                                                stats.spokenEnglish
                                            }
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
                        STUDENT REQUESTS
                    ================================================= */}

                    {activePage === "students" && (

                        <div className="dashboard-table-card full-card">


                            <div className="table-header">

                                <div>

                                    <h2>
                                        Student Requests
                                    </h2>

                                    <p>
                                        Review and manage student registration requests
                                    </p>

                                </div>


                                <div className="student-request-count">

                                    {
                                        pendingStudents
                                    }

                                    {" "}Pending

                                </div>

                            </div>


                            {students.length === 0 ? (

                                <div className="empty-state">

                                    <span>
                                        👨‍🎓
                                    </span>

                                    <p>
                                        No student requests found.
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
                                                    Status
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

                                            {students.map(
                                                student => (

                                                    <tr
                                                        key={
                                                            student._id
                                                        }
                                                    >


                                                        {/* STUDENT */}

                                                        <td>

                                                            <strong>
                                                                {
                                                                    student.name
                                                                }
                                                            </strong>

                                                        </td>


                                                        {/* CONTACT */}

                                                        <td>

                                                            <small>
                                                                {
                                                                    student.phone
                                                                }
                                                            </small>

                                                            <small>
                                                                {
                                                                    student.email
                                                                }
                                                            </small>

                                                        </td>


                                                        {/* COURSE */}

                                                        <td>

                                                            <span className="course-badge">

                                                                {
                                                                    student.course
                                                                }

                                                            </span>

                                                        </td>


                                                        {/* STATUS */}

                                                        <td>

                                                            <span
                                                                className={
                                                                    `student-status ${
                                                                        student.enrollmentStatus
                                                                    }`
                                                                }
                                                            >

                                                                {
                                                                    student.enrollmentStatus
                                                                }

                                                            </span>


                                                            {student.adminRemark && (

                                                                <small className="admin-remark">

                                                                    {
                                                                        student.adminRemark
                                                                    }

                                                                </small>

                                                            )}

                                                        </td>


                                                        {/* DATE */}

                                                        <td>

                                                            {
                                                                formatDate(
                                                                    student.createdAt
                                                                )
                                                            }

                                                        </td>


                                                        {/* ACTION */}

                                                        <td>

                                                            <div className="student-actions">

                                                                <button
                                                                    type="button"
                                                                    className="student-details-btn"
                                                                    onClick={() =>
                                                                        openStudentDetails(student)
                                                                    }
                                                                >
                                                                    <span className="action-icon">◉</span>
                                                                    <span>View Details</span>
                                                                </button>

                                                            {student.enrollmentStatus ===
                                                                "pending" ? (

                                                                <div className="student-decision-actions">


                                                                    <button
                                                                        className="approve-btn"

                                                                        onClick={() =>
                                                                            approveStudent(
                                                                                student._id
                                                                            )
                                                                        }

                                                                        disabled={
                                                                            studentLoading
                                                                        }
                                                                    >

                                                                        <span className="action-icon">✓</span>
                                                                        <span>Approve</span>

                                                                    </button>


                                                                    <button
                                                                        className="reject-btn"

                                                                        onClick={() =>
                                                                            rejectStudent(
                                                                                student._id
                                                                            )
                                                                        }

                                                                        disabled={
                                                                            studentLoading
                                                                        }
                                                                    >

                                                                        <span className="action-icon">×</span>
                                                                        <span>Reject</span>

                                                                    </button>


                                                                </div>

                                                            ) : (

                                                                <span className="action-completed">

                                                                    {
                                                                        student.enrollmentStatus ===
                                                                            "approved"

                                                                            ? "✓ Approved"

                                                                            : "✕ Rejected"
                                                                    }

                                                                </span>

                                                            )}

                                                            </div>

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


                    {/* =================================================
                        EDIT STUDENT MODAL
                    ================================================= */}

                    {editingStudent && (

                        <div
                            className="student-edit-overlay"
                            onClick={closeEditStudent}
                        >
                            <div
                                className="student-edit-modal"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <div className="student-edit-header">
                                    <div>
                                        <span className="student-details-eyebrow">
                                            Student Management
                                        </span>
                                        <h2>Edit Student</h2>
                                        <p>
                                            Update the student's registration information
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="student-details-close"
                                        onClick={closeEditStudent}
                                        disabled={editStudentLoading}
                                        aria-label="Close edit student"
                                    >
                                        ×
                                    </button>
                                </div>

                                <form
                                    className="student-edit-form"
                                    onSubmit={saveEditedStudent}
                                >
                                    <div className="student-edit-grid">

                                        <div className="student-edit-field">
                                            <label htmlFor="edit-student-name">
                                                Full Name
                                            </label>
                                            <input
                                                id="edit-student-name"
                                                name="name"
                                                type="text"
                                                value={editStudentForm.name}
                                                onChange={handleEditStudentChange}
                                                placeholder="Enter full name"
                                                autoComplete="name"
                                                required
                                            />
                                        </div>

                                        <div className="student-edit-field">
                                            <label htmlFor="edit-student-email">
                                                Email Address
                                            </label>
                                            <input
                                                id="edit-student-email"
                                                name="email"
                                                type="email"
                                                value={editStudentForm.email}
                                                onChange={handleEditStudentChange}
                                                placeholder="Enter email address"
                                                autoComplete="email"
                                                required
                                            />
                                        </div>

                                        <div className="student-edit-field">
                                            <label htmlFor="edit-student-phone">
                                                Phone Number
                                            </label>
                                            <input
                                                id="edit-student-phone"
                                                name="phone"
                                                type="tel"
                                                value={editStudentForm.phone}
                                                onChange={handleEditStudentChange}
                                                placeholder="Enter phone number"
                                                autoComplete="tel"
                                                required
                                            />
                                        </div>

                                        <div className="student-edit-field">
                                            <label htmlFor="edit-student-course">
                                                Course
                                            </label>
                                            <select
                                                id="edit-student-course"
                                                name="course"
                                                value={editStudentForm.course}
                                                onChange={handleEditStudentChange}
                                                required
                                            >
                                                <option value="">Select course</option>
                                                <option value="IELTS">IELTS</option>
                                                <option value="PTE">PTE</option>
                                                <option value="Spoken English">Spoken English</option>
                                            </select>
                                        </div>

                                    </div>

                                    <div className="student-edit-field student-edit-remark-field">
                                        <label htmlFor="edit-student-remark">
                                            Admin Remark
                                        </label>
                                        <textarea
                                            id="edit-student-remark"
                                            name="adminRemark"
                                            value={editStudentForm.adminRemark}
                                            onChange={handleEditStudentChange}
                                            placeholder="Add an admin remark (optional)"
                                            rows="4"
                                        />
                                    </div>

                                    <div className="student-edit-footer">
                                        <button
                                            type="button"
                                            className="student-edit-cancel"
                                            onClick={closeEditStudent}
                                            disabled={editStudentLoading}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="student-edit-save"
                                            disabled={editStudentLoading}
                                        >
                                            {editStudentLoading ? (
                                                <>
                                                    <span className="student-edit-spinner"></span>
                                                    Saving...
                                                </>
                                            ) : (
                                                <>✓ Save Changes</>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* =================================================
                        STUDENT DETAILS MODAL
                    ================================================= */}

                    {selectedStudent && (

                        <div
                            className="student-details-overlay"
                            onClick={closeStudentDetails}
                        >

                            <div
                                className="student-details-modal"
                                onClick={(event) => event.stopPropagation()}
                            >

                                <div className="student-details-header">

                                    <div>
                                        <span className="student-details-eyebrow">
                                            Student Profile
                                        </span>

                                        <h2>
                                            Student Details
                                        </h2>

                                        <p>
                                            Complete registration information
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="student-details-close"
                                        onClick={closeStudentDetails}
                                        aria-label="Close student details"
                                    >
                                        ×
                                    </button>

                                </div>

                                <div className="student-details-profile">

                                    <div className="student-details-avatar">
                                        {
                                            selectedStudent.name
                                                ?.charAt(0)
                                                ?.toUpperCase() || "S"
                                        }
                                    </div>

                                    <div>
                                        <h3>
                                            {selectedStudent.name || "-"}
                                        </h3>

                                        <span>
                                            {selectedStudent.email || "-"}
                                        </span>
                                    </div>

                                </div>

                                <div className="student-details-grid">

                                    <div className="student-detail-item">
                                        <small>Full Name</small>
                                        <strong>
                                            {selectedStudent.name || "-"}
                                        </strong>
                                    </div>

                                    <div className="student-detail-item">
                                        <small>Email Address</small>
                                        <strong>
                                            {selectedStudent.email || "-"}
                                        </strong>
                                    </div>

                                    <div className="student-detail-item">
                                        <small>Phone Number</small>
                                        <strong>
                                            {selectedStudent.phone || "-"}
                                        </strong>
                                    </div>

                                    <div className="student-detail-item">
                                        <small>Course</small>
                                        <strong>
                                            {selectedStudent.course || "-"}
                                        </strong>
                                    </div>

                                    <div className="student-detail-item">
                                        <small>Registration Date</small>
                                        <strong>
                                            {formatDate(selectedStudent.createdAt)}
                                        </strong>
                                    </div>

                                    <div className="student-detail-item">
                                        <small>Role</small>
                                        <strong>
                                            {selectedStudent.role || "student"}
                                        </strong>
                                    </div>

                                </div>

                                <div className="student-detail-status-box">
                                    <small>
                                        Enrollment Status
                                    </small>

                                    <span
                                        className={
                                            `student-status ${
                                                selectedStudent.enrollmentStatus ||
                                                "pending"
                                            }`
                                        }
                                    >
                                        {
                                            selectedStudent.enrollmentStatus ||
                                            "pending"
                                        }
                                    </span>
                                </div>

                                <div className="student-detail-remark">
                                    <small>
                                        Admin Remark
                                    </small>

                                    <p>
                                        {
                                            selectedStudent.adminRemark ||
                                            "No admin remark added."
                                        }
                                    </p>
                                </div>

                                <div className="student-details-footer">

                                    <button
                                        type="button"
                                        className="student-edit-btn"
                                        onClick={() => openEditStudent(selectedStudent)}
                                    >
                                        ✎ Edit Student
                                    </button>

                                    <button
                                        type="button"
                                        onClick={closeStudentDetails}
                                    >
                                        Close
                                    </button>

                                </div>

                            </div>

                        </div>

                    )}

            </main>

        </div>

    );

}


export default AdminDashboard;