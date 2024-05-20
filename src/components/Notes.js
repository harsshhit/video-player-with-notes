import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Notes = ({ notes, addNote, deleteNote, editNote, jumpToTimestamp }) => {
  const [noteContent, setNoteContent] = useState("");
  const [editingTimestamp, setEditingTimestamp] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleAddNote = () => {
    if (noteContent) {
      addNote(noteContent);
      setNoteContent("");
    }
  };

  const handleEditNote = () => {
    if (editContent && editingTimestamp !== null) {
      editNote(editingTimestamp, editContent);
      setEditingTimestamp(null);
      setEditContent("");
    }
  };

 return (
   <div className="p-4 bg-gray-800 dark:bg-gray-900 rounded-3xl shadow-lg">
     <h2 className="text-2xl font-semibold mb-4 text-white">My Notes</h2>
     <div className="mb-4">
       <ReactQuill
         value={noteContent}
         onChange={setNoteContent}
         className="mb-2 "
       />
       <button
         onClick={handleAddNote}
         className="bg-blue-500 text-white rounded-3xl px-4 py-2 hover:bg-blue-600 transition"
       >
         Add Note
       </button>
     </div>
     <ul className="space-y-4">
       {notes.map((note, index) => (
         <li
           key={index}
           className="bg-gray-700 dark:bg-gray-800 p-4 rounded-3xl shadow-sm"
         >
           <span
             onClick={() => jumpToTimestamp(note.timestamp)}
             className="cursor-pointer text-blue-400"
           >
             {new Date(note.timestamp * 1000).toISOString().substr(11, 8)} -{" "}
             {note.date}
           </span>
           <div
             dangerouslySetInnerHTML={{ __html: note.content }}
             className="mt-2 mb-4 text-white"
           />
           <button
             onClick={() => deleteNote(note.timestamp)}
             className="bg-red-800 text-white rounded-3xl px-4 py-2 mr-2 hover:bg-red-900 transition"
           >
             Delete
           </button>
           <button
             onClick={() => {
               setEditingTimestamp(note.timestamp);
               setEditContent(note.content);
             }}
             className="bg-green-800 text-white rounded-3xl px-4 py-2 hover:bg-green-900 transition"
           >
             Edit
           </button>
         </li>
       ))}
     </ul>
     {editingTimestamp !== null && (
       <div className="mt-6 p-4 bg-gray-700 dark:bg-gray-800 rounded-3xl shadow-md">
         <h3 className="text-xl font-semibold mb-2 text-white">Edit Note</h3>
         <ReactQuill
           value={editContent}
           onChange={setEditContent}
           className="mb-2"
         />
         <button
           onClick={handleEditNote}
           className="bg-green-500 text-white rounded-3xl px-4 py-2 mr-2 hover:bg-green-600 transition"
         >
           Save Changes
         </button>
         <button
           onClick={() => setEditingTimestamp(null)}
           className="bg-gray-500 text-white rounded-3xl px-4 py-2 hover:bg-gray-600 transition"
         >
           Cancel
         </button>
       </div>
     )}
   </div>
 );

};

export default Notes;
