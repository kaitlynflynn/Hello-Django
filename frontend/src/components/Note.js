import React from 'react';
import './note.css'
// import DeleteNote from './DeleteNote'
import axios from 'axios';

const Note = props => {
  const deleteNote = () => {
    axios
      .delete(`http://localhost:3000/notes/${props.id}`)
  }

  return (
    <div key={props.id} className="note">
      <h3>{props.title}</h3>
      <strong>{props.content}</strong>
      <p>{props.url}</p>
      <button onClick={deleteNote}>Delete Note</button>
    </div>
  );
};

export default Note;