const React = require('react');
const moment = require('moment');

/**
 * Render edit/delete buttons and Note timestamp.
 *
 * List of props: Note, time, onEdit, onDelete
 */
const NoteMeta = (props) => {
  return (
    <div className="blog-Note-meta">

       {<a role="button" title="Delete Note"
        style={{ paddingRight: '8px' }}
        onClick={ props.onDelete }
      >
        <span className="fa fa-remove" />
      </a>}

    </div>
  );
};

/**
 * A read-only view  Note.
 * This is a stateless functional component.
 * It takes props as its args and returns what the render method would return.
 *
 * List of props: Note
 */
const NoteView = (props) => {
  return (
    <li>
    <div className="blog-Note">
      <h2 className="blog-Note-title" >{props.note.title}</h2>
   <NoteMeta {...props} />
    </div>
    </li>
  );
};

module.exports = NoteView;
