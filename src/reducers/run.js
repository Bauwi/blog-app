const runReducerDefaultState = [];

const runReducer = (state = runReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST_TO_RUN':
      return [...state, action.post];
    case 'REMOVE_POST_TO_RUN':
      return state.filter(post => action.id !== post.content.id);
    case 'SET_RUN_POSTS':
      return action.posts;
    default:
      return state;
  }
};

export default runReducer;
