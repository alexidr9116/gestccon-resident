import React from "react";

export default function ComputedVotes({ label = "", percantage = 0 }) {
  return (
    <div className="py-2 d-flex justify-content-center align-items-center">
      <p>{label}</p>
      <div className="progress mb-2">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: percantage }}
        ></div>
      </div>
    </div>
  );
}
