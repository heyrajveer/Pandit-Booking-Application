import { useEffect, useState } from "react";
import { getAllPandits, getPanditByCity } from "../../api/panditApi";
import { useLocation, useNavigate } from "react-router-dom";

function PanditList() {
  const [pandits, setPandits] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const city = query.get("city");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        if (city) {
          const res = await getPanditByCity(city);
          setPandits(res.data);
        } else {
          const res = await getAllPandits();
          console.log(res.data);
          setPandits(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPandits();
  }, [city]);
  return (
    <div style={{ marginTop: "70px" }}>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Pandits</h2>

        <div className="row">
          {pandits.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={
                    p.image ||
                    "https://cdn.vectorstock.com/i/preview-1x/84/05/indian-pandit-cartoon-vector-35888405.jpg"
                  }
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    height: "250px",
                    minHeight: "200px",
                    objectPosition: "top",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body text-center">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">Experience: {p.experience} yrs</p>
                  <p className="card-text">Price: ₹{p.price}</p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate(`/pandits/${p._id}`)}
                  >
                    View Details
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

export default PanditList;
