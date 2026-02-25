// client/src/components/DangerSummary.jsx
import React from "react";

const DangerSummary = () => {
  // Placeholder summary — can connect to backend later
  const totalReports = 42;
  const mostReported = "Stalking";

  return (
    <div className="danger-summary">
      <h3>Danger Summary</h3>
      <p>Total Reports: {totalReports}</p>
      <p>Most Reported: {mostReported}</p>
    </div>
  );
};

export default DangerSummary;
