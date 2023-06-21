import React, { useState, useEffect } from "react";

export const JournalApp = () => {
  const [date, setDate] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await fetch(
          "https://3001-4geeksacademy-mhm-v1jlej15f2d.ws-us100.gitpod.io/api/journal"
        );

        if (!response.ok) {
          throw new Error("Error retrieving journal entries");
        }

        const data = await response.json();
        setJournalEntries(data);
      } catch (error) {
        console.error("Error retrieving journal entries:", error);
        // Handle error cases, such as displaying an error message
      }
    };

    fetchJournalEntries();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    const data = { date, mood, content };

    try {
      const response = await fetch(
        "https://3001-4geeksacademy-mhm-v1jlej15f2d.ws-us100.gitpod.io/api/journal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the Content-Type header to application/json
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error creating entry");
      }

      console.log("Entry created successfully!");
      // Handle any further actions after the API call, if needed
    } catch (error) {
      console.error("Error creating entry:", error);
      // Handle error cases, such as displaying an error message
    }
  };

  return (
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
  );
};
