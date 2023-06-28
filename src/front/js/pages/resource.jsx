import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../component/navbar";

import "../../styles/ResourcePage.css";

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
    <div className="resource-page">
    <Navbar />

      <div className="resource-content">
        <h1>Welcome to the Resource Page!</h1>
        <h2 className="resource-page-title">Condition Search</h2>
        <div className="container">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Enter a condition"
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                type="button"
                onClick={searchCondition}
              >
                Search
              </button>
            </div>
          </div>

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
                <button
                  className="btn btn-success"
                  onClick={() => fetchAdditionalInfo("overview")}
                >
                  Fetch Overview
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => fetchAdditionalInfo("symptoms")}
                >
                  Fetch Symptoms
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => fetchAdditionalInfo("treatment")}
                >
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
      </div>
    </div>
  );
};