import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Contact.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";


function Contact() {

  const [sending, setSending] = useState(false);

  const [showPopup, setShowPopup] = useState(false);


  // =====================================================
  // SEND CONTACT FORM
  // =====================================================

  const sendEmail = async (e) => {

    e.preventDefault();

    setSending(true);


    // ================= GET FORM DATA =================

    const formData = new FormData(e.target);

    const data = {

      name: formData.get("user_name"),

      email: formData.get("user_email"),

      phone: formData.get("user_phone"),

      message: formData.get("message"),

    };


    try {

      // ================= SEND TO BACKEND =================

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        }
      );


      const result = await response.json();


      // ================= ERROR CHECK =================

      if (!response.ok) {

        throw new Error(
          result.message || "Something went wrong"
        );

      }


      // ================= SUCCESS =================

      e.target.reset();

      setSending(false);

      setShowPopup(true);


    } catch (error) {

      console.error(
        "Contact Form Error:",
        error
      );

      setSending(false);

      alert(
        "Message could not be sent. Please try again."
      );

    }

  };


  return (

    <>

      <Navbar />


      <section className="contact">


        {/* =================================================
            TITLE
        ================================================= */}

        <div className="contact-title">

          <h1>
            Contact Us
          </h1>

          <p>
            We're always happy to help you.
            Feel free to contact us anytime.
          </p>

        </div>


        {/* =================================================
            CONTACT CONTAINER
        ================================================= */}

        <div className="contact-container">


          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="contact-info">

            <h2>
              Get In Touch
            </h2>


            {/* ================= ADDRESS ================= */}

            <div className="info-card">

              <div className="icon">
                <FaMapMarkerAlt />
              </div>

              <div>

                <h3>
                  Address
                </h3>

                <p>
                  American Institute
                  <br />
                  Hathras, Uttar Pradesh
                  <br />
                  India
                </p>

              </div>

            </div>


            {/* ================= PHONE ================= */}

            <div className="info-card">

              <div className="icon">
                <FaPhoneAlt />
              </div>

              <div>

                <h3>
                  Phone
                </h3>

                <p>
                  +91 8006990985
                  <br />
                  +91 9557366622
                </p>

              </div>

            </div>


            {/* ================= EMAIL ================= */}

            <div className="info-card">

              <div className="icon">
                <FaEnvelope />
              </div>

              <div>

                <h3>
                  Email
                </h3>

                <p>
                  lalitdhakrey.1991@gmail.com
                </p>

              </div>

            </div>


            {/* ================= WORKING HOURS ================= */}

            <div className="info-card">

              <div className="icon">
                <FaClock />
              </div>

              <div>

                <h3>
                  Working Hours
                </h3>

                <p>
                  Monday - Saturday
                </p>

                <p>
                  8:00 AM - 8:00 PM
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <div className="contact-form">

            <h2>
              Send Message
            </h2>


            <form
              onSubmit={sendEmail}
            >


              {/* ================= NAME ================= */}

              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
              />


              {/* ================= EMAIL ================= */}

              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
              />


              {/* ================= PHONE ================= */}

              <input
                type="tel"
                name="user_phone"
                placeholder="Phone Number"
                required
              />


              {/* ================= MESSAGE ================= */}

              <textarea
                name="message"
                rows="6"
                placeholder="Write Your Message..."
                required
              ></textarea>


              {/* ================= SUBMIT ================= */}

              <button
                type="submit"
                disabled={sending}
              >

                {sending
                  ? "Sending..."
                  : "Send Message"
                }

              </button>

            </form>

          </div>

        </div>


        {/* =================================================
            GOOGLE MAP
        ================================================= */}

        <div className="map-section">

          <h2>
            Find Us On Google Maps
          </h2>

          <iframe
            src="https://www.google.com/maps?q=27.5942745,78.0395126&z=17&output=embed"
            title="American Institute Location"
            loading="lazy"
            allowFullScreen
          ></iframe>

        </div>


        {/* =================================================
            SUCCESS POPUP
        ================================================= */}

        {showPopup && (

          <div
            className="success-overlay"
            onClick={() => setShowPopup(false)}
          >

            <div
              className="success-popup"
              onClick={(e) => e.stopPropagation()}
            >


              {/* ================= CLOSE ================= */}

              <button
                className="popup-close"
                onClick={() => setShowPopup(false)}
                aria-label="Close"
              >
                ×
              </button>


              {/* ================= SUCCESS ICON ================= */}

              <div className="success-icon">
                ✓
              </div>


              {/* ================= MESSAGE ================= */}

              <h2>
                Message Sent!
              </h2>

              <p>
                Thank you for contacting American Institute.
                Your message has been sent successfully.
                We will get back to you soon.
              </p>


              {/* ================= OK BUTTON ================= */}

              <button
                className="popup-ok"
                onClick={() => setShowPopup(false)}
              >
                OK
              </button>

            </div>

          </div>

        )}

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </>

  );

}


export default Contact;