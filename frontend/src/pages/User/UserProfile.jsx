import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getUserProfile,
  updateUserProfile,
  uploadUserProfileImage,
} from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError, showLoading } from "../../utils/alert";
function UserProfile() {
  const navigate = useNavigate();
  const userr = JSON.parse(localStorage.getItem("user") || "null");

  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!userr) {
      navigate("/auth");
    }

    const fetchUser = async () => {
      try {
        const res = await getUserProfile();
        setUser(res.data);
        setPreviewImage(res.data.profileImage || "");
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  },[  navigate]);

const handleUpdate = async () => {
  try {
    // 🔥 LOADING
    showLoading("Updating profile...");

    const res = await updateUserProfile(user);
    let updatedUser = res.data;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("profileImage", selectedFile);

      const uploadRes = await uploadUserProfileImage(formData);

      updatedUser = uploadRes.data;

      setPreviewImage(uploadRes.data.profileImage || "");
    }

    // ✅ update state
    setUser(updatedUser);

    // ✅ update localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // 🔥 SUCCESS
    showSuccess("Profile updated successfully ✅");

  } catch (err) {
    console.log(err);

    // 🔥 ERROR
    showError("Unable to update profile ❌");
  }
};

return (
  <div style={{marginTop:"70px"}}>
  <div className="bg-light min-vh-100">

    {/* 🔝 Navbar */}
    <nav className="navbar navbar-dark bg-secondary px-4 shadow-sm">
      <span className="navbar-brand fw-semibold">👤 User Profile</span>

      <img
        src= {previewImage || "https://img.freepik.com/premium-photo/immersive-3d-cartoon-avatar-captivating-frontprofile-view-10yearold-white-male-with-black-h_983420-10038.jpg?w=2000"}
        alt="profile"
        className="rounded-circle border"
        width="45"
      />
    </nav>

    {/* 🔥 Main Content */}
    <div className="container py-5">

      <div className="row align-items-center justify-content-center g-5">

        {/* 🖼 LEFT SIDE */}
        <div className="col-lg-5 text-center">
          <div className="card border-0 shadow-sm p-3">
            <img
              src={
                previewImage ||
                "https://img.freepik.com/premium-photo/immersive-3d-cartoon-avatar-captivating-frontprofile-view-10yearold-white-male-with-black-h_983420-10038.jpg?w=2000"
              }
              alt="user"
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "cover" ,objectPosition:"top"}}
            />

            <h6 className="mt-3 mb-1">{user?.name}</h6>
            <p className="text-muted small mb-1">{user?.email}</p>
            {user?.profession && (
              <p className="text-muted small mb-0">
                {user.profession}
              </p>
            )}
          </div>
        </div>

        {/* 📋 RIGHT FORM */}
        <div className="col-lg-6 col-md-10">

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">

              <h5 className="fw-semibold mb-4">Edit Profile</h5>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label small">Name</label>
                <input
                  className="form-control"
                  value={user.name || ""}
                  onChange={(e) =>
                    setUser({ ...user, name: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label small">Email</label>
                <input
                  className="form-control"
                  value={user.email || ""}
                  disabled
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label className="form-label small">Phone</label>
                <input
                  className="form-control"
                  value={user.phone || ""}
                  onChange={(e) =>
                    setUser({ ...user, phone: e.target.value })
                  }
                />
              </div>

              {/* Profession */}
              <div className="mb-3">
                <label className="form-label small">Profession</label>
                <input
                  className="form-control"
                  value={user.profession || ""}
                  onChange={(e) =>
                    setUser({ ...user, profession: e.target.value })
                  }
                />
              </div>

              {/* City */}
              <div className="mb-4">
                <label className="form-label small">City</label>
                <input
                  className="form-control"
                  value={user.city || ""}
                  onChange={(e) =>
                    setUser({ ...user, city: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="form-label small">Profile Photo</label>
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

              {/* Button */}
              <button
                className="btn btn-primary w-100 fw-semibold"
                onClick={handleUpdate}
              >
                Update Profile
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
  </div>
);
}

export default UserProfile;