import { useNavigate } from "react-router-dom";
import { useState } from "react";

const exploreItems = [
  {
    slug: "hanuman-chalisa",
    name: "Hanuman Chalisa",
    icon: "\u{1F549}",
    image:
      "https://png.pngtree.com/png-clipart/20241102/original/pngtree-hanuman-jayanti-banner-featuring-hindu-lord-in-traditional-design-png-image_16634338.png",
    // "https://i.pinimg.com/originals/64/11/de/6411de7f4501cde61744c36d63f70815.jpg",
    description: "Recite 40 verses to seek strength, courage and protection.",
  },
  {
    slug: "satyanarayan-katha",
    name: "Satyanarayan Katha",
    icon: "\u{1F4D6}",
    image: "https://i.scdn.co/image/ab67616d0000b273917a84f587b6607683c900ca",
    // "https://d18guwlcxyb2ak.cloudfront.net/wp-content/uploads/2019/03/13035054/CIty-Varanasi-Satyanarayan-Katha.jpg",
    description: "A family puja for gratitude, peace and prosperity.",
  },
  {
    slug: "ganesh-puja",
    name: "Ganesh Puja",
    icon: "\u{1F418}",
    image:
      "https://tse2.mm.bing.net/th/id/OIP.31yv_DlSbtNIZNc3GZ1UxAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Invoke Lord Ganesha for auspicious beginnings and wisdom.",
  },
  {
    slug: "ramcharitmanas-path",
    name: "Ramcharitmanas Path",
    icon: "\u{270D}\u{FE0F}",
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3IOk1lnV950UThqXwuy7wGRuEbi0FArKfA0_a3h6wc6rojRDkjt8GNS_t0dCqP9Eoj-BsHAN4a2Eo94y8Al5r0sU7S7eJRS2JzceqXMUUmuWluDgqufFPjvOuDcf_5G49ZnNcolbRJdW2bl3DJTiTuYyZlpzEWpjtjnqSFXOcUsqRnzc-UUzGsXCyL_WQ/w640-h640/1000630042.webp",
    description:
      "Listen to the divine story of Lord Rama through sacred recitation.",
  },
  {
    slug: "havan",
    name: "Havan",
    icon: "\u{1F525}",
    image:
      "https://thumbs.dreamstime.com/z/rishikesh-india-circa-october-ganga-aarti-ceremony-parmarth-niketan-ashram-sunset-celebration-dussehra-major-hindu-213155194.jpg",
    description: "A sacred fire ceremony to cleanse your home and mind.",
  },
];

const whyItems = [
  {
    title: "Spiritual Comfort",
    description:
      "Performing pujas creates peace at home and strengthens faith.",
    emoji: "\u{1F64F}",
  },
  {
    title: "Blessings for Family",
    description: "Invites positive energy, health, and harmony for loved ones.",
    emoji: "\u{1F33C}",
  },
  {
    title: "Ritual Guidance",
    description: "Experienced pandits guide every step of the ceremony.",
    emoji: "\u{1F56F}\u{FE0F}",
  },
];

const steps = [
  {
    title: "Search",
    description: "Enter your city and discover local pandits instantly.",
    icon: "\u{1F50D}",
  },
  {
    title: "Choose Pandit",
    description: "Compare profiles, ratings, and services before booking.",
    icon: "\u{1F473}",
  },
  {
    title: "Book",
    description: "Confirm your date, time and let the pandit handle the rest.",
    icon: "\u{2705}",
  },
];

const testimonials = [
  {
    quote:
      "The pandit arrived on time and made our housewarming puja effortless. Highly recommended!",
    name: "Neha Sharma",
    role: "Homeowner",
  },
  {
    quote:
      "Beautiful service, clear communication, and the ritual was performed with great respect.",
    name: "Ravi Patel",
    role: "Devotee",
  },
  {
    quote:
      "The booking process was smooth, and the pandit explained every tradition simply.",
    name: "Aarti Singh",
    role: "Bride-to-be",
  },
];

function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleSearch = () => {
    if (!city.trim()) {
      alert("Please enter city");
      return;
    }

    navigate(`/pandits?city=${city.trim()}`);
  };

  const handleExplore = (ritualSlug) => {
    navigate(`/puja/${ritualSlug}`);
  };

  return (
    <div className="home-page" style={{ marginTop: "50px" }}>
      <section
        className="py-5"
        style={{
          background:
            "linear-gradient(135deg, #fff8ed 0%, #ffe0b8 45%, #ffd08b 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <span className="badge bg-warning text-dark rounded-pill mb-3">
                Trusted Puja Platform
              </span>
              <h1 className="display-5 fw-bold mb-4">
                Find Verified Pandits Near You{" "}
                <span className="text-warning">{"\u{1F64F}"}</span>
              </h1>
              <p className="lead text-secondary mb-4">
                Book experienced pandits for puja, havan, and spiritual
                ceremonies with confidence. Simple search, easy booking, and
                reliable service.
              </p>

              <div className="card shadow-sm border-0 p-3 p-md-4">
                <div className="row g-2 g-md-3 align-items-center">
                  <div className="col-12 col-md-8">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter city (e.g. Delhi)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-4 d-grid">
                    <button
                      className="btn btn-warning btn-lg text-white"
                      onClick={handleSearch}
                    >
                      Search Pandits
                    </button>
                  </div>
                </div>
                <p className="mt-3 mb-0 text-muted small">
                  Explore local pandits, compare reviews, and book instantly.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                <img
                  src="https://img.freepik.com/premium-photo/ancient-hindu-priest-preparing-ayurvedic-medicine_731298-398.jpg"
                  alt="pandit"
                  className="img-fluid w-100"
                  style={{ maxHeight: "450px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-warning fw-semibold mb-2">Why Choose Us</p>
            <h2 className="fw-bold">Trusted, easy, and affordable</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "620px" }}>
              From verified pandits to transparent pricing, our platform is
              built for devotees who want a seamless puja experience.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div
                className="card h-100 border-0 shadow-sm p-4"
                style={{
                  transition: "transform .25s ease, box-shadow .25s ease",
                }}
              >
                <div className="mb-3 fs-2">{"\u{1F4CD}"}</div>
                <h5 className="fw-bold">Verified Pandits</h5>
                <p className="text-muted mb-0">
                  Only trusted pandits with real reviews and authentic
                  backgrounds.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card h-100 border-0 shadow-sm p-4"
                style={{
                  transition: "transform .25s ease, box-shadow .25s ease",
                }}
              >
                <div className="mb-3 fs-2">{"\u{1F4AA}"}</div>
                <h5 className="fw-bold">Easy Booking</h5>
                <p className="text-muted mb-0">
                  Fast search, clear packages, and confirmed bookings in a few
                  clicks.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card h-100 border-0 shadow-sm p-4"
                style={{
                  transition: "transform .25s ease, box-shadow .25s ease",
                }}
              >
                <div className="mb-3 fs-2">{"\u{1F4B0}"}</div>
                <h5 className="fw-bold">Affordable Prices</h5>
                <p className="text-muted mb-0">
                  Transparent fees and value-driven service for every ceremony.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-5"
        style={{
          background: "linear-gradient(5deg, #92d9e7 10%, #efe9cd 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-start gy-4">
            <div className="col-lg-5">
              <span className="badge bg-warning text-dark rounded-pill mb-3">
                Explore Pujas & Kathas
              </span>
              <h2 className="fw-bold">Popular rituals curated for you</h2>
              <p className="text-muted">
                Discover the most requested pujas and kathas for every
                celebration.
              </p>
              
              <div className="card border-0 shadow-sm overflow-hidden rounded-4 mt-4">
                <img
                  src=".\images\puja_ritual.png"
                  alt="puja ritual"
                  className="img-fluid w-100"
                  style={{
                    height: "360px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
                
              </div>
     <button
  className="btn btn-warning w-100 mt-4 fw-semibold shadow"
  onClick={() => navigate("/kathas")}
  onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
  onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
>
  Explore All Kathas →
</button>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {exploreItems.slice(0, 4).map((item) => (
                  <div key={item.slug} className="col-12 col-sm-6">
                    <div
                      className="card border-0 shadow-sm h-100 overflow-hidden"
                      style={{
                        transition: "transform .25s ease, box-shadow .25s ease",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid w-100"
                        style={{
                          height: "180px",
                          objectFit: "cover",
                          objectPosition: "top",
                        }}
                      />
                      <div
                        className="card-body p-4"
                        style={{ background: "rgb(247, 97, 137)" }}
                      >
                        <div className="d-flex align-items-center mb-3">
                          <div className="fs-3 me-3">{item.icon}</div>
                          <h6 className="fw-bold mb-0">{item.name}</h6>
                        </div>
                        <p className="text-muted small mb-3">
                          {item.description}
                        </p>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm text-white"
                          onClick={() => handleExplore(item.slug)}
                        >
                          Explore More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
           
          </div>
        </div>
      </section>

      <section className="py-5">
        <div
          className="container"
          style={{
            background: "linear-gradient(180deg, #a29e96 0%, #fff2d6 100%)",
          }}
        >
          <div className="text-center mb-5">
            <p className="text-white fw-semibold mb-2">
              Why Perform These Pujas?
            </p>
            <h2 className="fw-bold">
              Meaningful rituals for life and prosperity
            </h2>
          </div>

          <div className="row g-4">
            {whyItems.map((item) => (
              <div key={item.title} className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm p-4"
                  style={{
                    transition: "transform .25s ease, box-shadow .25s ease",
                  }}
                >
                  <div className="fs-2 mb-3">{item.emoji}</div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted mb-0">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-5"
        style={{
          background: "linear-gradient(360deg, #edbaa8 50%, #fff2d6 100%)",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-warning fw-semibold mb-2">How It Works</p>
            <h2 className="fw-bold">A simple process for every devotee</h2>
          </div>
          <div className="row g-4">
            {steps.map((step, index) => (
              <div key={step.title} className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm p-4"
                  style={{
                    transition: "transform .25s ease, box-shadow .25s ease",
                  }}
                >
                  <div className="display-6 mb-3">{step.icon}</div>
                  <h5 className="fw-bold">
                    {index + 1}. {step.title}
                  </h5>
                  <p className="text-muted mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <p className="text-warning fw-semibold mb-2">Testimonials</p>
            <h2 className="fw-bold">What our users are saying</h2>
          </div>
          <div className="row g-4">
            {testimonials.map((item) => (
              <div key={item.name} className="col-md-4">
                <div
                  className="card h-100 border-0 shadow-sm p-4"
                  style={{
                    transition: "transform .25s ease, box-shadow .25s ease",
                  }}
                >
                  <p className="text-dark fst-italic">“{item.quote}”</p>
                  <div className="mt-4">
                    <h6 className="fw-bold mb-1">{item.name}</h6>
                    <p className="text-muted small mb-0">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-5 text-center"
        style={{
          background: "linear-gradient(360deg, #bcf3f3 50%, #f5f9fa 100%)",
        }}
      >
        <div className="container">
          <div className="p-4 p-md-5 rounded-4 shadow-sm bg-white border">
            <h3 className="fw-bold mb-3">Become a Pandit & Start Earning</h3>
            <p className="text-muted mb-4">
              Join our platform to serve devotees, grow your reach, and get
              booked for ceremonies.
            </p>
            <button
              className="btn btn-warning btn-lg text-white"
              onClick={() => navigate("/auth")}
            >
              Join Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
