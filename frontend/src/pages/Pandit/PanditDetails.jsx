import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPanditProfileById } from "../../api/panditApi";

function PanditDetails() {
  const { id } = useParams();
  const [pandit, setPandit] = useState(null);

  useEffect(() => {
    const fetchPandit = async () => {
      try {
        const res = await getPanditProfileById(id);
        setPandit(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPandit();
  }, [id]);

  if (!pandit) return <h3 className="text-center mt-5">Loading...</h3>;

  const user = pandit?.userId;

  return (
    <div style={{ marginTop: "100px", marginBottom: "119px" }}>
      <div className="container mt-5">
        <div className="row">
          {/* LEFT SIDE IMAGE */}
          <div className="col-md-5">
            <img
              src={
                pandit.image ||
                "https://cdn.vectorstock.com/i/1000v/84/24/indian-pandit-cartoon-vector-35888424.jpg"
              }
              alt="pandit"
              className="img-fluid rounded shadow"
              style={{
                height: "380px",
                objectFit: "cover",
                width: "100%",
                objectPosition: "top",
              }}
            />
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="col-md-7">
            <h2 className="fw-bold">{user?.name}</h2>
            <p className="text-muted">{user?.city}</p>

            <h4 className="text-success">₹ {pandit.price}</h4>

            <p>
              <strong>Experience:</strong> {pandit.experience} years
            </p>

            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>

            {/* Services */}
            <div className="mb-3">
              <strong>Services:</strong>
              <ul className="mt-2">
                {pandit.services?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <p>
              <strong>Description:</strong> {pandit.description}
            </p>

            {/* Buttons */}
            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-warning px-4">Book Now</button>

              <a
                href={`tel:${pandit.userId?.phone}`}
                className="btn btn-outline-primary px-4"
              >
                Call
              </a>
            </div>
          </div>
        </div>

        {/* EXTRA SECTION (like Amazon details) */}
        <div className="mt-5 p-4 border rounded shadow-sm">
          <h4>About Pandit</h4>
          <p>{pandit.description}</p>
        </div>
      </div>
    </div>
  );
}

export default PanditDetails;
