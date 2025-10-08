import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Form from "./components/Form/Form.js";
import Notes from "./components/Notes/Notes.js";
import Modal from "./components/Modal/Modal.js";
import Login from "./components/Login/Login.js";

const NOTES = [];
const App = () => {
  // state for auth
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [showLogin, setShowLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => {
      const token = localStorage.getItem("token");
      const expiry = localStorage.getItem("tokenExpiry");
      if (!token || !expiry || Date.now() > Number(expiry)) {
        localStorage.clear();
        return false;
      }
      return true;
    }
    // localStorage.getItem("isLoggedIn") === "true"
  );
  // creating state for Notes
  const [notes, setNotes] = useState(NOTES);
  const [selectedNote, setSelectedNote] = useState({});
  // creating state for Modal using "is" for boolean
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  };

  const editNote = (editedNote) => {
    setNotes((prevNotes) => {
      const newArray = prevNotes.map((note) => {
        if (editedNote.id === note.id) {
          note.title = editedNote.title;
          note.text = editedNote.text;
        }
        return note;
      });
      return newArray;
    });
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => id !== note.id);
    });
  };

  const toggleModal = () => {
    // open or close the modal on previous state - setIsModalOpen
    setIsModalOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <Router>
      <Routes>
        {/*If user is logged in, show Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        {/* {!isLoggedIn ? (
        showLogin ? (
          <Login setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} />
        ) : (
          <Signup setShowLogin={setShowLogin} />
        )
      ) : ( */}

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <>
                <Navbar />
                <Sidebar />
                <Form addNote={addNote} />
                <Notes
                  notes={notes}
                  deleteNote={deleteNote}
                  toggleModal={toggleModal}
                  setSelectedNote={setSelectedNote}
                />
                {isModalOpen && (
                  <Modal
                    isModalOpen={isModalOpen}
                    selectedNote={selectedNote}
                    toggleModal={toggleModal}
                    editNote={editNote}
                  />
                )}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
