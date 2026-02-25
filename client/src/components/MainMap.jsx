import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { API_BASE } from "../config";

// ✅ Emoji mapping
const emojiIcons = {
  stalking: "🧍‍♀️",
  "verbal-abuse": "🙅‍♀️",
  "suspicious-activity": "🕵️‍♀️",
  "sexual-harassment": "🚫",
  "domestic-violence": "💢",
  "physical-assault": "😟",
  "cyber-harassment": "📵",
  other: "❓",
};

// ✅ Emoji icon creator
const createEmojiIcon = (emoji) =>
  L.divIcon({
    html: `<div style="font-size:28px;text-align:center;">${emoji}</div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

const MainMap = ({ refreshTrigger }) => {
  const [dangers, setDangers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDangers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/dangers`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch");
        }

        if (Array.isArray(data)) setDangers(data);
        else if (data.dangers) setDangers(data.dangers);
        else setDangers([]);
      } catch (err) {
        console.error("Failed to fetch dangers:", err);
        setDangers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDangers();
  }, [refreshTrigger]);

  const filteredDangers = (dangers || []).filter(
    (d) => d.latitude && d.longitude
  );

  return (
    <div className="map-wrapper">
      {loading && <p>Loading map...</p>}
      {!loading && (
        <MapContainer
          center={[17.3297, 76.8343]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {filteredDangers.map((danger) => (
            <Marker
              key={danger._id || `${danger.latitude}-${danger.longitude}`}
              position={[danger.latitude, danger.longitude]}
              icon={createEmojiIcon(
                emojiIcons[danger.category] || "❓"
              )}
            >
              <Popup>
                <strong>{danger.category}</strong>
                <br />
                {danger.description || "No details"}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default MainMap;