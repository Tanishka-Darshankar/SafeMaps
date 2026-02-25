import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { API_BASE } from "../config";

/* ✅ Emoji mapping */
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

/* ✅ Create emoji icon */
const createEmojiIcon = (emoji) =>
  L.divIcon({
    html: `<div style="font-size:28px;text-align:center;">${emoji}</div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

const DangerMap = ({ refreshTrigger }) => {
  const [dangers, setDangers] = useState([]);

  useEffect(() => {
    const fetchDangers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/dangers`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setDangers(data);
        } else if (data.dangers) {
          setDangers(data.dangers);
        } else {
          setDangers([]);
        }
      } catch (err) {
        console.error("Error fetching dangers:", err);
        setDangers([]);
      }
    };

    fetchDangers();
  }, [refreshTrigger]);

  /* ✅ FILTER INVALID LAT LNG */
  const validDangers = dangers.filter((d) => {
    const lat = Number(d.latitude);
    const lng = Number(d.longitude);

    return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
  });

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[17.3297, 76.8343]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {validDangers.map((danger) => {
          const lat = Number(danger.latitude);
          const lng = Number(danger.longitude);

          return (
            <Marker
              key={danger._id || `${lat}-${lng}-${danger.date}`}
              position={[lat, lng]}
              icon={createEmojiIcon(
                emojiIcons[danger.category] || "❓"
              )}
            >
              <Popup>
                <strong>{danger.category}</strong>
                <br />
                📍 {danger.location}
                <br />
                🕒 {new Date(danger.date).toLocaleString()}
                <br />
                📝 {danger.description}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default DangerMap;