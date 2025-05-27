# Notes App - React
A simple React-based Notes App that allows users to add, edit, and delete notes. Notes are stored in browser memory using Zustand for global state management. The app also includes user login and logout functionality using localStorage.

## Features
- Add new notes with title and content
- Edit existing notes
- Delete notes
- Modal popup for adding and editing notes
- Highlights and flexible layout for a clean user interface
- Persistent user session with localStorage

## Installation and Running Locally
1. Clone the repository - https://github.com/ciddarthxtracut/cid-notessystem.git
2. Install dependencies - npm install
3. Start the development server - npm start
4. Open your browser at - http://localhost:3000

## Design Decisions and Trade-offs
- Added edit and delete functionality to improve user interaction.
- Used modal popups for better UX when managing notes.
- Applied minor color highlights for note display cards.
- Notes are stored only in browser memory, so they do not persist after clearing storage or reloading without enhancements like localStorage or backend integration.
- Zustand is used for simplicity and ease of state sharing across components.



 