const usersReducerDefaultState = [];

const usersReducer = (state = usersReducerDefaultState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.updates }
      };
    case 'SET_AUTHOR':
      return {
        ...state,
        author: action.author
      };
    case 'ADD_USER_STAR':
      return {
        ...state,
        author: {
          ...state.author,
          stars: action.nextStars
        }
      };
    case 'SET_USER_PREFERENCES':
      return {
        ...state,
        preferences: action.preferences
      };
    default:
      return state;
  }
};

export default usersReducer;
