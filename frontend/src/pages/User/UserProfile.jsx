import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserProfile, updateUserProfile } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const userr = JSON.parse(localStorage.getItem("user") || "null");

  const [user, setUser] = useState({});

  useEffect(() => {
    if (!userr) {
      navigate("/auth");
    }

    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, [userr, navigate]);

  const handleUpdate = async () => {
    try {
      await updateUserProfile(user);
      toast.success("Update Profile successful ✅");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: "70px" }}>
    <div
      style={{
        background: "linear-gradient(135deg, #e9e4e0, #292622)",
        minHeight: "82vh"
      }}
    >
      {/* 🔝 Header */}
      <div className="container-fluid bg-secondary py-2 px-4 d-flex justify-content-between align-items-center">
        <h3 className="text-white fw-bold m-0">👤 User Profile</h3>

        {/* 👉 Right Logo */}
        <img
          src="https://img.freepik.com/premium-photo/immersive-3d-cartoon-avatar-captivating-frontprofile-view-10yearold-white-male-with-black-h_983420-10038.jpg?w=2000"
          alt="profile"
          style={{
            width: "50px",
            borderRadius: "50%",
            border: "2px solid white",
            background: "white"
          }}
        />
      </div>

      {/* 🧾 Form Section */}
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <div className="row justify-content-center w-100">

          {/* 🖼 Left Image */}
          <div className="col-md-5 text-center mb-5">
            <div className="image-box">
              <img
                src="https://img.freepik.com/premium-photo/immersive-3d-cartoon-avatar-captivating-frontprofile-view-10yearold-white-male-with-black-h_983420-10038.jpg?w=2000"
                alt="user"
                className="img-fluid"
              />
            </div>
          </div>

          {/* 📋 Right Form */}
          <div className="col-md-5">
            <div className="card shadow-lg p-4 form-box">

              <h5 className="fw-bold text-warning mb-3">Basic Info</h5>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={user.name || ""}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  value={user.email || ""}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  value={user.phone || ""}
                  onChange={(e) =>
                    setUser({ ...user, phone: e.target.value })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  className="form-control"
                  value={user.city || ""}
                  onChange={(e) =>
                    setUser({ ...user, city: e.target.value })
                  }
                />
              </div>

              <button
                className="btn btn-custom w-100 mt-2"
                onClick={handleUpdate}
              >
                Update Profile
              </button>
            </div>
          </div>

        </div>
      </div>
</div>
      {/* 🎨 Styling */}
      <style>
        {`
          .image-box {
            background: white;
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: 0.3s;
          }

          .image-box img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 15px;
          }

          .image-box:hover {
            transform: translateY(-5px);
          }

          .form-box {
            border-radius: 20px;
            transition: 0.3s;
          }

          .form-box:hover {
            transform: translateY(-5px);
          }

          .btn-custom {
            background: linear-gradient(135deg, #ff7a18, #ffb347);
            color: white;
            font-weight: 600;
            border: none;
            transition: 0.3s;
          }

          .btn-custom:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
            background: linear-gradient(135deg, #ff6a00, #ff9e2c);
          }
        `}
      </style>
    </div>
  );
}

export default UserProfile;