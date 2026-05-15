import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPanditProfileById } from "../../api/panditApi";
import {
  getPanditReviews,
  reportReview,
} from "../../api/reviewApi";
import { showSuccess, showError } from "../../utils/alert";

function PanditDetails() {
  const { id } = useParams();
  const [pandit, setPandit] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const navigate = useNavigate();

  const currentUser = useMemo(
    () => JSON.parse(localStorage.getItem("user") || "null"),
    []
  );

  useEffect(() => {
    const fetchPandit = async () => {
      try {
        const res = await getPanditProfileById(id);
        setPandit(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await getPanditReviews(id);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.log(err);
      }
    };

    setReviewLoading(true);
    fetchPandit();
    fetchReviews();
    setReviewLoading(false);
  }, [id]);

  if (!pandit) return <h3 className="text-center mt-5">Loading...</h3>;

  const user = pandit?.userId;

  const renderStars = (value) =>
    Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < value ? "text-warning" : "text-muted"}
        style={{ fontSize: "1rem" }}
      >
        ★
      </span>
    ));

  return (
    <div style={{ marginTop: "100px", marginBottom: "119px" }}>
      <div className="container mt-5">
        <div className="row">
          {/* LEFT SIDE IMAGE */}
          <div className="col-md-5">
            <img
              src={
                pandit.profileImage ||
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

            <div className="mb-3">
              <strong>Rating:</strong>
              <div className="mt-2 d-flex align-items-center gap-2">
                <div>{renderStars(Math.round(pandit.averageRating || 0))}</div>
                <small className="text-muted">
                  {pandit.averageRating?.toFixed(1) || "0.0"} • {pandit.ratingCount || 0} review{pandit.ratingCount === 1 ? "" : "s"}
                </small>
              </div>
            </div>

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
              <button
                className="btn btn-warning px-4"
                onClick={() => navigate(`/booking/${pandit._id}`)}
              >
                Book Now
              </button>

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

        <div className="mt-5 p-4 border rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-1">User Reviews</h4>
              <small className="text-muted">
                Authentic reviews from users who completed a booking.
              </small>
            </div>
          </div>

          {reviewLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary"></div>
            </div>
          ) : reviews.length === 0 ? (
            <p className="mb-0 text-muted">No reviews yet.</p>
          ) : (
            <div className="row g-3">
              {reviews.map((item) => (
                <div key={item._id} className="col-md-6">
                  <div className="border rounded p-3 h-100">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong>{item.userId?.name || "Guest"}</strong>
                        <div>{renderStars(item.rating)}</div>
                      </div>
                      <small className="text-muted">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <p className="mb-2">{item.review}</p>
                    {currentUser?.role === "user" && currentUser?._id !== item.userId?._id && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={async () => {
                          try {
                            await reportReview(item._id);
                            showSuccess("Review reported. Thank you.");
                            const res = await getPanditReviews(id);
                            setReviews(res.data.reviews || []);
                          } catch (err) {
                            console.error(err);
                            showError(err.response?.data?.error || "Unable to report review.");
                          }
                        }}
                      >
                        Report
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PanditDetails;
