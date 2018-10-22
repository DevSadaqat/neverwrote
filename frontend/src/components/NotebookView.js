const React = require('react');
const moment = require('moment');

/**
 * Render edit/delete buttons and Notebook timestamp.
 *
 * List of props: Notebook, time, onEdit, onDelete
 */
const NotebookMeta = (props) => {

//button to delete notes
  return (
    <div className="blog-Notebook-meta">

       {<a role="button" title="Delete Notebook"
        style={{ paddingRight: '8px' }}
        onClick={ props.onDelete }
      >
        <span className="fa fa-remove" />
      </a>}

    </div>
  );
};

/**
 * A read-only view  Notebook.
 * This is a stateless functional component.
 * It takes props as its args and returns what   <button onClick={submitAndStopEditing} className="btn btn-success pull-right"><i className="fa fa-check"></i></button>the render method would return.
 *
 * List of props: Notebook
 */
const NotebookView = (props) => {
  const showTheseNotes = ((event) => {
      event.preventDefault();
      props.showNotes(props.notebook.id);
  });

  return (
    <li>
    <div className="blog-Notebook">
      <a onClick={showTheseNotes}>
        <h2 className="blog-Notebook-title" >{props.notebook.title}</h2>
      </a>
   <NotebookMeta {...props} />

    </div>
    </li>
  );
};

module.exports = NotebookView;
