import React, { useState } from "react";
import DangerForm from "./DangerForm";
import DangerMap from "./DangerMap";
import DangerSummary from "./DangerSummary";
import "./DashboardLayout.css"; // keep your current CSS

const ReportPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handleAddDanger = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">
        ⚠️ Report to Protect — Together We Stay Safe
      </h1>

      <div className="dashboard-sections">
        {/* Left Panel */}
        <div className="left-panel">
          <h2 className="section-heading">🚩 Report a Danger</h2>
          <DangerForm onAddDanger={handleAddDanger} />
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <h2 className="section-heading map-heading">🗺️ Live Map</h2>
          <div className="map-box">
            <DangerMap refreshTrigger={refreshTrigger} />
          </div>

          <button
            className="toggle-btn"
            onClick={() => setShowSummary(!showSummary)}
          >
            {showSummary ? "Hide Summary 📉" : "View Danger Summary 📊"}
          </button>

          {showSummary && (
            <div className="summary-container">
              <DangerSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
