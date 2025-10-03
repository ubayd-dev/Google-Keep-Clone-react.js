import React, { createContext, useState, useContext } from "react";
import api from "../services/axios.js";

// Create A Context
const FormContext = createContext();
export const FormProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // GET ALL NOTES
  const fetchNotes = async () => {
    setLoading(true);

    try {
      // HIT BACKEND CAL
      const res = await api.get("/notes");
      //   STORE RESPONSE IN STATE, UPDATE STATE
      setNotes(res.data);
    } catch (e) {
      console.error("Error fetching notes:", e);
    } finally {
      //   HIDE LOADING AFTER FETCH
      setLoading(false);
    }
  };
  const addNote = async ({ title, text }) => {
    try {
      const res = await api.post("/notes/create", { title, content: text });
      setNotes((prevNotes) => [...prevNotes, res.data]);
    } catch (e) {
      console.error("Error adding note:", e);
    }
  };
  const editNote = async ({ id, title, text }) => {
    try {
      const res = await api.patch(`/notes${id}`, { title, content: text });
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? res.data : note))
      );
    } catch (e) {
      console.error("Error editing note:", e);
    }
  };

  const deleteNote = async ({ id, title, text }) => {
    try {
      const res = await api.delete("/notes", { title, context: text });
    } catch (e) {
      console.error("Error deleting note");
    }
  };

  return (
    <FormContext.Provider
      value={{ notes, loading, fetchNotes, addNote, editNote, deleteNote }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
