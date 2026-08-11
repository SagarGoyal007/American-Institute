import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Gallery.css";

import class1 from "../assets/images/class1.jpg";
import group1 from "../assets/images/group1.jpeg";
import function2 from "../assets/images/function2.jpeg";
import award1 from "../assets/images/award1.jpeg";
import farewell1 from "../assets/images/farewell1.jpeg";
import class2 from "../assets/images/class2.avif";
import class3 from "../assets/images/class3.webp";
import function1 from "../assets/images/function1.webp";
import seminar1 from "../assets/images/seminar1.avif";
import study1 from "../assets/images/study1.jpeg";
import ceremony1 from "../assets/images/ceremony1.webp";
import event1 from "../assets/images/event1.jpg";

function Gallery() {

    const images = [

        {
            img: class1,
            title: "English Speaking Class"
        },

        {
            img: group1,
            title: "Group Photo"
        },

        {
            img: function2,
            title: "Cultural Program"
        },

        {
            img: award1,
            title: "Fun"
        },

        {
            img: farewell1,
            title: "Farewell Ceremony"
        },

        {
            img: study1,
            title: "Gift Distribution"
        },

        {
            img: class2,
            title: "IELTS Classroom"
        },

        {
            img: class3,
            title: "PTE Training"
        },

        {
            img: function1,
            title: "Annual Function"
        },

        {
            img: seminar1,
            title: "Career Seminar"
        },

        {
            img: ceremony1,
            title: "Certificate Distribution"
        },

        {
            img: event1,
            title: "Student Event"
        }

    ];

    return (
        <>

            <Navbar />

            <section className="gallery">

                {/* ================= TITLE ================= */}

                <h1>
                    Gallery
                </h1>

                <p>
                    Explore memorable moments from our classrooms,
                    seminars, farewell ceremonies, cultural events,
                    award functions and student activities.
                </p>


                {/* ================= GALLERY ================= */}

                <div className="gallery-grid">

                    {images.map((item, index) => (

                        <div
                            className="gallery-card"
                            key={index}
                        >

                            <img
                                src={item.img}
                                alt={item.title}
                            />

                            <div className="overlay">

                                <h3>
                                    {item.title}
                                </h3>

                            </div>

                        </div>

                    ))}

                </div>


                {/* ================= MOBILE SWIPE HINT ================= */}

                <div className="mobile-gallery-hint">

                    <span>←</span>

                    Swipe to explore photos

                    <span>→</span>

                </div>

            </section>

            <Footer />

        </>
    );
}

export default Gallery;