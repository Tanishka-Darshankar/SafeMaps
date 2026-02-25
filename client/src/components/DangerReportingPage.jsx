import React, { useState } from "react";
import DangerForm from "../components/DangerForm";
import MainMap from "../components/MainMap";
import DangerSummary from "../components/DangerSummary";
import "./DangerReportingPage.css";

const DangerReportingPage = () => {
  const [dangers, setDangers] = useState([]);

  const handleAddDanger = (newDanger) => {
    setDangers((prev) => [...prev, newDanger]);
  };

  return (
    <div className="danger-reporting-container">
      <div className="reporting-content">
        <div className="left-panel">
          <DangerForm onAddDanger={handleAddDanger} />
        </div>
        <div className="right-panel">
          <MainMap dangers={dangers} />
        </div>
      </div>
      <DangerSummary dangers={dangers} />
    </div>
  );
};

export default DangerReportingPage;
