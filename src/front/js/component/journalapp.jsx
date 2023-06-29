import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import "../../styles/journalapp.css";

export const JournalApp = () => {
  const [date, setDate] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchedEntries, setSearchedEntries] = useState([]);
  const [isEntrySubmitted, setIsEntrySubmitted] = useState(false);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await fetch(
          "https://3001-4geeksacademy-mhm-wimp591pss4.ws-us101.gitpod.io/api/get_journal"
        );

        if (!response.ok) {
          throw new Error("Error retrieving journal entries");
        }

        const data = await response.json();
        setJournalEntries(data);
      } catch (error) {
        console.error("Error retrieving journal entries:", error);
      }
    };

    fetchJournalEntries();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    const data = { date, mood, content };

    try {
      const response = await fetch(
        "https://3001-4geeksacademy-mhm-wimp591pss4.ws-us101.gitpod.io/api/post_journal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error creating entry");
      }

      console.log("Entry created successfully!");

      // Reset the input fields
      setDate("");
      setMood("");
      setContent("");

      // Set the success flag
      setIsEntrySubmitted(true);
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const foundEntries = journalEntries.filter(
      (entry) => entry.date === searchDate
    );

    setSearchedEntries(foundEntries);
  };

  return (
    <div className="container">
      <h1>Welcome to the Journal Page!</h1>
      <Row>
        <Col md={6}>
          <form id="searchForm" className="mb-4">
            <div className="mb-3">
              <label htmlFor="searchDate" className="form-label">
                Search Date:
              </label>
              <input
                type="text"
                id="searchDate"
                name="searchDate"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" onClick={(e) => handleSearch(e)} className="btn btn-primary">
              Search
            </button>
          </form>
        </Col>
        <Col md={6}>
          {searchedEntries.length > 0 && (
            <Card>
              <CardBody>
                <h3>Search Result:</h3>
                {searchedEntries.map((entry) => (
                  <div className="search-result-entry" key={entry.id}>
                    <p>Date: {entry.date}</p>
                    <p>Mood: {entry.mood}</p>
                    <p>Content: {entry.content}</p>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
      <form id="journalForm" className="mb-4">
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <input
            type="text"
            id="date"
            name="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mood" className="form-label">
            Mood:
          </label>
          <input
            type="text"
            id="mood"
            name="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" onClick={(e) => handleClick(e)} className="btn btn-primary">
          Submit
        </button>
      </form>

      {isEntrySubmitted && (
        <div className="alert alert-success">
          <p>Journal entry submitted successfully!</p>
        </div>
      )}

    </div>
  );
};
