import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    userLoginReducer,
} from "./reducer/login";
import {
    AddNotifierReducer
}
from './reducer/AddNotifierReducer';

import {
    UpdateUserReducer
}
from './reducer/updateUserReducer';

import {
    UpdateNotifierReducer
}
from './reducer/AddNotifierReducer';


const reducer = combineReducers({
    userLogin: userLoginReducer,
    addNotifier:AddNotifierReducer,
    updateUser:UpdateUserReducer,
    updateNotifier:UpdateNotifierReducer
});

const initialState = {
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
