import React from "react";

export const JournalApp = () => {
    return (
    <form id="journalForm">
      <label htmlFor="date">Date:</label>
      <input type="text" id="date" name="date" required />
      
      <label htmlFor="mood">Mood:</label>
      <input type="text" id="mood" name="mood" />
      
      <label htmlFor="content">Content:</label>
      <textarea id="content" name="content" required></textarea>
      
      <button type="submit">Submit</button>
    </form>
  );
}
