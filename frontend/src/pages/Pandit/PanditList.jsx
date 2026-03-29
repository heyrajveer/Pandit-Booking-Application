import { useEffect, useState } from "react";
import { getAllPandits, getPanditByCity } from "../../api/panditApi";
import { useLocation, useNavigate } from "react-router-dom";

function PanditList() {
  const [pandits, setPandits] = useState([]);
  const [filteredPandits, setFilteredPandits] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const city = query.get("city");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        setLoading(true);
        const res = city ? await getPanditByCity(city) : await getAllPandits();

        setPandits(res.data);
        setFilteredPandits(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPandits();
  }, [city]);

  // 🔍 Filter by services
  useEffect(() => {
    const filtered = pandits.filter((p) =>
      p.services?.some((service) =>
        service.toLowerCase().includes(search.toLowerCase()),
      ),
    );

    setFilteredPandits(filtered);
  }, [search, pandits]);

  return (
    <div className="min-vh-100" style={{ marginTop: "70px", background: "linear-gradient(135deg, #f0fbfd, #d9f3f7)" }}>
      <div className="container py-5">
        <div className="rounded-4 p-4 p-lg-5 mb-5" style={{ background: "rgba(255,255,255,0.92)", boxShadow: "0 30px 80px rgba(30, 70, 100, 0.12)" }}>
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark rounded-pill mb-3">
                Verified Pandit Network
              </span>
              <h1 className="display-6 fw-bold mb-3">
                Book trusted pandits for puja, marriage, havan and ceremonies.
              </h1>
              <p className="text-muted mb-4">
                Find verified pandits with clear pricing, service details and ratings.
                Search by service and compare the best profiles for your event.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-white text-success border px-3 py-2">
                  500+ Verified Experts
                </span>
                <span className="badge bg-white text-primary border px-3 py-2">
                  Instant Booking
                </span>
                <span className="badge bg-white text-warning border px-3 py-2">
                  Ceremony Ready
                </span>
              </div>
            </div>
            <div className="col-lg-5 text-lg-end">
              <div className="rounded-4 overflow-hidden shadow-sm" style={{ maxWidth: "360px", margin: "0 auto" }}>
                <img
                  src="https://images.unsplash.com/photo-1522542550995-8b26e5c902c4?auto=format&fit=crop&w=900&q=80"
                  alt="pandit booking"
                  className="img-fluid"
                  style={{ height: "300px", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row align-items-center mb-4">
          <div className="col-md-8">
            <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden border border-white bg-white">
              <span className="input-group-text bg-white border-0 pe-3" style={{ fontSize: "1.1rem" }}>
                🔍
              </span>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search by service (e.g. Marriage, Puja...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ minHeight: "55px" }}
              />
            </div>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <span className="badge bg-light text-dark shadow-sm px-4 py-2">
              {filteredPandits.length} available
              {city ? ` in ${city}` : ""}
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : filteredPandits.length === 0 ? (
          /* Empty State */
          <div className="text-center py-5">
            <h5 className="text-muted">No Pandits Found</h5>
          </div>
        ) : (
          /* Cards */
          <div className="row g-4">
            {filteredPandits.map((p) => (
              <div className="col-lg-4 col-md-6" key={p._id}>
                <div
                  className="card h-100 border-0 shadow-sm rounded-4"
                  style={{
                    height: "100%",
                    border: "none",
                    borderRadius: "16px",
                    background: "#ffffff",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
        
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  
                  }}
                >
                  {/* Image */}
                  <img
                    src={
                      p.image ||
                      "https://cdn.vectorstock.com/i/preview-1x/84/05/indian-pandit-cartoon-vector-35888405.jpg"
                    }
                    alt={p.name}
                    className="card-img-top rounded-top-4"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />

                  {/* Body */}
                  <div className="card-body text-center">
                    <h5 className="fw-semibold">{p.name}</h5>

                    <p className="text-muted small">
                      {p.experience} experience
                    </p>

                    {/* Services */}
                    <div className="mb-2">
                      {p.services?.map((s, idx) => (
                        <span
                          key={idx}
                          className="badge bg-primary-subtle text-primary border me-1 mb-1"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="fw-bold text-success fs-5">₹{p.price}</p>

                    <button
                      className="btn  w-100 rounded-pill fw-semibold"
                      onClick={() => navigate(`/pandits/${p._id}`)}
                      style={{ background: "rgb(135, 223, 233)"  }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(135deg, #5ac8d7, #3bb4c7)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "linear-gradient(135deg, #87dfe9, #5ac8d7)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      View Details
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

export default PanditList;
