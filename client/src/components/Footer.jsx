import "./Footer.css";
import { Link } from "react-router-dom";

import {
    FaInstagram,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaArrowRight,
    FaArrowUp,
} from "react-icons/fa";

function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="footer">

            {/* ================= FOOTER MAIN ================= */}

            <div className="footer-container">

                {/* ================= ABOUT ================= */}

                <div className="footer-box footer-about">

                    <h2>
                        American Institute
                    </h2>

                    <p>
                        American Institute is one of India’s leading language
                        and overseas education institutes, empowering students
                        and professionals to achieve their academic, career,
                        and global aspirations. With 34+ years of excellence
                        in the field of English language training, we offer
                        comprehensive coaching for IELTS, PTE, Spoken English,
                        Foreign Languages, and personalized Study Abroad Guidance.
                    </p>

                </div>


                {/* ================= QUICK LINKS ================= */}

                <div className="footer-box">

                    <h3>
                        Quick Links
                    </h3>

                    <ul>

                        <li>
                            <Link to="/">
                                <FaArrowRight />
                                <span>Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/about">
                                <FaArrowRight />
                                <span>About</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/who-we-are">
                                <FaArrowRight />
                                <span>Who We Are</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/gallery">
                                <FaArrowRight />
                                <span>Gallery</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact">
                                <FaArrowRight />
                                <span>Contact</span>
                            </Link>
                        </li>

                    </ul>

                </div>


                {/* ================= CONTACT ================= */}

                <div className="footer-box">

                    <h3>
                        Contact Us
                    </h3>


                    {/* ADDRESS */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            <FaMapMarkerAlt />
                        </div>

                        <div className="contact-text">

                            <h4>
                                Address
                            </h4>

                            <p>
                                American Institute,
                                <br />
                                Hathras, Uttar Pradesh
                            </p>

                        </div>

                    </div>


                    {/* PHONE */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            <FaPhoneAlt />
                        </div>

                        <div className="contact-text">

                            <h4>
                                Phone
                            </h4>

                            <p>
                                <a href="tel:+918006990985">
                                    +91 8006990985
                                </a>

                                <br />

                                <a href="tel:+919557366622">
                                    +91 9557366622
                                </a>
                            </p>

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="contact-item">

                        <div className="contact-icon">
                            <FaEnvelope />
                        </div>

                        <div className="contact-text">

                            <h4>
                                Email
                            </h4>

                            <p>
                                <a href="mailto:lalitdhakrey.1991@gmail.com">
                                    lalitdhakrey.1991@gmail.com
                                </a>
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= SOCIAL ================= */}

                <div className="footer-box">

                    <h3>
                        Follow Us
                    </h3>

                    <div className="social-links">

                        <a
                            href="https://www.instagram.com/americanhathras?igsh=anF6ZXFicWUxYTZw"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaInstagram />
                            <span>
                                American Institute
                            </span>
                        </a>


                        <a
                            href="https://youtube.com/@lalitenglish1455?si=pKQe-Kt8zge2x0NY"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaYoutube />
                            <span>
                                Trainer YouTube
                            </span>
                        </a>


                        <a
                            href="https://www.instagram.com/lalit_english?igsh=MWlhZDFmdmJqdnJ0NA=="
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaInstagram />
                            <span>
                                Trainer Instagram
                            </span>
                        </a>

                    </div>

                </div>

            </div>


            {/* ================= DIVIDER ================= */}

            <div className="footer-divider"></div>


            {/* ================= FOOTER BOTTOM ================= */}

            <div className="footer-bottom">

                <p className="copyright">
                    © 2026{" "}
                    <span>
                        American Institute
                    </span>
                    . All Rights Reserved.
                </p>


                <div className="designer">

                    <p>
                        Design by{" "}
                        <span>
                            SAP Innovation
                        </span>
                    </p>
                    <p>
                        <span>
                            Founder - Prateek Tiwari
                        </span>
                    </p>

                </div>

            </div>


            {/* ================= BACK TO TOP ================= */}

            <button
                type="button"
                className="back-to-top"
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                <FaArrowUp />
            </button>

        </footer>
    );
}

export default Footer;
