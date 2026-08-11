import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./WhoWeAre.css";


function WhoWeAre() {

    const faculty = [
        {
            name: "Mr. Ankit Sharma",
            role: "IELTS Trainer",
            exp: "8+ Years Experience",
        },

        {
            name: "Ms. Priya Verma",
            role: "PTE Expert",
            exp: "7+ Years Experience",
        },

        {
            name: "Mr. Rohit Singh",
            role: "Spoken English Trainer",
            exp: "6+ Years Experience",
        },

        {
            name: "Ms. Neha Gupta",
            role: "French Language Trainer",
            exp: "5+ Years Experience",
        },

        {
            name: "Mr. Vivek Kumar",
            role: "German Language Trainer",
            exp: "9+ Years Experience",
        },

        {
            name: "Ms. Riya Sharma",
            role: "Study Abroad Counselor",
            exp: "10+ Years Experience",
        },
    ];


    const branches = [
        "Agra",
        "Delhi",
        "Noida",
        "Lucknow",
        "Jaipur",
        "Chandigarh",
        "Ludhiana",
        "Indore",
        "Dehradun",
    ];


    return (
        <>

            <Navbar />


            <section className="who">


                {/* =====================================================
                    WHO WE ARE
                ===================================================== */}

                <div className="about-box">

                    <h1>
                        Who We Are
                    </h1>

                    <div className="line"></div>


                    <p>
                        American Institute is one of India's leading coaching
                        institutes established in 1991. We specialize in IELTS,
                        PTE, Spoken English, Foreign Languages and Study Abroad
                        Guidance.
                    </p>


                    <p>
                        Our mission is to provide quality education with
                        experienced faculty, practical learning and personalized
                        student support. Thousands of students have achieved
                        success through our guidance.
                    </p>


                    {/* =====================================================
                        HERE YOU WILL LEARN
                    ===================================================== */}

                    <section className="learn-section">

                        <div className="learn-content">

                            <span className="learn-tag">
                                SPOKEN ENGLISH PROGRAM
                            </span>


                            <h2>
                                Here You Will Learn
                            </h2>


                            <p className="learn-intro">
                                Build your confidence and improve your English
                                speaking skills with practical, real-life
                                communication practice.
                            </p>


                            <div className="learn-list">


                                <div className="learn-item">

                                    <span className="check-icon">
                                        ✔
                                    </span>

                                    <span>
                                        Hindi to English daily-use sentences
                                    </span>

                                </div>


                                <div className="learn-item">

                                    <span className="check-icon">
                                        ✔
                                    </span>

                                    <span>
                                        Spoken English for beginners & job seekers
                                    </span>

                                </div>


                                <div className="learn-item">

                                    <span className="check-icon">
                                        ✔
                                    </span>

                                    <span>
                                        Powerful English expressions & vocabulary
                                    </span>

                                </div>


                                <div className="learn-item">

                                    <span className="check-icon">
                                        ✔
                                    </span>

                                    <span>
                                        English speaking practice for real situations
                                    </span>

                                </div>


                                <div className="learn-item">

                                    <span className="check-icon">
                                        ✔
                                    </span>

                                    <span>
                                        Interview English & communication skills
                                    </span>

                                </div>


                            </div>

                        </div>

                    </section>

                </div>


                {/* =====================================================
                    EXPERT FACULTY
                ===================================================== */}

                <h2 className="heading">
                    Our Expert Faculty
                </h2>


                {/* =====================================================
                    DESKTOP FACULTY
                ===================================================== */}

                <div className="faculty-grid faculty-desktop">

                    {faculty.map((item, index) => (

                        <div
                            className="faculty-card"
                            key={index}
                        >

                            <img
                                src={`https://i.pravatar.cc/250?img=${index + 20}`}
                                alt={item.name}
                            />


                            <h3>
                                {item.name}
                            </h3>


                            <p>
                                {item.role}
                            </p>


                            <span>
                                {item.exp}
                            </span>

                        </div>

                    ))}

                </div>


                {/* =====================================================
                    MOBILE FACULTY SLIDER
                ===================================================== */}

                <div className="faculty-mobile-slider">

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={15}
                        slidesPerView={1.15}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        className="faculty-swiper"
                    >

                        {faculty.map((item, index) => (

                            <SwiperSlide key={index}>

                                <div className="faculty-card">

                                    <img
                                        src={`https://i.pravatar.cc/250?img=${index + 20}`}
                                        alt={item.name}
                                    />


                                    <h3>
                                        {item.name}
                                    </h3>


                                    <p>
                                        {item.role}
                                    </p>


                                    <span>
                                        {item.exp}
                                    </span>

                                </div>

                            </SwiperSlide>

                        ))}

                    </Swiper>

                </div>


                {/* =====================================================
                    OUR PRESENCE
                ===================================================== */}

                <h2 className="heading presence-heading">
                    Our Presence Across India
                </h2>


                <div className="branch-grid">

                    {branches.map((city, index) => (

                        <div
                            className="branch-card"
                            key={index}
                        >

                            <span className="location-icon">
                                📍
                            </span>

                            <span>
                                {city}
                            </span>

                        </div>

                    ))}

                </div>


            </section>


            <Footer />

        </>
    );
}


export default WhoWeAre;