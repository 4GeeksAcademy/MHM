import React, { useState } from "react";
import axios from "axios";

export const ResourcePage = () => {
  const [condition, setCondition] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [apiURL, setApiURL] = useState("");

  const searchCondition = () => {
    const apiUrl = `https://api.nhs.uk/mental-health/conditions/${condition}`;
    const baseURL = "https://www.nhs.uk/conditions/";

    axios
      .get(apiUrl, {
        headers: {
          "subscription-key": process.env.NHS_API_KEY,
        },
      })
      .then((response) => {
        setResult(response.data);
        setError("");
        setApiURL(baseURL + condition);
      })
      .catch((error) => {
        console.error(error);
        setResult(null);
        setError("An error occurred. Please try again.");
      });
  };

  const fetchAdditionalInfo = (extension) => {
    const apiUrl = `https://api.nhs.uk/mental-health/conditions/${condition}/${extension}`;

    axios
      .get(apiUrl, {
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

        {apiURL && (
          <p>
            Website URL:{" "}
            <a href={apiURL} target="_blank" rel="noopener noreferrer">
              {apiURL}
            </a>
          </p>
        )}

        {result && (
          <div>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
            {/* Display additional information as needed */}
            <button onClick={() => fetchAdditionalInfo("overview")}>
              Fetch Overview
            </button>
            <button onClick={() => fetchAdditionalInfo("symptoms")}>
              Fetch Symptoms
            </button>
            <button onClick={() => fetchAdditionalInfo("treatment")}>
              Fetch Treatment
            </button>
            {result.additionalInfo && (
              <div>
                <h3>{result.additionalInfo.title}</h3>
                <p>{result.additionalInfo.content}</p>
              </div>
            )}

          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
