const postsReducerDefaultState = { posts: [] };

const postsReducer = (state = postsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, action.post]
      };

    case 'REMOVE_POST':
      return { ...state, posts: state.posts.filter(post => post.id !== action.id) };
    case 'EDIT_POST':
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.id) {
            return {
              ...post,
              ...action.updates
            };
          }
          return post;
        })
      };
    case 'SET_POSTS':
      return { ...state, posts: [...state.posts, ...action.posts] };
    case 'POSTS_IS_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'POSTS_HAS_ERRORED':
      return { ...state, hasErrored: action.hasErrored };
    case 'UP_POST_STAR':
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.id) {
            return {
              ...post,
              stars: action.stars
            };
          }
          return post;
        })
      };

    default:
      return state;
  }
};

export default postsReducer;
