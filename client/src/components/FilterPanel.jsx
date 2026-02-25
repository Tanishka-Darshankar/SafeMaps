import React, { useState } from "react";
import "./DangerForm.css";
import { API_BASE } from "../config";

const FilterPanel = ({ onAddDanger }) => {
  const [category, setCategory] = useState("stalking");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location || !description) {
      alert("Please fill in all fields");
      return;
    }

    const newDanger = {
      category,
      location,
      description,
      date: new Date(),
    };

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE}/api/dangers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDanger),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit danger");
      }

      onAddDanger?.(data);

      setCategory("stalking");
      setLocation("");
      setDescription("");

      alert("Danger report submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit danger report");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="danger-form" onSubmit={handleSubmit}>
      <h3>Report a Danger</h3>

      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="stalking">🧍‍♀️ Stalking</option>
          <option value="verbal-abuse">🙅‍♀️ Verbal Abuse</option>
          <option value="suspicious-activity">🕵️‍♀️ Suspicious Activity</option>
          <option value="sexual-harassment">🚫 Sexual Harassment</option>
          <option value="domestic-violence">💢 Domestic Violence</option>
          <option value="physical-assault">😟 Physical Assault</option>
          <option value="cyber-harassment">📵 Cyber Harassment</option>
        </select>
      </label>

      <label>
        Location (Area/City):
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          required
        />
      </label>

      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the danger"
          required
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
};

export default FilterPanel;