import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./StudentSection.css";

const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    course: "IELTS Student",
    review: "Best coaching institute with experienced teachers.",
  },
  {
    id: 2,
    name: "Priya Singh",
    course: "PTE Student",
    review: "Very supportive faculty and great environment.",
  },
  {
    id: 3,
    name: "Aman Verma",
    course: "Spoken English",
    review: "My communication skills improved a lot.",
  },
  {
    id: 4,
    name: "Riya Gupta",
    course: "French Language",
    review: "Amazing learning experience.",
  },
  {
    id: 5,
    name: "Sachin Kumar",
    course: "German Language",
    review: "Highly recommended institute.",
  },
  {
    id: 6,
    name: "Neha Jain",
    course: "Study Abroad",
    review: "Excellent visa guidance.",
  },
  {
    id: 7,
    name: "Arjun Mehta",
    course: "IELTS Student",
    review: "The trainers are very helpful and supportive.",
  },
  {
    id: 8,
    name: "Simran Kaur",
    course: "Spoken English",
    review: "I gained confidence in speaking English.",
  },
  {
    id: 9,
    name: "Mohit Sharma",
    course: "PTE Student",
    review: "Excellent classes with practical learning.",
  },
];

function StudentSection() {
  return (
    <section className="student-section">

      {/* ================= TITLE ================= */}

      <h2>
        What Our Students Say
      </h2>

      <p className="student-subtitle">
        Hear from our successful students.
      </p>


      {/* ================= SLIDER ================= */}

      <Swiper
        modules={[Autoplay, Pagination]}

        spaceBetween={30}

        slidesPerView={3}

        loop={true}

        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}

        pagination={{
          clickable: true,
        }}

        className="student-slider"

        breakpoints={{

          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },

          600: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },

          992: {
            slidesPerView: 3,
            spaceBetween: 30,
          },

        }}
      >

        {students.map((student) => (

          <SwiperSlide key={student.id}>

            <div className="student-card">

              {/* ================= IMAGE ================= */}

              <img
                src={`https://i.pravatar.cc/150?img=${student.id + 10}`}
                alt={student.name}
              />


              {/* ================= NAME ================= */}

              <h3>
                {student.name}
              </h3>


              {/* ================= COURSE ================= */}

              <span>
                {student.course}
              </span>


              {/* ================= STARS ================= */}

              <div className="stars">
                ⭐⭐⭐⭐⭐
              </div>


              {/* ================= REVIEW ================= */}

              <p>
                "{student.review}"
              </p>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  );
}

export default StudentSection;