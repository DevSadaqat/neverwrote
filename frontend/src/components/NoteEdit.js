const React = require('react');
const _ = require('lodash');
const MarkdownEditor = require('./MarkdownEditor');

/*input className="form-control input-lg"*
 * A form for editing a Note.
 */
class NoteEdit extends React.Component {
  constructor(props) {
    super(props);
    const note = props.note || {};

    this.state = {
      title: note.title || ''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      // Creates a new Note object and saves it.
      const editedNote = _.assign({}, this.props.note, {
        title: this.state.title,
        content: this.state.content,
        notebookId: this.props.notebookId
      });
      this.props.onSave(editedNote);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    const onContentChange = (event) => {
      this.setState({ content: event.target.value });
    };
    return (
      <form className="Note">
        {/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Note title" onChange={onTitleChange}
          />
        </div>
        {/* Content field */}
        <div  className="form-group">
        <textarea
         className="form-control"
         style={{ height: 300 }}
         MarkdownEditor value={this.state.content} placeholder="Note Content" onChange={onContentChange}
         />

         </div>


        {/* Save button */}
        <button className="btn btn-default pull-right"
          onClick={submitAndStopEditing}>Save</button>
        {/* Cancel button */}
        <button className="btn btn-default pull-right"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}>Cancel </button>
      </form>
    );
  }
}

module.exports = NoteEdit;
