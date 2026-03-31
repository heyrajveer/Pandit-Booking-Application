import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyPanditProfile,
  updatePanditProfile,
  createPanditProfile,
  uploadProfileImage,
} from "../../api/panditApi";

function PanditProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [pandit, setPandit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!user || user.role?.toLowerCase() !== "pandit") {
      navigate("/auth");
      return;
    }

    getMyPanditProfile()
      .then((res) => {
        const profile = res.data || {};
        setPandit(profile);
        setPreviewImage(profile.profileImage || "");
      })
      .catch(() => setPandit({}))
      .finally(() => setLoading(false));
  }, [ navigate]);

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
      } else {
        await createPanditProfile(data);
      }

      if (selectedFile) {
        const formData = new FormData();
        formData.append("profileImage", selectedFile);
        await uploadProfileImage(formData);
      }

      alert("Profile saved ✅");
      navigate("/pandit-dashboard");
    } catch (err) {
      console.log(err);
      alert("Unable to save profile. Please try again.");
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div style={{ marginTop: "70px" }}>
    <div
      style={{
        background: "linear-gradient(135deg, #c8c5c5, #fafdff)",
        minHeight: "82vh",
      }}
    >
      {/* 🔝 Header */}
      <div className="container-fluid  bg-danger  py-1 px- d-flex justify-content-between align-items-center">
        <h3 className=" text-white m-0 ">🧘 Pandit Profile</h3>

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
            src={
              previewImage ||
              "https://img.freepik.com/premium-photo/hindu-pandit-3d-character-hindu-pujari-illustration-hindu-dress-dhoti-man_714173-1111.jpg?w=2000"
            }
            alt="pandit"
            style={{
              width: "450px",
              maxWidth: "370px",
              objectFit: "cover",
              borderRadius: "20px",
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

          <div className="mb-3">
            <label className="form-label">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
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
