const readingsDefaultState = [];

const readingsReducer = (state = readingsDefaultState, action) => {
  switch (action.type) {
    case 'SET_ONE_POST':
      return {
        ...state,
        current: action.post
      };
    case 'SET_SPECIFIC_USER_POSTS':
      return {
        ...state,
        currentUserPosts: action.posts
      };
    case 'SET_POSTS_SAMPLE':
      return action.posts;
    default:
      return state;
  }
};

export default readingsReducer;
