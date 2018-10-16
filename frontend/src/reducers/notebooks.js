const _ = require('lodash');
const api = require('../helpers/api');

const notesActionCreator = require('./notes');

// Action type constants
const INSERT = 'blog-frontend/Notebooks/INSERT';
const CHANGE = 'blog-frontend/Notebooks/CHANGE';
const REMOVE = 'blog-frontend/Notebooks/REMOVE';


const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded Notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded Notebook' },
  ],

};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case INSERT: {
      // Add in the new Notebooks
      const unsortedNotebooks = _.concat(state.data, action.notebooks);
      const data = _.orderBy(unsortedNotebooks, 'createdAt','desc');

      // Return updated state
      return _.assign({}, state, { data} );
    }
      // Changes a single Notebook's data in the local store
    case CHANGE: {
      const data = _.clone(state.data);
      const changedIndex = _.findIndex(state.data, {id: action.notebook.id })
      data[changedIndex] = action.notebook;
      return _.assign({}, state, { data });
    }

    // Removes a single Notebook from the visible Notebook list
    case REMOVE: {
      const data = _.reject(state.data, {id: action.id});
        return _.assign({}, state, { data });
    }


    default: return state;
  }
}

// Now we will define a whole bunch of action creators

// Inserts Notebooks into the Notebook list
reducer.insertNotebooks = (notebooks) => {

  return { type: INSERT, notebooks };
};

// Removes a Notebook from the visible Notebook list
reducer.removeNotebook = (id) => {
  return { type: REMOVE, id };
};

// Changes local Notebook data
reducer.changeNotebook = (notebook) => {
  return { type: CHANGE, notebook };
};


// Attempts to delete a Notebook from the server and removes it from the visible
// Notebook list if successful
reducer.deleteNotebook = (notebookId) => {
   return (dispatch) => {
    api.delete('/notebooks/' + notebookId).then((notebook) => {
      // deletes local Notebook.
      dispatch(reducer.removeNotebook(notebookId));
    }).catch(() => {
      alert('Failed to delete Notebook');
    });
  };
};

// Attempts to update a Notebook on the server and updates local Notebook data if
// successful
reducer.saveNotebook = (editedNotebook, callback) => {
  return (dispatch) => {
    api.put('/notebooks/' + editedNotebook.id, editedNotebook).then((notebook) => {
      // Saves local Notebook.
      dispatch(reducer.changeNotebook(notebook));
      callback();
    }).catch(() => {
      alert('Failed to save Notebook.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to create a Notebook on the server and inserts it into the local Notebook
// list if successful
reducer.createNotebook = (newNotebook, callback) => {
  return (dispatch) => {
    api.post('/notebooks', newNotebook).then((notebook) => {
      // This Notebook is one that the store returns us! It has Notebook id incremented to the next available id
      dispatch(reducer.insertNotebooks(notebook));
     // callback();
    }).catch(() => {
      alert('This error');
    });
  };
};

reducer.showNotes = (id)=>{
    return (dispatch)=>{
        dispatch(notesActionCreator.getNotes(id));
    };
};



// Action creators
/* *** TODO: Put action creators here *** */

// Export the action creators and reducer
module.exports = reducer;
