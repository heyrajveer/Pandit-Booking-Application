import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (!city) {
      alert("Please select a city");
      return;
    }
    navigate(`/pandits?city=${city}`);
  };

  return (
    <div className="container-fluid home-container">
  <div className="row h-100">

    {/* LEFT SIDE IMAGE */}
    <div className="col-md-6 d-none d-md-block left-image"></div>
    {/* RIGHT SIDE */}
    
    <div className="col-md-6 d-flex flex-column align-items-center justify-content-center right-section">
   <h1 className="mb-4 fw-bold text-dark d-flex justify-content-center ">welcome to our website</h1>
      <div className="p-3 shadow home-card">

        <h2 className="mb-4 fw-bold text-dark">
          🙏 Find Pandit Near You
        </h2>

        <p className="text-muted mb-4">
          Book trusted pandits for all rituals & ceremonies
        </p>

        <select
          className="form-select mb-3"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Jaipur">Jaipur</option>
        </select>

        <button
          className="w-100 mb-2 btn-custom"
          onClick={handleSearch}
        >
          🔍 Search Pandits
        </button>

        <button
          className="w-100 btn-secondary-custom"
          onClick={() => navigate("/pandits")}
        >
          Explore All
        </button>

      </div>
    </div>

  </div>
</div>
  );
}

export default Home;