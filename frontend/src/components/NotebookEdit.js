const React = require('react');
const _ = require('lodash');

/**
 * A form for editing a Notebook.
 */
class NotebookEdit extends React.Component {
  constructor(props) {
    super(props);
    const Notebook = props.Notebook || {};

    this.state = {
      title: Notebook.title || ''
    };
  }

  render() {
    const revertAndStopEditing = (event) => {
      event.preventDefault();
      this.props.onCancel();
    };

    const submitAndStopEditing = (event) => {
      event.preventDefault();
      // Creates a new Notebook object and saves it.
      const editedNotebook = _.assign({}, this.props.Notebook, {
        title: this.state.title
      });
      this.props.onSave(editedNotebook);
    };

    const onTitleChange = (event) => {
      this.setState({ title: event.target.value });
    };

    return (
      <form className="Notebook">
        {/* Title field */}
        <div className="form-group">
          <input className="form-control input-lg" value={this.state.title}
            placeholder="Notebook title" onChange={onTitleChange}
          />
        </div>

        {/* button to save the note */}
        <button onClick={submitAndStopEditing} className="btn btn-success pull-right"><i className="fa fa-check"></i></button>
        {/*  button to cancel the note */}
        <button className="btn btn-danger pull-right"
          style={{ marginRight: '12px' }}
          onClick={revertAndStopEditing}>Cancel
        </button>
      </form>
    );
  }
}

module.exports = NotebookEdit;
