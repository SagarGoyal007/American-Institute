import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./About.css";

import headSir from "../assets/images/head-sir.jpeg";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">

        {/* ================= HEADER ================= */}

        <div className="about-header">

          <h1>
            About American Institute
          </h1>

          <p>
            34+ Years of Excellence Since 1991
          </p>

        </div>


        {/* ================= ABOUT ================= */}

        <div className="about-content">

          {/* IMAGE */}

          <div className="about-image">

            <img
              src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"
              alt="American Institute"
            />

          </div>


          {/* TEXT */}

          <div className="about-text">

            <span className="about-tag">
              Since 1991
            </span>

            <h2>
              Who We Are
            </h2>

            <p>
              American Institute is one of India's leading coaching
              institutes for IELTS, PTE, Spoken English,
              Foreign Languages and Study Abroad Guidance.
            </p>

            <p>
              Since 1991, we have been committed to providing quality
              education, practical learning and career-oriented
              training. Our experienced faculty, modern classrooms and
              student-focused approach have helped thousands of
              students achieve success in India and abroad.
            </p>


            {/* EXPLORE COURSES */}

            <Link
              to="/#our-courses"
              className="explore-btn"
            >
              Explore Our Courses
            </Link>

          </div>

        </div>


        {/* =====================================================
            HEAD OF INSTITUTE
        ===================================================== */}

        <section className="head-section">

          <div className="head-card">

            {/* ================= IMAGE ================= */}

            <div className="head-image-wrapper">

              <div className="head-image-circle">

                <img
                  src={headSir}
                  alt="Head of American Institute"
                  className="head-image"
                />

              </div>

              <div className="head-experience">
                10+ Years
              </div>

            </div>


            {/* ================= DETAILS ================= */}

            <div className="head-details">

              <span className="head-tag">
                OUR LEADERSHIP
              </span>

              <h2>
                Head of American Institute
              </h2>

              <h3>
                 Mr. Lalit Dhakrey
              </h3>

              <p className="head-designation">
                Director & Head, American Institute, Hathras, Uttar Pradesh, India
              </p>

              <p>
                With a strong commitment to quality education and
                student success, our institute leadership has been
                dedicated to creating an effective and supportive
                learning environment for students.
              </p>

              <p>
                The vision is to provide students with practical
                learning, expert guidance and the confidence required
                to achieve their academic and career goals.
              </p>


              {/* ================= HIGHLIGHTS ================= */}

              <div className="head-highlights">

                <div className="head-highlight">
                  <strong>10+</strong>
                  <span>Years of Experience</span>
                </div>

                <div className="head-highlight">
                  <strong>1k+</strong>
                  <span>Students Guided</span>
                </div>

                <div className="head-highlight">
                  <strong>Since 1991</strong>
                  <span>Journey of Excellence</span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= WHY CHOOSE ================= */}

        <div className="why">

          <h2>
            Why Choose American Institute?
          </h2>

          <div className="why-grid">

            <div>
              ✔ 34+ Years of Excellence
            </div>

            <div>
              ✔ Highly Experienced Faculty
            </div>

            <div>
              ✔ Modern Smart Classrooms
            </div>

            <div>
              ✔ Weekly Mock Tests
            </div>

            <div>
              ✔ Study Abroad Guidance
            </div>

            <div>
              ✔ Small Batch Size
            </div>

            <div>
              ✔ Practical Learning
            </div>

            <div>
              ✔ 100% Student Support
            </div>

          </div>

        </div>


        {/* ================= STATS ================= */}

        <div className="stats">

          <div className="stat-box">

            <h2>
              34+
            </h2>

            <p>
              Years of Excellence
            </p>

          </div>


          <div className="stat-box">

            <h2>
              50K+
            </h2>

            <p>
              Students Trained
            </p>

          </div>


          <div className="stat-box">

            <h2>
              9+
            </h2>

            <p>
              Branches
            </p>

          </div>


          <div className="stat-box">

            <h2>
              95%
            </h2>

            <p>
              Student Satisfaction
            </p>

          </div>

        </div>


        {/* ================= BRANCHES ================= */}

        <div className="branches">

          <h2>
            Our Branches
          </h2>

          <div className="branch-grid">

            <div>
              📍 Agra (Head Office)
            </div>

            <div>
              📍 Delhi
            </div>

            <div>
              📍 Noida
            </div>

            <div>
              📍 Jaipur
            </div>

            <div>
              📍 Lucknow
            </div>

            <div>
              📍 Chandigarh
            </div>

            <div>
              📍 Ludhiana
            </div>

            <div>
              📍 Indore
            </div>

            <div>
              📍 Dehradun
            </div>

          </div>

        </div>


        {/* ================= MISSION & VISION ================= */}

        <div className="mission">

          <div>

            <h2>
              Our Mission
            </h2>

            <p>
              To provide quality education, skill development and
              career guidance that empowers students to achieve
              success in academics and professional life.
            </p>

          </div>


          <div>

            <h2>
              Our Vision
            </h2>

            <p>
              To become India's most trusted institute for language
              training, overseas education and career development by
              delivering world-class learning experiences.
            </p>

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default About;