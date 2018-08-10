import React, { Component } from 'react';
import axios from 'axios';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        Title: "",
        Content: "",
        url: ""
    };
  }

  addNote = event => {
    // event.preventDefault();
    // add code to create the smurf using the api
    const newNote = {
      Title: this.state.title,
      Content: this.state.content,
      url: this.state.url
    };

    axios
      .post(`http://localhost:3000/notes`, newNote)
      .then(savedNote => {
        console.log(savedNote);
      })
      .catch(err => {
        console.log(err);
      })

    this.setState({
      Title: '',
      Content: '',
      url: ''
    });
  }

  deleteNote = noteId => {
    axios
      .delete(`http://localhost:3000/notes/${noteId}`)
      .then(response => {
        this.componentDidMount();
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="NoteForm">
        <form>
          <input
            onChange={this.handleInputChange}
            placeholder="Title"
            value={this.state.title}
            name="title"
            type="text"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Content"
            value={this.state.content}
            name="content"
            type="text"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="url"
            value={this.state.url}
            name="url"
            type="text"
          />
          <button onClick={this.addNote} value="submit" type="submit">Add Note</button>
        </form>
      </div>
    );
  }
}

export default NoteForm;
