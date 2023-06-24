import React, { useState } from "react";
import axios from "axios";

export const ResourcePage = () => {
  const [condition, setCondition] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const searchCondition = () => {
    axios
      .get(`https://api.nhs.uk/mental-health/conditions/${condition}`, {
        headers: {
          "subscription-key": process.env.NHS_API_KEY,
        },
      })
      .then((response) => {
        setResult(response.data);
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setResult(null);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div>
      <h1>Condition Search</h1>
      <input
        type="text"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder="Enter a condition"
      />
      <button onClick={searchCondition}>Search</button>

      <div id="result">
        {result && (
          <div>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
            {/* Display additional information as needed */}
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
