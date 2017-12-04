const runReducerDefaultState = {
  isLoading: true, posts: [], hasErrored: false, current: {}
};

const runReducer = (state = runReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_POST_TO_RUN':
      return {
        ...state,
        posts: [...state.posts, action.post]
      };
    case 'REMOVE_POST_TO_RUN':
      return {
        ...state,
        posts: state.posts.filter(post => action.id !== post.content.id)
      };
    case 'SET_RUN_POSTS':
      return {
        ...state,
        posts: action.posts
      };
    case 'RUN_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'RUN_HAS_ERRORED':
      return {
        ...state,
        hasErrored: action.hasErrored
      };
    case 'SET_CURRENT_POST_RUN':
      return {
        ...state,
        current: state.posts.find(post => post.content.id === action.id)
      };
    case 'UPDATE_RUN_POST_TO_ALREADY_READ':
      return {
        ...state,
        current: { ...state.current, state: 'read' },
        posts: state.posts.map((post) => {
          if (post.content.id === action.id) {
            return {
              ...post,
              state: 'read'
            };
          }
          return post;
        })
      };
    case 'UPDATE_RUN_POST_TO_NOT_ALREADY_READ':
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.content.id === action.id) {
            return {
              ...post,
              state: 'unread'
            };
          }
          return post;
        })
      };
    case 'RESET_RUN':
      return {
        posts: []
      };
    case 'CLEAN_RUN':
      return {
        ...state,
        posts: state.posts.filter(post => post.state === 'unread')
      };
    default:
      return state;
  }
};

export default runReducer;
