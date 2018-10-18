const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
const INSERT = 'blog-frontend/notes/INSERT';
const CHANGE = 'blog-frontend/notes/CHANGE';
const REMOVE = 'blog-frontend/notes/REMOVE';
const GET_NOTES= 'take-notes';
const SET_ACTIVE = 'blog-frontend/Notebooks/SET_ACTIVE';

const initialState = {
  data: [
    // {
    //   id: 1,
    //   title: 'New note',
    //   content: 'Content',
    //   notebookId: 1
    // }

],
 activeNotebookId: -1

};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case INSERT: {

      // Add in the new notes
      const unsortednotes = _.concat(state.data, action.notes);

      const data = _.orderBy(unsortednotes, 'createdAt','desc');

      // Return updated state
      return _.assign({}, state, { data} );
    }
      // Changes a single note's data in the local store
    case CHANGE: {
      const data = _.clone(state.data);
      const changedIndex = _.findIndex(state.data, {id: action.note.id })
      data[changedIndex] = action.note;
      return _.assign({}, state, { data });
    }

    // Removes a single note from the visible note list
    case REMOVE: {
      const data = _.reject(state.data, {id: action.id});
        return _.assign({}, state, { data });
    }

    case GET_NOTES:{


      return  _.assign({}, state, {activeNotebookId: action.id, data: action.notes});

    }
    default: return state;
  }
}

// Now we will define a whole bunch of action creators

// Inserts notes into the note list
reducer.insertNotes = (notes) => {
  return { type: INSERT, notes };
};

// Removes a note from the visible note list
reducer.removeNote = (id) => {
  return { type: REMOVE, id };
};

// Changes local note data
reducer.changeNote = (note) => {
  return { type: CHANGE, note };
};



// Attempts to delete a note from the server and removes it from the visible
// note list if successful
reducer.deleteNote = (id) => {
   return (dispatch) => {
    api.delete('/notes/' + id).then((note) => {
      // deletes local note.
      dispatch(reducer.removeNote(id));
    }).catch(() => {
      alert('Failed to delete note');
    });
  };
};

// Attempts to update a note on the server and updates local note data if
// successful
reducer.saveNote = (editednote, callback) => {
  return (dispatch) => {
    api.put('/notes/' + editednote.id, editednote).then((note) => {
      // Saves local note.
      dispatch(reducer.changeNote(note));
      callback();
    }).catch(() => {
      alert('Failed to save note.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to create a note on the server and inserts it into the local note
// list if successful
reducer.createNote = (newNote, callback) => {
  return (dispatch) => {
    api.post('/notes', newNote).then((note) => {
      // This note is one that the store returns us! It has note id incremented to the next available id
      dispatch(reducer.insertNotes(note));
      callback();
    }).catch(() => {
      alert('Failed to create note. Are all of the fields filled in correctly?');
    });
  };
};

reducer.getNotes = (id)=> {
  return (dispatch)=>{
    api.get('/notebooks/'+id + '/notes').then((notes)=>{
      dispatch({type: GET_NOTES,notes, id});
    }).catch(err=>alert(err.message));
  };
};



// Export the action creators and reducer
module.exports = reducer;
