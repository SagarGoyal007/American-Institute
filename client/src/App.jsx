import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import WhoWeAre from "./pages/WhoWeAre";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import StudentDashboard from "./pages/StudentDashboard";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= HOME ================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= ABOUT ================= */}

        <Route
          path="/about"
          element={<About />}
        />


        {/* ================= GALLERY ================= */}

        <Route
          path="/gallery"
          element={<Gallery />}
        />


        {/* ================= CONTACT ================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* ================= WHO WE ARE ================= */}

        <Route
          path="/who-we-are"
          element={<WhoWeAre />}
        />


        {/* ================= ADMIN LOGIN ================= */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />


        {/* ================= ADMIN DASHBOARD ================= */}

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />


        {/* ================= STUDENT LOGIN ================= */}

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />


        {/* ================= STUDENT REGISTER ================= */}

        <Route
          path="/student-register"
          element={<StudentRegister />}
        />

        {/* ================= STUDENT DASHBOARD ================= */}
        
        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;