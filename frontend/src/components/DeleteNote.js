import React, { Component } from 'react';
import axios from 'axios';
// import Note from './Note';

class DeleteNote extends Component {
    constructor(props) {
        super(props);
        this.state={
            notes: [],
            title: "",
            content: "",
            url: ""
        }
    }

    componentDidMount() {
        this.getNotes();
    }
        getNotes = () => {
            axios
                .get(`http://localhost:3000/notes`)
                .then(response => {
                    this.setState({ notes: response.data })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        deleteNote = (notesId) => {
            axios
                .delete(`http://localhost:3000/notes/${notesId}`)
                .then(response => {
                    this.componentDidMount();
                    console.log(notesId);
                })
                .catch(err => {
                    console.log(err);
                })
                this.setState({
                    id: '',
                    title: '',
                    content: '',
                    url: ''
                })
        }
        render() {
            return (
                <div>
                    <button onClick={() => this.deleteNote(this.props.id)}> Delete Note </button>
                </div>
            );
        }
}

export default DeleteNote;