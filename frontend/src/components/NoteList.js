const React = require('react');
const ReactRedux = require('react-redux');
const Note = require('./Note');
const NoteNew = require('./NoteNew')

const createActionDispatchers = require('../helpers/createActionDispatchers');
const NotesActionCreators = require('../reducers/notes');

/*
  *** TODO: Build more functionality into the NoteList component ***
  At the moment, the NoteList component simply renders the Notes
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NoteList extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { loading: false };
  }
  render() {
    const createNoteListItem = (note) => {
      return (
        <Note
          key={note.id}
          note={note}
          title ={note.title}
          saveNote={this.props.saveNote}
          deleteNote={this.props.deleteNote}
        />
      );
    };

    if (this.props.notes.activeNotebookId != -1) {
    return (
      <div>
        <h2>Notes</h2>
         <NoteNew
            createNote={this.props.createNote}
            notebookId={this.props.notes.activeNotebookId}
          />
        <ul>
        {this.props.notes.data.map(createNoteListItem)}
        </ul>
      </div>
    );
  }
  else return (<div></div>);
  }
 }





const NoteListContainer = ReactRedux.connect(
  state => ({
    notes: state.notes
  }),
  createActionDispatchers(NotesActionCreators)
)(NoteList);

module.exports = NoteListContainer;
