import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import WhoWeAre from "./pages/WhoWeAre";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";


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

      </Routes>

    </BrowserRouter>

  );

}


export default App;