import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./Hero.css";

import img1 from "../assets/images/slider1.jpeg";
import img2 from "../assets/images/slider2.jpeg";
import img3 from "../assets/images/slider3.jpeg";

function Hero() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      loop={true}
      className="hero-slider"
    >

      {/* ================= SLIDE 1 ================= */}

      <SwiperSlide>
        <div
          className="hero-slide"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        >

          <div className="hero-overlay">

            <h1>
              Welcome to American Institute
            </h1>

            <p>
              Learn English & Foreign Languages
            </p>

          </div>

        </div>
      </SwiperSlide>


      {/* ================= SLIDE 2 ================= */}

      <SwiperSlide>
        <div
          className="hero-slide"
          style={{
            backgroundImage: `url(${img2})`,
          }}
        >

          <div className="hero-overlay">

            <h1>
              Study Abroad
            </h1>

            <p>
              Build Your Bright Future
            </p>

          </div>

        </div>
      </SwiperSlide>


      {/* ================= SLIDE 3 ================= */}

      <SwiperSlide>
        <div
          className="hero-slide"
          style={{
            backgroundImage: `url(${img3})`,
          }}
        >

          <div className="hero-overlay">

            <h1>
              Professional Coaching
            </h1>

            <p>
              IELTS • PTE • Spoken English
            </p>

          </div>

        </div>
      </SwiperSlide>

    </Swiper>
  );
}

export default Hero;