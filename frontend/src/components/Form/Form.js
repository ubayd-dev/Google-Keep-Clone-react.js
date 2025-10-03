import React, { useState } from "react";
import "./Form.css";
import { useFormContext } from "../../context/FormContext.js";
//  import axios

const Form = ({ edit, selectedNote, toggleModal }) => {
  const { addNote, editNote } = useFormContext();
  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [isActiveForm, setIsActiveForm] = useState(edit);

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
    console.log("title :", event.target.value);
  };
  const textChangeHandler = (event) => {
    setText(event.target.value);
    console.log("text :", event.target.value);

    setIsActiveForm(true);
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!edit) {
      await addNote({ title, text });
      setIsActiveForm(false);
    } else {
      await editNote({ id: selectedNote.id, title, text });
      toggleModal();
    }

    //   setIsActiveForm(false);
    // } else {
    //   props.editNote({
    //     id: selectedNote.id,
    //     title,
    //     text,
    //   })
    //   toggleModal();

    setTitle("");
    setText("");
  };

  const formClickHandler = () => {
    // create a state
    setIsActiveForm(true);
  };

  return (
    // Based on the state, output create form
    <div>
      <div className="form-container active-form" onClick={formClickHandler}>
        <form
          onSubmit={submitFormHandler}
          className={isActiveForm ? "form" : ""}
        >
          {isActiveForm && (
            <input
              onChange={titleChangeHandler}
              value={title}
              type="text"
              className="note-title"
              placeholder="Title"
            />
          )}

          <input
            onChange={textChangeHandler}
            value={text}
            type="text"
            className="note-text"
            placeholder="Take a note..."
          />
          {isActiveForm ? (
            <div className="form-actions">
              <div className="icons">
                <div className="tooltip">
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
                <div className="tooltip">
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
                <div className="tooltip">
                  <span className="material-symbols-outlined hover small-icon">
                    undo
                  </span>
                  <span className="tooltip-text">Undo</span>
                </div>
                <div className="tooltip">
                  <span className="material-symbols-outlined hover small-icon">
                    redo
                  </span>
                  <span className="tooltip-text">Redo</span>
                </div>
              </div>
              <button type="submit" className="close-btn">
                close
              </button>
            </div>
          ) : (
            <div className="form-actions">
              <div className="tooltip">
                <span className="material-symbols-outlined hover">
                  check_box
                </span>
                <span className="tooltip-text">New List</span>
              </div>{" "}
              <div className="tooltip">
                <span className="material-symbols-outlined hover">brush</span>{" "}
                <span className="tooltip-text">New Drawing</span>{" "}
              </div>{" "}
              <div className="tooltip">
                {" "}
                <span className="material-symbols-outlined hover">image</span>
                <span className="tooltip-text">New Image</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;

//       {!isActiveForm ? (
//         <div
//           className="form-container inactive-form"
//           onClick={formClickHandler}
//         >
//           <form>
//             <input
//               type="text"
//               className="note-text"
//               placeholder="Take a note..."
//             />
//             <div className="form-actions">
//               <div className="tooltip">
//                 <span className="material-symbols-outlined hover">
//                   check_box
//                 </span>
//                 <span className="tooltip-text">New List</span>
//               </div>
//               <div className="tooltip">
//                 <span className="material-symbols-outlined hover">brush</span>
//                 <span className="tooltip-text">New Drawing</span>
//               </div>
//               <div className="tooltip">
//                 <span className="material-symbols-outlined hover">image</span>
//                 <span className="tooltip-text">New Image</span>
//               </div>
//             </div>
//           </form>
//         </div>
// ) : (
//      )}
