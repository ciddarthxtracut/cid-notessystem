import React, { useEffect, useState } from "react";
import { useUserStore } from "../store";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const notes = useUserStore((state) => state.notes);
  const logout = useUserStore((state) => state.logout);
  const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);
  const addNote = useUserStore((state) => state.addNote);
  const updateNote = useUserStore((state) => state.updateNote);
  const deleteNote = useUserStore((state) => state.deleteNote);

  const navigate = useNavigate();

  const [editingNote, setEditingNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  if (!user) {
    return (
      <div>
        <h1>Please <Link to="/login">Login </Link>to view your notes</h1>
      </div>
    );
  }

  const resetForm = () => {
    setEditingNote(null);
    setNoteTitle("");
    setNoteContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!noteTitle.trim() || !noteContent.trim()) {
      alert("Title and content are required");
      return;
    }

    if (editingNote) {
      updateNote({ id: editingNote.id, title: noteTitle, content: noteContent });
    } else {
        const newNote = {
            id: Date.now(),
            title: noteTitle,
            content: noteContent,
        };
      addNote(newNote);
    }

    resetForm();
  };

  const handleEdit = (note) => {
        setEditingNote(note);
        setNoteTitle(note.title);
        setNoteContent(note.content);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Hello {user.name}</h1>
      <button onClick={handleLogout}>Logout </button>

      <h2>Your Notes Please!</h2>

      {notes.length === 0 && <p> No notes yet. Add one below!</p>}

      <ul>
        {notes.map(note => (
          <li key={note.id} style={{border: "1px solid gray", marginBottom: 10, padding: 10}}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note)}>Edit</button>{" "}
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title"value={noteTitle} onChange={e => setNoteTitle(e.target.value)} required />
        <br />
        <textarea placeholder="Content" value={noteContent} onChange={e => setNoteContent(e.target.value)} required/>
        <br />
        <button type="submit">{editingNote ? "Update" : "Add"}</button>
        {editingNote && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
    </div>
  );
}
