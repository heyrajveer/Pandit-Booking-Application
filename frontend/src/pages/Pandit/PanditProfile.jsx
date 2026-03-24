import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyPanditProfile,
  updatePanditProfile,
  createPanditProfile,
} from "../../api/panditApi";

function PanditProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [pandit, setPandit] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== "pandit") {
      navigate("/auth");
      return;
    }

    getMyPanditProfile()
      .then((res) => setPandit(res.data || {}))
      .catch(() => setPandit({}))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const isEdit = pandit && pandit._id;

  const handleSubmit = async () => {
    try {
      const data = {
        services: pandit.services,
        experience: pandit.experience,
        price: pandit.price,
        description: pandit.description,
      };

      if (isEdit) {
        await updatePanditProfile(data);
        alert("Profile updated ✅");
      } else {
        await createPanditProfile(data);
        alert("Profile created ✅");
      }

      navigate("/pandit-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div style={{ marginTop: "70px" }}>
    <div
      style={{
        background: "linear-gradient(135deg, #ff9933, #ffcc80)",
        minHeight: "82vh",
      }}
    >
      {/* 🔝 Header */}
      <div className="container-fluid  bg-danger  py-1 px- d-flex justify-content-between align-items-center">
        <h3 className="text-white m-0">🧘 Pandit Profile</h3>

        {/* 👉 Right Logo */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="pandit"
          style={{
            width: "50px",
            borderRadius: "20%",
            border: "2px solid white",
            background: "white",
          }}
        />
      </div>

      {/* 🧾 Form Card */}
      <div className="container d-flex justify-content-center mt-4 bg-red">
        <div className="p-2">
          <img
            src="https://img.freepik.com/premium-photo/cartoon-character-yellow-tuk_761066-33424.jpg"
            alt="pandit"
            style={{
              width: "450px",
              maxWidth: "370px",
              // height: "450px",
              objectFit: "cover",
              borderRadius: "20px", // ✅ now works
              border: "3px solid white",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        <div
          className="card shadow-lg p-3"
          style={{
            width: "450px",
            minWidth: "300px",
            borderRadius: "20px",
          }}
        >
          {/* 👤 User Info */}
          <h5 className="fw-bold text-warning mb-3">Basic Info</h5>
          <p>
            <strong>Name:</strong> {pandit?.userId?.name || user?.name}
          </p>
          <p>
            <strong>City:</strong> {pandit?.userId?.city || user?.city}
          </p>
          <p>
            <strong>Phone:</strong> {pandit?.userId?.phone || user?.phone}
          </p>

          <hr />

          {/* 🛠 Form Fields */}
          <div className="mb-3">
            <label className="form-label">Services</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Puja, Havan"
              value={pandit?.services?.join(",") || ""}
              onChange={(e) =>
                setPandit({
                  ...pandit,
                  services: e.target.value.split(","),
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Experience (years)</label>
            <input
              type="number"
              className="form-control"
              value={pandit?.experience || ""}
              onChange={(e) =>
                setPandit({ ...pandit, experience: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              className="form-control"
              value={pandit?.price || ""}
              onChange={(e) => setPandit({ ...pandit, price: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="1"
              value={pandit?.description || ""}
              onChange={(e) =>
                setPandit({ ...pandit, description: e.target.value })
              }
            />
          </div>

          {/* 🚀 Submit Button */}
          <button className="btn btn-custom w-100" onClick={handleSubmit}>
            {isEdit ? "Update Profile" : "Create Profile"}
          </button>
        </div>
      </div>

      {/* 🎨 Styling */}
      <style>
        {`
          .btn-custom {
            background: linear-gradient(135deg, #ff7a18, #ffb347);
            color: white;
            font-weight: 600;
            border: none;
            transition: 0.3s;
          }

          .btn-custom:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
            background: linear-gradient(135deg, #ff6a00, #ff9e2c);
          }

          .card:hover {
            transform: scale(1.01);
            transition: 0.3s;
          }
        `}
      </style>
    </div>
    </div>
  );
}

export default PanditProfile;
