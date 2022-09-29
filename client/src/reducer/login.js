//In reducer first argument is the state and second argument is the action
// import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
export default (posts=[],action)=>{//post=[] because state must have a value, it cannot be null
    switch(action.type){
        case 'UPDATE':
            return posts.map((post) =>(post._id === action.payload._id ? action.payload : post));
        default:
            return posts;
    }
}
