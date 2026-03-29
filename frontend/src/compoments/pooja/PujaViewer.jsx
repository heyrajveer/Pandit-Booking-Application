import { useState } from "react";
import  pujaData  from "../../data/pujaData";

function PujaViewer({ slug }) {
  const [lang, setLang] = useState("en");
  const [showMore, setShowMore] = useState(false);

  const puja = pujaData[slug];

  if (!puja) return <h2 className="text-center mt-5">Puja not found</h2>;

  return (
    <div style={{marginTop:"70px"}}>
   <div className="container py-5">

  {/* 🔥 HEADER */}
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold">{puja.name[lang]}</h2>

    <button
      className="btn btn-outline-warning btn-sm shadow-sm"
      onClick={() => setLang(lang === "en" ? "hi" : "en")}
    >
      🌐 {lang === "en" ? "हिंदी" : "English"}
    </button>
  </div>

  {/* 🖼 IMAGE */}
  <div
    className="card border-0 shadow mb-4"
    style={{ borderRadius: "15px", overflow: "hidden" }}
  >
    <img
      src={puja.image}
      alt={puja.name[lang]}
      className="img-fluid w-100"
      style={{ maxHeight: "400px", objectFit: "cover" }}
    />
  </div>

  {/* 📄 DESCRIPTION + BENEFITS */}
  <div className="row g-4">

    {/* DESCRIPTION */}
    <div className="col-lg-8">
      <div
        className="card border-0 shadow p-4 h-100"
        style={{
          background: "#fff8f0",
          borderRadius: "12px"
        }}
      >
        <h5 className="fw-bold mb-3 text-warning">Description</h5>
        <p className="text-muted">{puja.description[lang]}</p>
      </div>
    </div>

    {/* BENEFITS */}
    <div className="col-lg-4">
      <div
        className="card border-0 shadow p-4 h-100"
        style={{
          background: "#f0fff4",
          borderRadius: "12px"
        }}
      >
        <h5 className="fw-bold mb-3 text-success">Benefits</h5>
        <ul className="list-group list-group-flush">
          {puja.benefits[lang].map((b, i) => (
            <li key={i} className="list-group-item border-0 ps-0 bg-transparent">
              ✅ {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>

  {/* 📖 TEXT */}
  <div
    className="card border-0 shadow p-4 mt-4"
    style={{
      background: "#f5f9ff",
      borderRadius: "12px"
    }}
  >
    <h5 className="fw-bold mb-3 text-primary">Full Text</h5>

    <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
      {showMore
        ? puja.text[lang]
        : puja.text[lang].slice(0, 200) + "..."}
    </p>

    <button
      className="btn btn-outline-primary btn-sm mt-2"
      onClick={() => setShowMore(!showMore)}
    >
      {showMore ? "Show Less ↑" : "Read More ↓"}
    </button>
  </div>

  {/* ⭐ EXTRA CARD */}
  <div
    className="card border-0 shadow p-4 mt-4"
    style={{
      background: "#fff3cd",
      borderRadius: "12px"
    }}
  >
    <h5 className="fw-bold mb-3 text-dark">Why This Puja is Important?</h5>
    <p className="text-muted mb-0">
      Performing this puja regularly brings positivity, spiritual growth,
      and harmony in life. It strengthens belief and removes obstacles from
      your path.
    </p>
  </div>

</div>
</div>
  );
}

export default PujaViewer;