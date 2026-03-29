import { useNavigate } from "react-router-dom";
import pujaData from "../data/pujaData";

// ✅ convert object → array
const pujaList = Object.entries(pujaData).map(([slug, value]) => ({
  slug,
  ...value,
}));

function Kathas() {
  const navigate = useNavigate();

  return (
    <div
      className="kathas-page"
      style={{
        background: "linear-gradient(135deg, #fff8f0 0%, #fff0e0 100%)",
        marginTop: "60px",
      }}
    >
      <div className="container py-5">

        {/* 🔥 HEADER (UNCHANGED UI) */}
        <div className="text-center mb-5">
          <span className="badge bg-warning text-dark rounded-pill mb-3">
            Explore Kathas
          </span>
          <h1 className="display-5 fw-bold">
            Read more about sacred kathas
          </h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
            Learn the meaning, benefits, and when to perform each ritual. Choose any
            katha to explore deeper without leaving the learning experience.
          </p>
        </div>

        {/* 🔥 LIST VIEW ONLY */}
        <div className="row g-4">
          {pujaList.map((ritual) => (
            <div key={ritual.slug} className="col-md-6 col-lg-4">

              <div
                className="card h-100 border-0 shadow overflow-hidden"
                style={{
                  borderRadius: "12px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >

                {/* 🖼 IMAGE */}
                <img
                  src={ritual.image}
                  alt={ritual.name.en}
                  className="img-fluid w-100"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                  }}
                />

                {/* 📦 BODY */}
                <div className="card-body p-4">

                  {/* ICON + TITLE */}
                  <div className="d-flex align-items-center mb-3">
                    <span
                      className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                      style={{ width: "35px", height: "35px" }}
                    >
                      {ritual.icon || "🕉️"}
                    </span>

                    <h5 className="fw-bold mb-0">
                      {ritual.name.en}
                    </h5>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-muted small">
                    {ritual.description.en}
                  </p>

                  {/* BUTTON */}
                  <button
                    className="btn btn-outline-warning btn-sm fw-semibold mt-2"
                    onClick={() => navigate(`/puja/${ritual.slug}`)}
                  >
                    Explore Details →
                  </button>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Kathas;