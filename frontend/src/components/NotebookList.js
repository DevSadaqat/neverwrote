const React = require('react');
const ReactRedux = require('react-redux');
const Notebook = require('./Notebook');
const NotebookNew = require('./NotebookNew')

const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/
class NotebookList extends React.Component {
  constructor(props) {
    super(props);
    // Set initial internal state for this component
    this.state = { loading: false };
  }
  render() {
    const createNotebookListItem = (notebook) => {
      return (
        <Notebook
        key={notebook.id}
        notebook={notebook}
        title ={notebook.title}
        saveNotebook={this.props.saveNotebook}
        deleteNotebook={this.props.deleteNotebook}
        showNotes={this.props.showNotes}
        />
      );
    };

    return (
      <div>
        <h2>Notebooks</h2>
         <NotebookNew
            createNotebook={this.props.createNotebook}
          />
        <ul>
        {this.props.notebooks.data.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  state => ({
    notebooks: state.notebooks
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
