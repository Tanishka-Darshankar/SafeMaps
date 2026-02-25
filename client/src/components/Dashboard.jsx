import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-fullscreen">
      <h1 className="dashboard-title">💖 Safety Begins With Your Voice</h1>

      <div className="dashboard-buttons">
        <button className="dashboard-btn report" onClick={() => navigate("/report")}>
          🚨 Stay Safe – Report Now
        </button>

        <button className="dashboard-btn route" onClick={() => navigate("/route")}>
          🗺️ Plan a Route
        </button>

        <button className="dashboard-btn history" onClick={() => navigate("/history")}>
          📜 Travel & Danger History
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
