import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./CourseSection.css";

import ielts from "../assets/images/ielts.png";
import pte from "../assets/images/pte.png";
import spoken from "../assets/images/spoken.png";


function CourseSection() {

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [enrollmentCourse, setEnrollmentCourse] = useState(null);

  const [submitted, setSubmitted] = useState(false);

  const [submitting, setSubmitting] = useState(false);


  /* =====================================================
     COURSES
  ===================================================== */

  const courses = [

    {
      id: 1,

      name: "IELTS",

      image: ielts,

      duration: "3 Months",

      fees: "₹15,000",

      rating: "4.9",

      badge: "🏆 Most Popular",

      description:
        "Complete IELTS preparation covering Reading, Writing, Listening and Speaking with weekly mock tests and expert guidance.",
    },


    {
      id: 2,

      name: "PTE",

      image: pte,

      duration: "2 Months",

      fees: "₹12,000",

      rating: "4.8",

      badge: "⭐ Best Choice",

      description:
        "Master all PTE modules with AI-based practice, pronunciation improvement, mock exams and score boosting techniques.",
    },


    {
      id: 3,

      name: "Spoken English",

      image: spoken,

      duration: "3 Months",

      fees: "₹8,000",

      rating: "4.9",

      badge: "🔥 Trending",

      description:
        "Improve communication skills, grammar, vocabulary, interview preparation and personality development.",
    },

  ];


  /* =====================================================
     OPEN ENROLLMENT
  ===================================================== */

  const openEnrollment = (course) => {

    setSelectedCourse(null);

    setEnrollmentCourse(course);

    setSubmitted(false);

    setSubmitting(false);

  };


  /* =====================================================
     CLOSE ENROLLMENT
  ===================================================== */

  const closeEnrollment = () => {

    setEnrollmentCourse(null);

    setSubmitted(false);

    setSubmitting(false);

  };


  /* =====================================================
     FORM SUBMIT
  ===================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (submitting) {
      return;
    }

    setSubmitting(true);


    /* ================= GET FORM DATA ================= */

    const form = e.target;

    const formData = new FormData(form);


    const data = {

      name: formData.get("name"),

      phone: formData.get("phone"),

      email: formData.get("email"),

      course: enrollmentCourse.name,

      batch: formData.get("batch"),

      branch: formData.get("branch"),

      message: formData.get("message") || "",

    };


    try {

      /* ================= SEND TO BACKEND ================= */

      const response = await fetch(
        "http://localhost:5000/api/enrollment",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );


      const result = await response.json();


      /* ================= CHECK RESPONSE ================= */

      if (!response.ok) {

        throw new Error(
          result.message || "Enrollment failed"
        );

      }


      /* ================= SUCCESS ================= */

      setSubmitting(false);

      setSubmitted(true);


    } catch (error) {

      console.error(
        "Enrollment Error:",
        error
      );

      setSubmitting(false);

      alert(
        error.message ||
        "Enrollment could not be submitted. Please try again."
      );

    }

  };


  return (

    <section
      className="course-section"
      id="our-courses"
    >


      {/* =================================================
          TITLE
      ================================================= */}

      <h2>
        Our Courses
      </h2>


      {/* =================================================
          COURSE SLIDER
      ================================================= */}

      <Swiper
        modules={[Autoplay, Pagination]}

        className="course-slider"

        spaceBetween={25}

        slidesPerView={1}

        loop={true}

        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}

        pagination={{
          clickable: true,
        }}

        breakpoints={{

          /* Mobile */

          0: {
            slidesPerView: 1,
            spaceBetween: 18,
          },


          /* Tablet */

          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },


          /* Desktop */

          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

        }}

      >


        {courses.map((course) => (

          <SwiperSlide key={course.id}>

            <div className="course-card">


              {/* ================= BADGE ================= */}

              <span className="badge">
                {course.badge}
              </span>


              {/* ================= IMAGE ================= */}

              <img
                src={course.image}
                alt={course.name}
                className="course-image"
              />


              {/* ================= CONTENT ================= */}

              <div className="course-content">

                <h3>
                  {course.name}
                </h3>


                <div className="rating">

                  ⭐⭐⭐⭐⭐{" "}

                  <span>
                    {course.rating}
                  </span>

                </div>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedCourse(course)
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>


      {/* =================================================
          COURSE DETAILS MODAL
      ================================================= */}

      {selectedCourse && (

        <div
          className="modal"
          onClick={() =>
            setSelectedCourse(null)
          }
        >

          <div
            className="modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* ================= CLOSE ================= */}

            <button
              type="button"
              className="close"
              onClick={() =>
                setSelectedCourse(null)
              }
              aria-label="Close"
            >
              ✕
            </button>


            {/* ================= IMAGE ================= */}

            <img
              src={selectedCourse.image}
              alt={selectedCourse.name}
              className="modal-image"
            />


            {/* ================= BODY ================= */}

            <div className="modal-body">

              <span className="modal-badge">
                {selectedCourse.badge}
              </span>


              <h2>
                {selectedCourse.name}
              </h2>


              <div className="modal-rating">

                ⭐⭐⭐⭐⭐{" "}

                {selectedCourse.rating}

              </div>


              <p>
                {selectedCourse.description}
              </p>


              {/* ================= COURSE INFO ================= */}

              <div className="modal-info">

                <div className="info-box">

                  <h4>
                    ⏳ Duration
                  </h4>

                  <p>
                    {selectedCourse.duration}
                  </p>

                </div>


                <div className="info-box">

                  <h4>
                    💰 Fees
                  </h4>

                  <p>
                    {selectedCourse.fees}
                  </p>

                </div>

              </div>


              {/* ================= FEATURES ================= */}

              <ul>

                <li>
                  ✔ Expert Faculty
                </li>

                <li>
                  ✔ Weekly Mock Tests
                </li>

                <li>
                  ✔ Live Speaking Practice
                </li>

                <li>
                  ✔ Study Material Included
                </li>

                <li>
                  ✔ Personal Doubt Sessions
                </li>

                <li>
                  ✔ Certificate on Completion
                </li>

                <li>
                  ✔ Career Guidance
                </li>

              </ul>


              {/* ================= ENROLL ================= */}

              <button
                type="button"
                className="enroll-btn"
                onClick={() =>
                  openEnrollment(selectedCourse)
                }
              >
                Enroll Now
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          ENROLLMENT FORM MODAL
      ================================================= */}

      {enrollmentCourse && (

        <div
          className="enrollment-modal"
          onClick={closeEnrollment}
        >

          <div
            className="enrollment-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* ================= CLOSE ================= */}

            <button
              type="button"
              className="enrollment-close"
              onClick={closeEnrollment}
              aria-label="Close"
            >
              ✕
            </button>


            {!submitted ? (

              <>


                {/* ================= HEADER ================= */}

                <div className="enrollment-header">

                  <span className="enrollment-icon">
                    🎓
                  </span>

                  <h2>
                    Enroll for {enrollmentCourse.name}
                  </h2>

                  <p>
                    Fill in your details and our counsellor
                    will contact you shortly.
                  </p>

                </div>


                {/* ================= SELECTED COURSE ================= */}

                <div className="selected-course">

                  <img
                    src={enrollmentCourse.image}
                    alt={enrollmentCourse.name}
                  />

                  <div>

                    <h3>
                      {enrollmentCourse.name}
                    </h3>

                    <p>
                      {enrollmentCourse.duration}
                      &nbsp; • &nbsp;
                      {enrollmentCourse.fees}
                    </p>

                  </div>

                </div>


                {/* ================= FORM ================= */}

                <form
                  className="enrollment-form"
                  onSubmit={handleSubmit}
                >


                  {/* ================= NAME ================= */}

                  <div className="form-group">

                    <label>
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      required
                    />

                  </div>


                  {/* ================= PHONE ================= */}

                  <div className="form-group">

                    <label>
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your mobile number"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                    />

                  </div>


                  {/* ================= EMAIL ================= */}

                  <div className="form-group">

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                    />

                  </div>


                  {/* ================= COURSE ================= */}

                  <div className="form-group">

                    <label>
                      Selected Course
                    </label>

                    <input
                      type="text"
                      value={enrollmentCourse.name}
                      readOnly
                    />

                  </div>


                  {/* ================= BATCH ================= */}

                  <div className="form-group">

                    <label>
                      Preferred Batch
                    </label>

                    <select
                      name="batch"
                      required
                      defaultValue=""
                    >

                      <option
                        value=""
                        disabled
                      >
                        Select preferred batch
                      </option>

                      <option value="morning">
                         Morning
                      </option>

                      <option value="afternoon">
                         Afternoon
                      </option>

                      <option value="evening">
                         Evening
                      </option>

                    </select>

                  </div>


                  {/* ================= BRANCH ================= */}

                  <div className="form-group">

                    <label>
                      Preferred Branch
                    </label>

                    <select
                      name="branch"
                      required
                      defaultValue=""
                    >

                      <option
                        value=""
                        disabled
                      >
                        Select branch
                      </option>

                      <option value="agra">
                        Agra
                      </option>

                      <option value="delhi">
                        Delhi
                      </option>

                      <option value="noida">
                        Noida
                      </option>

                      <option value="lucknow">
                        Lucknow
                      </option>

                      <option value="jaipur">
                        Jaipur
                      </option>

                    </select>

                  </div>


                  {/* ================= MESSAGE ================= */}

                  <div className="form-group full-width">

                    <label>
                      Message / Query
                    </label>

                    <textarea
                      name="message"
                      placeholder="Enter your query (optional)"
                      rows="4"
                    ></textarea>

                  </div>


                  {/* ================= SUBMIT ================= */}

                  <button
                    type="submit"
                    className="submit-enrollment"
                    disabled={submitting}
                  >

                    {submitting
                      ? "Submitting..."
                      : "Submit Enrollment"
                    }

                  </button>

                </form>

              </>

            ) : (


              /* =================================================
                 SUCCESS MESSAGE
              ================================================= */

              <div className="enrollment-success">

                <div className="success-icon">
                  ✓
                </div>

                <h2>
                  Enrollment Request Submitted!
                </h2>

                <p>
                  Thank you for your interest in{" "}
                  <strong>
                    {enrollmentCourse.name}
                  </strong>.
                </p>

                <p>
                  Our counsellor will contact you shortly
                  regarding your enrollment.
                </p>

                <button
                  type="button"
                  onClick={closeEnrollment}
                  className="success-btn"
                >
                  Done
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </section>

  );
}


export default CourseSection;