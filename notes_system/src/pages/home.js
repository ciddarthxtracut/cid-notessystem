import React, { useEffect, useState } from "react";
import { useUserStore } from "../store";
import { useNavigate, Link } from "react-router-dom";
import Model from "../component/model";
import "../component/model.css";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const notes = useUserStore((state) => state.notes);
  const logout = useUserStore((state) => state.logout);
  const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);
  const addNote = useUserStore((state) => state.addNote);
  const updateNote = useUserStore((state) => state.updateNote);
  const deleteNote = useUserStore((state) => state.deleteNote);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!noteTitle.trim() || !noteContent.trim()) {
      alert("Title and content are required");
      return;
    }

    if (editingNote) {
      updateNote({ id: editingNote.id, title: noteTitle, content: noteContent , modifiedAt: new Date().toISOString()  });
    } else {
        const newNote = {
            id: Date.now(),
            title: noteTitle,
            content: noteContent,
            modifiedAt: new Date().toISOString(),
        };
      addNote(newNote);
    }

    resetForm();
  };

  const handleEdit = (note) => {
        setEditingNote(note);
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setIsModalOpen(true);
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
    <div className="">
        <div className="body-container-1">
            <h1>Hello {user.name}</h1>
            <button onClick={() => setIsModalOpen(true)}>{editingNote ? "Edit Note" : "Add Note"}</button>
            <button onClick={handleLogout}>Logout </button>
        </div>
        <div className="body-container-2">
            <h2>Your Notes Please!</h2>
            {notes.length === 0 && <p> No notes yet. Add one below!</p>}
        </div>

        <ul style={{ display: "flex" , gap: "30px" , flexWrap: "wrap"}}>
            {notes.map(note => (
            <li key={note.id} style={{border: "1px solid gray", marginBottom: 10, padding: 10 , width: 250 , background: "#A1CCD2"}}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <button onClick={() => handleEdit(note)}>Edit</button>{" "}
                <button onClick={() => handleDelete(note.id)}>Delete</button>
                <div className="modified-time">
                    {note.modifiedAt && ( <p>Last Modified: {new Date(note.modifiedAt).toLocaleString()}</p>)}
                </div>
            </li>
            ))}
        </ul>

        <Model isOpen={isModalOpen} onClose={resetForm}>
        <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" value={noteTitle} onChange={e => setNoteTitle(e.target.value)} required/><br />
            <textarea placeholder="Content" value={noteContent} onChange={e => setNoteContent(e.target.value)} required /><br />
            <div>
                <button type="submit">{editingNote ? "Update" : "Add"}</button>
                <button type="button" onClick={resetForm} style={{ marginLeft: "20px" }}>Cancel</button>
            </div>
        </form>
        </Model>
        </div>
  );
}
