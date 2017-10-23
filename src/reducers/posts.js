const postsReducerDefaultState = [];

const postsReducer = (state = postsReducerDefaultState, action) => {
  switch(action.type) {
    case 'ADD_POST':
      return [
        ...state,
        action.post
      ]; 
    default:
      return state;
  }
}; 

export default postsReducer;