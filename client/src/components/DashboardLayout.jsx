import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DangerForm from "./DangerForm";
import DangerMap from "./DangerMap";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddDanger = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="dashboard-container">

      {/* 🔹 TOP TOGGLES (ONLY OTHER PAGES) */}
      <div className="top-toggle-container-left">
        <NavLink to="/route" className="toggle-nav-btn">
          🗺️ Plan a Route
        </NavLink>

        <NavLink to="/history" className="toggle-nav-btn">
          📊 Travel & Danger History
        </NavLink>
      </div>

      {/* Heading */}
     <h1 className="dashboard-heading">
  <span className="heading-emoji">🚨</span>
  <span className="heading-text">Stay Safe – Report Now</span>
</h1>



      <div className="dashboard-sections">
        
        {/* Left Panel: Report Form */}
        <div className="left-panel">
          <h2 className="section-heading"> Report a Danger</h2>
          <DangerForm onAddDanger={handleAddDanger} />
        </div>

        {/* Right Panel: Map Only */}
        <div className="right-panel">
          <h2 className="section-heading map-heading"> Live Map</h2>
          <div className="map-box">
            <DangerMap refreshTrigger={refreshTrigger} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
