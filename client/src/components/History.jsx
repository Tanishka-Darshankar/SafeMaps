import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./History.css";
import { API_BASE } from "../config";

const History = () => {
  const [dangers, setDangers] = useState([]);

  useEffect(() => {
    const fetchDangers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/dangers`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch dangers");
        }

        // newest first
        setDangers([...data].reverse());
      } catch (err) {
        console.error("Error fetching dangers:", err);
        setDangers([]);
      }
    };

    fetchDangers();
  }, []);

  return (
    <div className="history-page">

      {/* 🔹 TOP LEFT TOGGLES */}
      <div className="top-toggle-container-left">
        <NavLink to="/report" className="toggle-nav-btn">
          🚨 Stay Safe – Report Now
        </NavLink>

        <NavLink to="/route" className="toggle-nav-btn">
          🗺️ Plan a Route
        </NavLink>
      </div>

      {/* 🔹 PAGE TITLE */}
      <h1 className="history-title">
        <span className="history-emoji">📊</span>
        Travel & Danger History
      </h1>

      {/* 🔹 TOTAL COUNT */}
      <h2 className="history-count">
        Total Incidents Reported: {dangers.length}
      </h2>

      {/* 🔹 LIST */}
      <div className="history-list">
        {dangers.length === 0 ? (
          <p className="no-data">No incidents reported yet.</p>
        ) : (
          dangers.map((danger) => (
            <div key={danger._id || danger.id} className="history-card">
              <p><strong>📍 Area:</strong> {danger.location}</p>
              <p><strong>🚨 Type:</strong> {danger.category}</p>
              <p>
                <strong>🕒 Date:</strong>{" "}
                {new Date(danger.date).toLocaleString()}
              </p>
              <p><strong>📝 Description:</strong> {danger.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;