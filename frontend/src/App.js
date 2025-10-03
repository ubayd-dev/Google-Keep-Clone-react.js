import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Form from "./components/Form/Form.js";
import Notes from "./components/Notes/Notes.js";
import Modal from "./components/Modal/Modal.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";

const NOTES = [];
const App = () => {
  // state for auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
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
    <div>
      {/*If user is logged in, show Login */}
      {!isLoggedIn ? (
        showLogin ? (
          <Login setIsLoggedIn={setIsLoggedIn} setShowLogin={setShowLogin} />
        ) : (
          <Signup setShowLogin={setShowLogin} />
        )
      ) : (
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
      )}
    </div>
  );
};

export default App;
