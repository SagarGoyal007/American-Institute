import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CourseSection from "../components/CourseSection";
import StudentSection from "../components/StudentSection";
import Footer from "../components/Footer";

import { Link } from "react-router-dom";

import "./Home.css";


function Home() {

  /* ================= SCROLL TO COURSES ================= */

  useEffect(() => {

    if (window.location.hash === "#our-courses") {

      setTimeout(() => {

        const coursesSection =
          document.getElementById("our-courses");

        if (coursesSection) {

          coursesSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

        }

      }, 300);

    }

  }, []);


  return (
    <>

      {/* ================= NAVBAR ================= */}

      <Navbar />


      {/* ================= HERO ================= */}

      <Hero />


      {/* =================================================
          ABOUT AMERICAN INSTITUTE
      ================================================= */}

      <section className="home-about">

        <div className="home-about-container">

          {/* ================= IMAGE ================= */}

          <div className="home-about-image">

            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
              alt="American Institute Students"
            />

            <div className="experience-badge">

              <strong>
                34+
              </strong>

              <span>
                Years of Excellence
              </span>

            </div>

          </div>


          {/* ================= CONTENT ================= */}

          <div className="home-about-content">

            <span className="home-about-tag">
              SINCE 1991
            </span>

            <h2>
              About American Institute
            </h2>

            <h3>
              Building Confidence. Creating Opportunities.
            </h3>

            <p>
              American Institute is one of India's leading institutes
              for IELTS, PTE, Spoken English, Foreign Languages and
              Study Abroad Guidance.
            </p>

            <p>
              Since 1991, we have been committed to providing quality
              education, practical learning and career-oriented
              training. Our experienced faculty and student-focused
              approach help learners build confidence and achieve
              their academic and professional goals.
            </p>


            {/* ================= HIGHLIGHTS ================= */}

            <div className="home-about-highlights">

              <div className="home-highlight">

                <span className="highlight-icon">
                  🏆
                </span>

                <div>
                  <strong>34+ Years</strong>
                  <small>Of Excellence</small>
                </div>

              </div>


              <div className="home-highlight">

                <span className="highlight-icon">
                  👨‍🎓
                </span>

                <div>
                  <strong>50K+ Students</strong>
                  <small>Successfully Trained</small>
                </div>

              </div>


              <div className="home-highlight">

                <span className="highlight-icon">
                  👨‍🏫
                </span>

                <div>
                  <strong>Expert Faculty</strong>
                  <small>Experienced Trainers</small>
                </div>

              </div>


              <div className="home-highlight">

                <span className="highlight-icon">
                  🌎
                </span>

                <div>
                  <strong>Study Abroad</strong>
                  <small>Career Guidance</small>
                </div>

              </div>

            </div>


            {/* ================= BUTTON ================= */}

            <Link
              to="/about"
              className="home-about-btn"
            >
              Know More About Us
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* ================= COURSES ================= */}

      <CourseSection />


      {/* ================= STUDENTS ================= */}

      <StudentSection />


      {/* ================= FOOTER ================= */}

      <Footer />

    </>
  );
}

export default Home;