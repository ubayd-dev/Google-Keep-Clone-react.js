import React, { createContext, useContext, useState } from "react";
import api from "../services/axios.js";

const ReminderContext = createContext();
export const ReminderProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);

  const createReminder = async ({ noteId, remindAt, email, title }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/reminder",
        {
          noteId,
          remindAt,
          email,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReminders((prev) => [...prev, res.data]);
      return res.data;
    } catch (e) {
      console.error("Error creating reminder: ", e);
    }
  };

  return (
    <ReminderContext.Provider value={{ reminders, createReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};

export const useReminderContext =()=> useContext(ReminderContext);
