const readingsDefaultState = { isLoading: true };

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
      return {
        ...state,
        posts: action.posts
      };
    case 'READINGS_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'READINGS_HAS_ERRORED':
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    default:
      return state;
  }
};

export default readingsReducer;
