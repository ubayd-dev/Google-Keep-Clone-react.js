import React, { useState } from "react";
import { useFormContext } from "../../context/FormContext.js";
import ReminderModal from "../Reminder/ReminderModal.js";

export default function Note({ note, toggleModal, setSelectedNote }) {
  // const { note, toggleModal, setSelectedNote } = props;
  const { deleteNote } = useFormContext();
  const [isHover, setIsHover] = useState(false);
  const [openReminder, setOpenReminder] = useState(false);
  // const note = { id: "", title: "", text: "" };

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const hoverOverHandler = () => {
    setIsHover(true);
  };

  const hoverOutHandler = () => {
    setIsHover(false);
  };

  const deleteHandler = () => {
    console.log(note.id);

    deleteNote({ id: note.id });
  };

  return (
    <>
      <div
        className="note"
        id={note.id}
        onClick={noteClickHandler}
        onMouseOver={hoverOverHandler}
        onMouseOut={hoverOutHandler}
      >
        {isHover && (
          <span className="material-symbols-outlined check-circle">
            check_circle
          </span>
        )}

        <div className="title">{note.title}</div>
        <div className="text">{note.content || note.text}</div>
        {/* inline styles */}
        <div
          className="note-footer"
          style={{ visibility: isHover ? "visible" : "hidden" }}
        >
          <div className="tooltip" onClick={() => setOpenReminder(true)}>
            <span className="material-symbols-outlined hover small-icon">
              add_alert
            </span>
            <span className="tooltip-text">Remind me</span>
          </div>
          <div className="tooltip">
            <span className="material-symbols-outlined hover small-icon">
              person_add
            </span>
            <span className="tooltip-text">Collaborator</span>
          </div>
          <div className="tooltip">
            <span className="material-symbols-outlined hover small-icon">
              palette
            </span>
            <span className="tooltip-text">Change Color</span>
          </div>
          <div className="tooltip">
            <span className="material-symbols-outlined hover small-icon">
              image
            </span>
            <span className="tooltip-text">Add Image</span>
          </div>
          <div className="tooltip archive" onClick={deleteHandler}>
            <span className="material-symbols-outlined hover small-icon">
              archive
            </span>
            <span className="tooltip-text">Archive</span>
          </div>
          <div className="tooltip">
            <span className="material-symbols-outlined hover small-icon">
              more_vert
            </span>
            <span className="tooltip-text">More</span>
          </div>
        </div>
      </div>

      {/*Reminder Modal*/}
      {openReminder && (
        <ReminderModal
          open={openReminder}
          onClose={() => setOpenReminder(false)}
          note={note}
        />
      )}
    </>
  );
}
