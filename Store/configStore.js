import {legacy_createStore as createStore ,combineReducers} from 'redux'


import listCommandeReducer from './reducers/listCommadeReducer'

const rootReducer = combineReducers(
    {listCommande:listCommandeReducer}
);

const configStore = () =>{
    return createStore(rootReducer)
}


export default configStore;