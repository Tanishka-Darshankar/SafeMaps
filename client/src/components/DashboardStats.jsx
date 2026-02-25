import React from "react";
import "./DashboardStats.css";

const DashboardStats = ({ reports }) => {
  // Total reports
  const totalReports = reports.length;

  // Most common danger
  const dangerCount = {};
  reports.forEach((r) => {
    dangerCount[r.category] = (dangerCount[r.category] || 0) + 1;
  });
  const mostCommonDanger = Object.entries(dangerCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "-";

  // Most active area
  const areaCount = {};
  reports.forEach((r) => {
    areaCount[r.location] = (areaCount[r.location] || 0) + 1;
  });
  const mostActiveArea = Object.entries(areaCount).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "-";

  if (totalReports === 0) {
    return <p className="dashboard-stats-loading">No reports yet</p>;
  }

  return (
    <div className="dashboard-stats-container">
      <div className="stat-card">
        <h4>Total Reports</h4>
        <p>{totalReports}</p>
      </div>
      <div className="stat-card">
        <h4>Most Common Danger</h4>
        <p>{mostCommonDanger}</p>
      </div>
      <div className="stat-card">
        <h4>Most Active Area</h4>
        <p>{mostActiveArea}</p>
      </div>
    </div>
  );
};

export default DashboardStats;
