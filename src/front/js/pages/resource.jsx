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
        <h1 className="resource_welcome">Welcome to the Resource Page!</h1>
        <h2 className="resource-page-title">Condition Search</h2>
        <div className="container">
          <form>
            <input
              type="text"
              className="form-control"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Enter a condition"
            />
            <div className="search-button">
              <button
                className="button"  
                type="button"
                onClick={searchCondition}
              >
                Search
              </button>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
          <div id="result">
            {apiURL && (
              <p>
                Website URL:{" "}
                <a href={apiURL} target="_blank" rel="noopener noreferrer" className="website-link">
                  {apiURL}
                </a>
              </p>
            )}
            {result && (
              <div>
                <h2>{result.name}</h2>
                <p>{result.description}</p>
                <div className="search-button">
                  <button
                    className="button"
                    onClick={() => fetchAdditionalInfo("overview")}
                  >
                    Fetch Overview
                  </button>
                  <button
                    className="button"
                    onClick={() => fetchAdditionalInfo("symptoms")}
                  >
                    Fetch Symptoms
                  </button>
                  <button
                    className="button"
                    onClick={() => fetchAdditionalInfo("treatment")}
                  >
                    Fetch Treatment
                  </button>
                </div>
                {result.additionalInfo && (
                  <div>
                    <h3>{result.additionalInfo.title}</h3>
                    <p>{result.additionalInfo.content}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
