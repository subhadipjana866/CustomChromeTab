/**
 * NoteWidget.js
 * A note-taking widget with local storage persistence
 * Features: Create, view, and delete notes
 * Auto-deletes notes older than 30 days
 */

import React, { useState, useEffect } from "react";
import "./NoteWidget.css";

function NoteWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  
  const STORAGE_KEY = "chromeTabNotes";
  
  // Load notes from localStorage on component mount (only once)
  useEffect(() => {
    const loadNotesFromStorage = () => {
      try {
        const storedNotes = localStorage.getItem(STORAGE_KEY);
        
        if (storedNotes) {
          const parsedNotes = JSON.parse(storedNotes);
          
          // Ensure parsedNotes is an array
          if (!Array.isArray(parsedNotes)) {
            console.error("Stored notes is not an array:", parsedNotes);
            return [];
          }
          
          // Filter out notes older than 30 days
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          const filteredNotes = parsedNotes.filter(note => {
            const noteDate = new Date(note.date);
            return !isNaN(noteDate.getTime()) && noteDate > thirtyDaysAgo;
          });
          
          // If notes were filtered out, update localStorage
          if (filteredNotes.length !== parsedNotes.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
          }
          
          console.log("Loaded notes from localStorage:", filteredNotes);
          return filteredNotes;
        }
        return [];
      } catch (error) {
        console.error("Error loading notes from localStorage:", error);
        return [];
      }
    };
    
    const loadedNotes = loadNotesFromStorage();
    setNotes(loadedNotes);
    
    // Register event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY) {
        const updatedNotes = loadNotesFromStorage();
        setNotes(updatedNotes);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to save notes to localStorage
  const saveNotesToStorage = (notesToSave) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notesToSave));
      console.log("Saved notes to localStorage:", notesToSave);
    } catch (error) {
      console.error("Error saving notes to localStorage:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Create a new note
  const handleCreateNote = () => {
    if (noteTitle.trim() === "") {
      alert("Please enter a note title");
      return;
    }

    const newNote = {
      id: Date.now(),
      title: noteTitle,
      body: noteBody,
      date: new Date().toISOString()
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    
    setNoteTitle("");
    setNoteBody("");
    setIsCreating(false);
  };

  // Delete a note
  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
    
    if (activeNote === id) {
      setActiveNote(null);
    }
  };

  // Toggle widget expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // Reset active states when collapsing
    if (isExpanded) {
      setActiveNote(null);
      setIsCreating(false);
    }
  };

  return (
    <div className={`note-widget ${isExpanded ? 'expanded' : ''}`}>
      <div className="note-widget-header" onClick={toggleExpand}>
        <span className="material-icons">note</span>
        <h3>Notes {notes.length > 0 ? `(${notes.length})` : ""}</h3>
        <span className="material-icons">
          {isExpanded ? 'expand_more' : 'expand_less'}
        </span>
      </div>

      {isExpanded && (
        <div className="note-widget-content">
          <div className="note-actions">
            <button 
              className="create-note-btn" 
              onClick={() => {
                setIsCreating(true);
                setActiveNote(null);
              }}
            >
              <span className="material-icons">add</span> New Note
            </button>
          </div>

          {isCreating ? (
            <div className="note-editor">
              <input
                type="text"
                placeholder="Note Title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                className="note-title-input"
              />
              <textarea
                placeholder="Write your note here..."
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                className="note-body-input"
              />
              <div className="note-editor-actions">
                <button onClick={() => setIsCreating(false)}>Cancel</button>
                <button onClick={handleCreateNote}>Save</button>
              </div>
            </div>
          ) : activeNote !== null ? (
            <div className="note-viewer">
              {(() => {
                const note = notes.find(n => n.id === activeNote);
                return note ? (
                  <>
                    <h4 className="view-note-title">{note.title}</h4>
                    <div className="view-note-date">{formatDate(note.date)}</div>
                    <p className="view-note-body">{note.body}</p>
                    <div className="view-note-actions">
                      <button onClick={() => setActiveNote(null)}>Back</button>
                      <button 
                        className="delete-note-btn" 
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="empty-notes">Note not found</div>
                );
              })()}
            </div>
          ) : (
            <div className="note-list">
              {notes.length === 0 ? (
                <div className="empty-notes">No notes yet. Create one!</div>
              ) : (
                notes.map(note => (
                  <div 
                    key={note.id} 
                    className="note-list-item" 
                    onClick={() => setActiveNote(note.id)}
                  >
                    <div className="note-list-title">{note.title}</div>
                    <div className="note-list-date">{formatDate(note.date)}</div>
                    <div className="note-list-preview">
                      {note.body.substring(0, 60)}
                      {note.body.length > 60 ? '...' : ''}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NoteWidget;