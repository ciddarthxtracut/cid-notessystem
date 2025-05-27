import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: null,
  notes: [],
  login: (userData) => {
    set({ user: userData });
    localStorage.setItem("user", JSON.stringify(userData));
    get().loadNotes(userData.username);
  },

  logout: () => {
    set({ user: null, notes: [] });
    localStorage.removeItem("user");
  },

  loadUserFromStorage: () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      set({ user: parsedUser });
      get().loadNotes(parsedUser.username);
    }
  },

  loadNotes: (username) => {
    const notes = localStorage.getItem(`notes_${username}`);
    set({ notes: notes ? JSON.parse(notes) : [] });
  },

  addNote: (note) => {
    const { user, notes } = get();
    if (!user) return;
    const newNotes = [...notes, note];
    localStorage.setItem(`notes_${user.username}`, JSON.stringify(newNotes));
    set({ notes: newNotes });
  },

  updateNote: (updatedNote) => {
    const { user, notes } = get();
    if (!user) return;

    const newNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );
    localStorage.setItem(`notes_${user.username}`, JSON.stringify(newNotes));
    set({ notes: newNotes });
  },

  deleteNote: (id) => {
    const { user, notes } = get();
    if (!user) return;
    const newNotes = notes.filter(note => note.id !== id);
    localStorage.setItem(`notes_${user.username}`, JSON.stringify(newNotes));
    set({ notes: newNotes });
  },
}));
