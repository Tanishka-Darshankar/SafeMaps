import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import RoutePlanner from "./components/RoutePlanner";
import History from "./components/History"; // ✅ Added

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<DashboardLayout />} />
        <Route path="/route" element={<RoutePlanner />} />
        <Route path="/history" element={<History />} /> {/* ✅ Added */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </Router>
  );
}

export default App;
