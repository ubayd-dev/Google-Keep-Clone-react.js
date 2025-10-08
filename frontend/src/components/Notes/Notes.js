import "./Notes.css";
import Note from "./Note.js";
import { useFormContext } from "../../context/FormContext.js";
import { useEffect } from "react";

const Notes = ({ toggleModal, setSelectedNote}) => {
    // const [notes, setNotes] = useState([]);
  const {notes, fetchNotes } =
    useFormContext();

  useEffect(() => {
    fetchNotes();
//       .then((res) => {
// setNotes(res)
//      });
  }, []);

  return (
    <div className="notes">
      {notes?.length === 0 ? (
        <p>Notes you add appear here.</p>
      ) : (
        notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            // deleteNote={deleteNote}
            toggleModal={toggleModal}
            setSelectedNote={setSelectedNote}
          />
        ))
      )}
    </div>
  );
};

export default Notes;
