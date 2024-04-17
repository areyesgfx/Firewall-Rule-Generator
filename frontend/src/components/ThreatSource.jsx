import React from "react";
import "../styles/ThreatSource.css";

function ThreatSource({ threatSource, onDelete }) {
  return (
    <div>
      <p className="threatSource-name">{threatSource.name}</p>
      <p className="threatSource-url">{threatSource.url}</p>
      <button
        className="delete-button"
        onClick={() => onDelete(threatSource.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default ThreatSource;
