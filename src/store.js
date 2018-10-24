import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// reducers

const firebaseConfig = {
  // firebase api config
  apiKey: 'AIzaSyD05iLTa0S7EBxMU6f1lbknJPfMzKDHBF0',
  authDomain: 'reactclientpanel-4318f.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-4318f.firebaseio.com',
  projectId: 'reactclientpanel-4318f',
  storageBucket: 'reactclientpanel-4318f.appspot.com',
  messagingSenderId: '895190793716'
};

const rrfConfig = {
  // react-redux-firebase with firestore config
  userProfile: 'users',
  useFirestoreForProfile: true
};

// initialize firebase & firestore + settings
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// initial state
const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
