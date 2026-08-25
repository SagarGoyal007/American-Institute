const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const contactRoutes =
  require("./routes/contactRoutes");

const enrollmentRoutes =
  require("./routes/enrollmentRoutes");

const adminRoutes =
  require("./routes/adminRoutes");

const studentRoutes =
  require("./routes/studentRoutes");

const app = express();


// =====================================================
// DATABASE
// =====================================================

connectDB();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

  res.json({
    message:
      "American Institute Backend is Running 🚀"
  });

});


// =====================================================
// CONTACT ROUTE
// =====================================================

app.use(
  "/api/contact",
  contactRoutes
);


// =====================================================
// ENROLLMENT ROUTE
// =====================================================

app.use(
  "/api/enrollment",
  enrollmentRoutes
);


// =====================================================
// ADMIN ROUTE
// =====================================================

app.use(
  "/api/admin",
  adminRoutes
);


// =====================================================
// STUDENT ROUTE
// =====================================================

app.use(
  "/api/student",
  studentRoutes
);


// =====================================================
// SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});