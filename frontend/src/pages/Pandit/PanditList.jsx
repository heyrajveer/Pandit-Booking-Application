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
    <div className="bg-light min-vh-100 " style={{ marginTop: "70px", background: "linear-gradient(135deg, #edf9fb, #88eaea)"}}>
      <div className="container py-5 " >
        {/* Header */}
        <div className="text-center mb-5 ">
          <h2 className="fw-bold text-dark">
            Book Trusted Pandits {city && `in ${city}`}
          </h2>
          <p className="text-secondary">
            Search pandits by services like Puja, Marriage, Havan
          </p>
        </div>

        {/* Search */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg shadow-sm rounded-pill px-4"
              placeholder="Search by service (e.g. Marriage, Puja...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
