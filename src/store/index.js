import { legacy_createStore as createStore, combineReducers } from 'redux';
import contactReducer from '../store/reducer/contactReducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const reducers = combineReducers({
    contactReducer: contactReducer 
});

const configureStore = createStore(reducers, applyMiddleware(thunk));
export default configureStore;