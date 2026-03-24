import { useEffect, useState } from "react";
import { getAllPandits } from "../../api/panditApi";
import { useNavigate } from "react-router-dom";

function PanditList() {
  const [pandits, setPandits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await getAllPandits();
        setPandits(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPandits();
  }, []);

  return (
     <div style={{ marginTop: "70px" }}>
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Pandits</h2>

      <div className="row">
        {pandits.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            
            <div className="card h-100 shadow-sm">
              
              <img
                src={p.image || "https://cdn.vectorstock.com/i/preview-1x/84/05/indian-pandit-cartoon-vector-35888405.jpg"}
                className="card-img-top"
                alt={p.name}
                style={{ height: "250px",minHeight:"200px",objectPosition:"top" , objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">
                  Experience: {p.experience} yrs
                </p>
                <p className="card-text">
                  Price: ₹{p.price}
                </p>

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