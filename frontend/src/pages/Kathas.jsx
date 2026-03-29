import { useNavigate, useSearchParams } from "react-router-dom";

const rituals = [
  {
    slug: "hanuman-chalisa",
    name: "Hanuman Chalisa",
    icon: "🕉️",
    short: "A powerful chant for courage and protection.",
    description:
      "Hanuman Chalisa is a sacred 40-verse hymn dedicated to Lord Hanuman. It is recited to invite strength, protection, and confidence during challenging times.",
    benefits: [
      "Strength and courage",
      "Protection from negative energy",
      "Mental clarity and focus",
    ],
    image:
    "https://i.pinimg.com/originals/21/0c/5e/210c5ec4eaf80832f2556b58d60d9d4d.jpg"
    
  },
  {
    slug: "satyanarayan-katha",
    name: "Satyanarayan Katha",
    icon: "📖",
    short: "A family ritual for gratitude and prosperity.",
    description:
      "Satyanarayan Katha is a devotional narration performed to express gratitude and seek blessings for peace, health, and prosperity in the home.",
    benefits: [
      "Family harmony",
      "Gratitude and blessings",
      "Peaceful living environment",
    ],
    image:
      "https://images.unsplash.com/photo-1535920527008-79c1f1f4e3e3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "ganesh-puja",
    name: "Ganesh Puja",
    icon: "🐘",
    short: "Invoke Lord Ganesha for new beginnings.",
    description:
      "Ganesh Puja is performed to remove obstacles and invite success before any major event, ceremony, or new venture.",
    benefits: [
      "Remove obstacles",
      "Auspicious beginnings",
      "Success and wisdom",
    ],
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "ramcharitmanas-path",
    name: "Ramcharitmanas Path",
    icon: "✍️",
    short: "Read the divine story of Lord Rama.",
    description:
      "Ramcharitmanas Path is the devotional recitation of Saint Tulsidas’ epic poem, bringing spiritual lessons and inner peace to listeners.",
    benefits: [
      "Spiritual insight",
      "Inner peace",
      "Connection with tradition",
    ],
    image:
      "https://images.unsplash.com/photo-1513377888451-5b1df428e4f2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "havan",
    name: "Havan",
    icon: "🔥",
    short: "A fire ceremony to purify body and home.",
    description:
      "Havan is a sacred fire ritual that cleanses the atmosphere, increases positive vibrations, and purifies both the home and the heart.",
    benefits: [
      "Spiritual cleansing",
      "Positive energy",
      "Calm and clarity",
    ],
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];

function Kathas() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ritualParam = searchParams.get("ritual")?.toLowerCase();

  const selectedRitual = rituals.find(
    (ritual) => ritual.slug === ritualParam || ritual.name.toLowerCase() === ritualParam
  );

  return (
    <div
      className="kathas-page"
      style={{ background: "linear-gradient(135deg, #fff8f0 0%, #fff0e0 100%)" }}
    >
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="badge bg-warning text-dark rounded-pill mb-3">
            Explore Kathas
          </span>
          <h1 className="display-5 fw-bold">Read more about sacred kathas</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
            Learn the meaning, benefits, and when to perform each ritual. Choose any
            katha to explore deeper without leaving the learning experience.
          </p>
        </div>

        {selectedRitual ? (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm p-4">
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="display-4">{selectedRitual.icon}</div>
                  <div>
                    <h2 className="fw-bold">{selectedRitual.name}</h2>
                    <p className="text-muted mb-0">{selectedRitual.short}</p>
                  </div>
                </div>
                <p className="text-muted">{selectedRitual.description}</p>
                <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
                  {selectedRitual.benefits.map((item) => (
                    <div key={item} className="col">
                      <div className="p-3 rounded-3 bg-warning bg-opacity-15">
                        <p className="mb-0 fw-semibold">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline-warning me-3" onClick={() => navigate("/kathas")}>View all kathas</button>
                <button className="btn btn-warning text-white" onClick={() => navigate("/")}>Back to Home</button>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm overflow-hidden rounded-4">
                <img
                  src={selectedRitual.image}
                  alt={selectedRitual.name}
                  className="img-fluid w-100"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {rituals.map((ritual) => (
              <div key={ritual.slug} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm overflow-hidden">
                  <img
                    src={ritual.image}
                    alt={ritual.name}
                    className="img-fluid w-100"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="display-5 me-3">{ritual.icon}</div>
                      <h5 className="fw-bold mb-0">{ritual.name}</h5>
                    </div>
                    <p className="text-muted small">{ritual.short}</p>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => navigate(`/puja/${ritual.slug}`)}
                    >
                      Explore details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Kathas;
