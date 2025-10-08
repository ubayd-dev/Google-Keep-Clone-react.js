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
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token found, redirect to login");
      }
      // HIT BACKEND CAL
      const res = await api.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Backend returned:", res.data);

      //   STORE RESPONSE IN STATE, UPDATE STATE
      setNotes(res.data);
      return res.data;
    } catch (e) {
      console.error("Error fetching notes:", e);
    } finally {
      //   HIDE LOADING AFTER FETCH
      setLoading(false);
    }
  };
  const addNote = async ({ title, text, token }) => {
    try {
      const res = await api.post(
        "/notes/create",
        { title, content: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prevNotes) => [...prevNotes, res.data]);
    } catch (e) {
      console.error("Error adding note:", e);
    }
  };
  const editNote = async ({ id, title, text }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.patch(
        `/notes/${id}`,
        { title, content: text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? res.data : note))
      );
    } catch (e) {
      console.error("Error editing note:", e);
    }
  };

  const deleteNote = async ({ id }) => {
    try {
      // send token that stored in localStorage
      const token = localStorage.getItem("token");
      const res = await api.delete(`/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Note deleted:", res.data);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
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
