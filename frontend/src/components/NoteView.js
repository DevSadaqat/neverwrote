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
const NoteContent =(props) =>{
  return <p>{props.content}</p>;
}
class  NoteView extends React.Component  {
    constructor(props) {
      super(props);
      this.state={open:false};
      this.handleContent=this.handleContent.bind(this);
    }

   handleContent(){
     const toggle= !this.state.open;
     this.setState({open:toggle})
  }
  render() {
  return (
    <li>
    <div className="blog-Note">
      <a className="blog-Note-title" role='button' onClick={this.handleContent}>{this.props.note.title}</a>
      {this.state.open && <NoteContent content={this.props.note.content}/>}
   <NoteMeta {...this.props} />
    </div>
    </li>
  );
  }
};



module.exports = NoteView;
