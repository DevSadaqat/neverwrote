const React = require('react');


const NotebookView = require('./NotebookView');
const NotebookEdit = require('./NotebookEdit');

class Notebook extends React.Component {
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
      this.props.saveNotebook(editedPost, (err) => {
        if(!err) closeEdit();
      });
    };

    const deleteThisNotebook = () => {
    this.props.deleteNotebook(this.props.notebook.id);
    };


    // TODO Section 8: Add code for delete

    if(this.state.editing) {
      // Render component for editing the Notebook
      return (
        <NotebookEdit
          notebook={this.props.notebook}
          onSave={saveEdit}
          onCancel={closeEdit}
        />
      );
    }
    // Render read-only view of the Notebook
    // TODO Section 8: add code for delete
    return (
      <NotebookView
        notebook={this.props.notebook}
        onDelete={deleteThisNotebook}
        onEdit={openEdit}
        showNotes={this.props.showNotes}
      />
    );
  }
}

// Export the Notebook component
module.exports = Notebook;
