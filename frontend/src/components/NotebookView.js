const React = require('react');
const moment = require('moment');

/**
 * Render edit/delete buttons and Notebook timestamp.
 *
 * List of props: Notebook, time, onEdit, onDelete
 */
const NotebookMeta = (props) => {
  return (
    <div className="blog-Notebook-meta">


      {<a role="button" title="Edit Notebook"
        style={{ paddingRight: '8px' }}
        onClick={ props.onEdit }
      >
        <span className="fa fa-remove" />
      </a>}
    </div>
  );
};

/**
 * A read-only view  Notebook.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props: Notebook
 */
const NotebookView = (props) => {
  return (
    <div className="blog-Notebook">
      <h2 className="blog-Notebook-title">{props.notebook.title}</h2>

     <NotebookMeta {...props} />

      <p className = "blog-Notebook-content">{props.notebook.content}</p>
    </div>
  );
};

module.exports = NotebookView;
