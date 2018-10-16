const _ = require('lodash');
const api = require('../helpers/api');

// Action type constants
const INSERT = 'blog-frontend/notes/INSERT';
const CHANGE = 'blog-frontend/notes/CHANGE';
const REMOVE = 'blog-frontend/notes/REMOVE';
const take_NOTES= 'take-notes';

const initialState = {
  data: [

  ]
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

    case take_NOTES:{
      const newState= _.assign({}, state, {data: action.notes});
      return newState;

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
reducer.deleteNote = (noteId) => {
   return (dispatch) => {
    api.delete('/notes/' + noteId).then((note) => {
      // deletes local note.
      dispatch(reducer.removenote(noteId));
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
      dispatch(reducer.changenote(note));
      callback();
    }).catch(() => {
      alert('Failed to save note.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to create a note on the server and inserts it into the local note
// list if successful
reducer.createNote = (newnote, callback) => {
  return (dispatch) => {
    api.post('/notes', newnote).then((note) => {
      // This note is one that the store returns us! It has note id incremented to the next available id
      dispatch(reducer.insertnotes(note));
     // callback();
    }).catch(() => {
      alert('Failed to create note. Are all of the fields filled in correctly?');
    });
  };
};


// Action creators
/* *** TODO: Put action creators here *** */

// Export the action creators and reducer
module.exports = reducer;
