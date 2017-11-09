const postsReducerDefaultState = [];

const postsReducer = (state = postsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [...state, action.post];
    case 'REMOVE_POST':
      return state.filter(post => post.id !== action.id);
    case 'EDIT_POST':
      return state.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            ...action.updates
          };
        }
        return post;
      });
    case 'SET_POSTS':
      return action.posts;
    case 'ADD_POST_STAR':
      return state.map((post) => {
        if (post.id === action.id) {
          return {
            ...post,
            stars: action.stars
          };
        }
        return post;
      });
    default:
      return state;
  }
};

export default postsReducer;
