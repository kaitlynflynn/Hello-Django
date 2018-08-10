import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      Title: "",
      Content: "",
      url: ""
    }
  }

  deleteNote = (noteId) => {
    axios
    .delete(`http://localhost:3000/notes/${noteId}`)
    .then(response => {
      this.componentDidMount();
    })
    .catch(err => {
      console.log(err);
    })
  }
  componentDidMount() {
    axios
      .get(`http://localhost:3000/notes`)
      .then(response => {
        this.setState({ notes: response.data })
    })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <NoteForm notes={this.state.notes} />
        <Notes notes={this.state.notes} />
      </div>
    );
  }
}

export default App;



// Original React Code that has no bugs! 
//---------------------------------------------
// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;