import React, { useState } from "react";
import "./DangerForm.css";
import { API_BASE } from "../config";

const categories = [
  { value: "stalking", emoji: "🧍‍♀️", label: "Stalking" },
  { value: "verbal-abuse", emoji: "🙅‍♀️", label: "Verbal Abuse" },
  { value: "suspicious-activity", emoji: "🕵️‍♀️", label: "Suspicious Activity" },
  { value: "sexual-harassment", emoji: "🚫", label: "Sexual Harassment" },
  { value: "domestic-violence", emoji: "💢", label: "Domestic Violence" },
  { value: "physical-assault", emoji: "😟", label: "Physical Assault" },
  { value: "cyber-harassment", emoji: "📵", label: "Cyber Harassment" },
  { value: "other", emoji: "❓", label: "Other" },
];

const DangerForm = ({ onAddDanger }) => {
  const [category, setCategory] = useState("stalking");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getCoordinates = async (city, area) => {
    const query = encodeURIComponent(`${area}, ${city}, India`);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data || data.length === 0) {
      throw new Error("Location not found");
    }

    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !city || !area) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);

      const { latitude, longitude } = await getCoordinates(city, area);

      const newDanger = {
        category,
        location: `${area}, ${city}`,
        description: description || "N/A",
        latitude,
        longitude,
        date: new Date(),
      };

      // ✅ UPDATED BACKEND CALL
      const res = await fetch(`${API_BASE}/api/dangers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDanger),
      });

      if (!res.ok) {
        throw new Error("Failed to submit danger");
      }

      const savedDanger = await res.json();
      onAddDanger?.(savedDanger.danger);

      setCategory("stalking");
      setCity("");
      setArea("");
      setDescription("");

      alert("✅ Danger reported successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Location not found or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="danger-form-container">
      <form onSubmit={handleSubmit}>
        <label>Category:</label>
        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              className={`category-btn ${category === cat.value ? "active" : ""}`}
              onClick={() => setCategory(cat.value)}
            >
              <span className="emoji">{cat.emoji}</span>
              <span className="label">{cat.label}</span>
            </button>
          ))}
        </div>

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />

        <label>Area:</label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Enter area"
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details (optional)"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default DangerForm;