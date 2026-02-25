import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./RoutePlanner.css";
import { API_BASE } from "../config";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const FitBounds = ({ points }) => {
  const map = useMap();
  if (points.length > 1) {
    map.fitBounds(points, { padding: [60, 60] });
  }
  return null;
};

const RoutePlanner = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromPos, setFromPos] = useState(null);
  const [toPos, setToPos] = useState(null);
  const [route, setRoute] = useState([]);

  const [safetyScore, setSafetyScore] = useState(null);
  const [riskLevel, setRiskLevel] = useState(null);
  const [nearbyDangers, setNearbyDangers] = useState([]);

  const geocode = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
    );
    const data = await res.json();
    if (!data.length) throw new Error("Location not found");

    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  const checkRouteSafety = async (start, end) => {
    try {
      const res = await fetch(`${API_BASE}/api/dangers`);
      const dangers = await res.json();

      let riskPoints = 0;
      let foundDangers = [];

      for (let danger of dangers) {
        const distanceStart = calculateDistance(
          start[0],
          start[1],
          danger.latitude,
          danger.longitude
        );

        const distanceEnd = calculateDistance(
          end[0],
          end[1],
          danger.latitude,
          danger.longitude
        );

        if (distanceStart < 0.5 || distanceEnd < 0.5) {
          riskPoints += 20;
          foundDangers.push(danger);
        }
      }

      if (riskPoints > 100) riskPoints = 100;

      const score = 100 - riskPoints;

      let level;
      if (score >= 80) level = "Safe";
      else if (score >= 50) level = "Moderate Risk";
      else level = "High Risk";

      setSafetyScore(score);
      setRiskLevel(level);
      setNearbyDangers(foundDangers);
    } catch (err) {
      console.error("Safety check failed:", err);
    }
  };

  const showRoute = async () => {
    try {
      const start = await geocode(from);
      const end = await geocode(to);

      setFromPos(start);
      setToPos(end);
      setRoute([start, end]);

      await checkRouteSafety(start, end);
    } catch {
      alert("Could not calculate route");
    }
  };

  return (
    <div className="route-page">
      <div className="top-toggle-container-left">
        <NavLink to="/report" className="toggle-nav-btn">
          🚨 Stay Safe – Report Now
        </NavLink>

        <NavLink to="/history" className="toggle-nav-btn">
          📊 Travel & Danger History
        </NavLink>
      </div>

      <h1 className="route-title">
        <span className="route-emoji">🗺️</span>
        Plan a Route
      </h1>

      <div className="route-layout">
        <div className="route-form-card">
          <label>📍 From Location</label>
          <input value={from} onChange={(e) => setFrom(e.target.value)} />

          <label style={{ marginTop: 16 }}>🏁 To Destination</label>
          <input value={to} onChange={(e) => setTo(e.target.value)} />

          <div className="route-btn-group">
            <button className="show-btn" onClick={showRoute}>
              Show Route
            </button>
          </div>

          {safetyScore !== null && (
            <div
              className={`safety-box ${
                riskLevel === "Safe"
                  ? "safe-box"
                  : riskLevel === "Moderate Risk"
                  ? "moderate-box"
                  : "danger-box"
              }`}
            >
              <h3>🛡 Safety Score: {safetyScore}%</h3>
              <p><strong>Risk Level:</strong> {riskLevel}</p>
              <p><strong>Nearby Incidents:</strong> {nearbyDangers.length}</p>
            </div>
          )}
        </div>

        <div className="route-map-wrapper">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution="© OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {fromPos && (
              <Marker position={fromPos}>
                <Popup>From</Popup>
              </Marker>
            )}

            {toPos && (
              <Marker position={toPos}>
                <Popup>To</Popup>
              </Marker>
            )}

            {route.length > 1 && (
              <>
                <Polyline positions={route} color="#8b5cf6" />
                <FitBounds points={route} />
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default RoutePlanner;