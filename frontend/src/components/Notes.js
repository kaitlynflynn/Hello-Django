import React, { Component } from 'react';
// import axios from 'axios';
import Note from './Note';
// import DeleteNote from './DeleteNote';

class Notes extends Component {

  render() {
    return (
      <div className="Notes">
        <h1>Django Notes</h1>
        <ul>
          {this.props.notes.map(note => {
            return (
              
              <Note
                title={note.title}
                id={note.id}
                content={note.content}
                url={note.url}
                key={note.id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Notes;