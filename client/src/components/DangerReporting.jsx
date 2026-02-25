import React, { useState } from "react";
import DangerMap from "./DangerMap";
import DangerSummary from "./DangerSummary";
import "./DangerReportingPage.css";

const categories = [
  { emoji: "🧍‍♀️", name: "Stalking" },
  { emoji: "🙅‍♀️", name: "Verbal Abuse" },
  { emoji: "🕵️‍♀️", name: "Suspicious Activity" },
  { emoji: "🚫", name: "Sexual Harassment" },
  { emoji: "🏠💢", name: "Domestic Violence" },
  { emoji: "✋🤕", name: "Physical Assault" },
  { emoji: "💻📵", name: "Cyber Harassment" },
];

const DangerReportingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reported ${selectedCategory} at ${area}, ${city}`);
    // Here you can add API call to save the report
    setCity("");
    setArea("");
    setDescription("");
    setSelectedCategory(null);
  };

  return (
    <div className="danger-page">
      <h1 className="main-heading">Stay Safe 💖 — Report Dangers Around You</h1>

      <button
        className="summary-btn"
        onClick={() => setShowSummary(!showSummary)}
      >
        {showSummary ? "Hide Summary ❌" : "View Summary 📊"}
      </button>

      {showSummary && <DangerSummary />}

      <div className="danger-container">
        {/* Left side - Report form */}
        <div className="report-section">
          <h2 className="report-heading">Report a Danger</h2>

          <div className="category-grid">
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`category-item ${
                  selectedCategory === cat.name ? "selected" : ""
                }`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                <span className="emoji">{cat.emoji}</span>
                <p>{cat.name}</p>
              </div>
            ))}
          </div>

          <form className="danger-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
            </div>

            <textarea
              placeholder="Add a short description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className="submit-btn">
              Submit Report 🚨
            </button>
          </form>
        </div>

        {/* Right side - Map */}
        <div className="map-section">
          <h2 className="map-heading">Live Danger Map 🗺️</h2>
          <div className="map-wrapper">
            <DangerMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangerReportingPage;
