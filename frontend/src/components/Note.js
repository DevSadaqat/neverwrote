const React = require('react');


const NoteView = require('./NoteView');
const NoteEdit = require('./NoteEdit');

class Note extends React.Component {
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

     const saveEdit = (editedPost) => {
      this.props.saveNote(editedPost, (err) => {
        if(!err) closeEdit();
      });
    };

    const deleteThisNote = () => {
    this.props.deleteNote(this.props.Note.id);
    };


    // TODO Section 8: Add code for delete

    if(this.state.editing) {
      // Render component for editing the Note
      return (
        <NoteEdit
          Note={this.props.Note}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }
    // Render read-only view of the Note
    // TODO Section 8: add code for delete
    return (
      <NoteView
        Note={this.props.Note}
        onDelete={deleteThisNote}
        onEdit={openEdit}
      />
    );
  }
}

// Export the Note component
module.exports = Note;
