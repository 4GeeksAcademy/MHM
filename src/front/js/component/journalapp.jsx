import React, { useState, useEffect } from "react";

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
          "https://3001-4geeksacademy-mhm-5wz03igkz37.ws-us100.gitpod.io/api/get_journal"
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
        "https://3001-4geeksacademy-mhm-5wz03igkz37.ws-us100.gitpod.io/api/post_journal",
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

    const foundEntries = journalEntries.filter((entry) => entry.date === searchDate);

    setSearchedEntries(foundEntries);
  };

  return (
    <div>
      <form id="journalForm">
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label htmlFor="mood">Mood:</label>
        <input
          type="text"
          id="mood"
          name="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button type="submit" onClick={(e) => handleClick(e)}>
          Submit
        </button>
      </form>

      {isEntrySubmitted && (
        <div>
          <p>Journal entry submitted successfully!</p>
        </div>
      )}

      <form id="searchForm">
        <label htmlFor="searchDate">Search Date:</label>
        <input
          type="text"
          id="searchDate"
          name="searchDate"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />

        <button type="submit" onClick={(e) => handleSearch(e)}>
          Search
        </button>
      </form>

      {searchedEntries.length > 0 && (
        <div>
          <h3>Search Result:</h3>
          {searchedEntries.map((entry) => (
            <div key={entry.id}>
              <p>Date: {entry.date}</p>
              <p>Mood: {entry.mood}</p>
              <p>Content: {entry.content}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
