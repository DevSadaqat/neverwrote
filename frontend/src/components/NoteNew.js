const React = require('react');
const NoteEdit = require('./NoteEdit');

/**
 * A button which expands into a form for writing a new Note.
 */
class NoteNew extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { editing: false };
  }

  render() {
    const openEdit = () => {
      this.setState({ editing: true });
    };

    const closeEdit = () => {
      this.setState({ editing: false });
    };

    const createNote = (newNote) => {
      this.props.createNote(newNote, (err) => {
        if(!err) closeEdit();
      });
    };

    const saveEdit = (editedNote) => {
      this.props.saveNote(editedNote, (err) => {
        if(!err) closeEdit();
      });
    };

    if(this.state.editing) {
      // Render component for editing the Note
      return (
        <NoteEdit
          Note={this.props.Note}
           onSave={createNote}
          onCancel={closeEdit}
          //on save = on Create
        />
      );
    }
    // TODO Section 7: Write code to switch to edit mode when editing is clicked

    return (
      <button className="blog-load-more btn btn-primary btn-lg"
        onClick={ openEdit }
      >
      Write Note here
      </button>

    );
  }
}

module.exports = NoteNew;
