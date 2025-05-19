import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaGlobe,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import "./App.css";

const services = [
  { id: 1, name: "Fade Cut", time: "30 mins", cost: 25, img: "https://i.imgur.com/2gY9M3v.jpg" },
  { id: 2, name: "Classic Cut", time: "45 mins", cost: 30, img: "https://i.imgur.com/sBZkx3E.jpg" },
  { id: 3, name: "Beard Trim", time: "20 mins", cost: 15, img: "https://i.imgur.com/dX1bLMo.jpg" },
];

const team = [
  { id: 1, name: "James", desc: "Master Barber", img: "https://i.imgur.com/yXnEITc.jpg" },
  { id: 2, name: "Sophia", desc: "Style Expert", img: "https://i.imgur.com/6rVY8qi.jpg" },
  { id: 3, name: "Marcus", desc: "Beard Specialist", img: "https://i.imgur.com/1d7K9jY.jpg" },
];

const reviews = [
  { id: 1, name: "John", stars: 5, review: "Amazing fade!", time: "Last Week" },
  { id: 2, name: "Sarah", stars: 4.5, review: "Loved the vibe and the cut.", time: "Yesterday" },
  { id: 3, name: "David", stars: 4, review: "Professional and quick service.", time: "2 Days Ago" },
];

function Stars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars.push(<FaStar key={i} />);
    else if (i - rating < 1) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return <div className="stars">{stars}</div>;
}

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    date: "", fullName: "", phone: "", email: "",
    address: "", city: "", state: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll("section").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleInputChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedService) return alert("Please select a service first.");
    if (step === 2 && !bookingData.date) return alert("Please select a date.");
    if (
      step === 3 &&
      (!bookingData.fullName || !bookingData.phone || !bookingData.email)
    ) return alert("Please fill out your name, phone, and email.");
    setStep(step + 1);
  };

  const handleReset = () => {
    setSelectedService(null);
    setStep(1);
    setBookingData({
      date: "", fullName: "", phone: "", email: "",
      address: "", city: "", state: "",
    });
  };

  return (
    <div className="App">
      <header className="App-header" role="banner">
        <div className="logo rainbow-text" tabIndex={0}>The Original Campus Barber Shop</div>
        <nav role="navigation" aria-label="Primary navigation">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#team">Team</a></li>
            
            
            
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <video
          className="hero-video"
          src="https://res.cloudinary.com/dsnfxt5e2/video/upload/v1747653545/mixkit-barber-cutting-hair-357-hd-ready_d6mnxk.mp4"
          autoPlay loop muted playsInline aria-hidden="true"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content" tabIndex={0}>
          <h1>Experience the Art of Grooming</h1>
          <p>Book your personalized grooming session today</p>
        </div>
      </section>

      <section id="about" tabIndex={-1}>
  <h2>About Us</h2>

  <h3>Introduction</h3>
  <p>Welcome to <strong>The Original Campus Barber</strong>, where tradition meets innovation. We’re redefining grooming for the modern generation.</p>

  <h3>Description</h3>
  <p>From fades to beards, styles to skincare — we craft looks that elevate confidence and reflect individuality. Our space is more than a barbershop; it’s a sanctuary for style and self-care.</p>

  <h3>Why Choose Us?</h3>
  <ul>
    <li>✂️ Expert barbers trained in the latest techniques</li>
    <li>🪞 Personalized consultations and services</li>
    <li>🧴 Premium products & hygiene-first tools</li>
    <li>💈 Relaxing, modern ambiance</li>
    <li>⭐ Stellar customer satisfaction</li>
  </ul>

  <h3>Experience</h3>
  <p>With over <strong>10 years of experience</strong>, our team has styled thousands of clients, setting trends and raising standards in men's grooming.</p>
</section>


      <section id="services" tabIndex={-1}>
        <h2>Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${selectedService?.id === service.id ? "selected" : ""}`}
              onClick={() => {
                setSelectedService(service);
                setStep(2);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedService(service);
                  setStep(2);
                }
              }}
              aria-pressed={selectedService?.id === service.id}
            >
              <img src={service.img} alt={service.name} />
              <h3>{service.name}</h3>
              <p>{service.time} - ${service.cost}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="booking" tabIndex={-1}>
        <h2>Booking</h2>
        {step === 1 && <p id = "book-text">Please select a service above to start booking.</p>}
        {step === 2 && (
          <div className="booking-step">
            <label htmlFor="date">Choose Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={bookingData.date}
              onChange={handleInputChange}
              required
            />
            <button onClick={handleNextStep}>Next</button>
          </div>
        )}
        {step === 3 && (
          <form className="booking-step" onSubmit={(e) => {
            e.preventDefault();
            handleNextStep();
          }}>
            <label htmlFor="fullName">Full Name *</label>
            <input id="fullName" name="fullName" value={bookingData.fullName} onChange={handleInputChange} required />
            <label htmlFor="phone">Phone *</label>
            <input id="phone" name="phone" value={bookingData.phone} onChange={handleInputChange} required />
            <label htmlFor="email">Email *</label>
            <input id="email" name="email" value={bookingData.email} onChange={handleInputChange} required />
            <label htmlFor="address">Address</label>
            <input id="address" name="address" value={bookingData.address} onChange={handleInputChange} />
            <label htmlFor="city">City</label>
            <input id="city" name="city" value={bookingData.city} onChange={handleInputChange} />
            <label htmlFor="state">State</label>
            <input id="state" name="state" value={bookingData.state} onChange={handleInputChange} />
            <button type="submit">Confirm Booking</button>
          </form>
        )}
        {step === 4 && (
          <div className="booking-step confirmation">
            <h3>Thank you for booking!</h3>
            <p>You booked <b>{selectedService.name}</b> on <b>{bookingData.date}</b>.</p>
            <button onClick={handleReset}>Book Another</button>
          </div>
        )}
      </section>

      <section id="gallery" tabIndex={-1}>
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {services.map((s) => (
            <img key={s.id} src={s.img} alt={`${s.name} example`} loading="lazy" />
          ))}
        </div>
      </section>

      <section id="team" tabIndex={-1}>
        <h2>Meet The Team</h2>
        <div className="team-grid">
          {team.map((m) => (
            <div key={m.id} className="team-member">
              <img src={m.img} alt={m.name} />
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
              <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
                <a href="https://example.com" target="_blank" rel="noreferrer"><FaGlobe /></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" tabIndex={-1}>
        <h2>Reviews</h2>
        <div className="reviews-list">
          {reviews.map((r) => (
            <div key={r.id} className="review">
              <Stars rating={r.stars} />
              <p>"{r.review}"</p>
              <small>- {r.name}, <time>{r.time}</time></small>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" tabIndex={-1} className="contact">
  <h2>Contact</h2>
  <div className="info">
    <p>
      <svg
        className="location-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        width="24"
        height="24"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
      </svg>
      Denton, TX, United States
    </p>
    <p>Email: contact@orginalcampusbarber.com</p>
    <p>Phone: +19403876036</p>
  </div>
  <div className="map">
    <iframe
      title="NextGen Barber Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3337.9790955462217!2d-97.13224522561086!3d33.21464426149509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864dca8c627aaaab%3A0xb01527dbf7dcdf9e!2s311%20E%20Hickory%20St%20suite%20120%2C%20Denton%2C%20TX%2076201%2C%20USA!5e0!3m2!1sen!2sin!4v1747666374665!5m2!1sen!2sin"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</section>



      <footer className="App-footer">
        <p>© 2025 The Original Campus Barber. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
