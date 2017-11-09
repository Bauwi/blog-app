const usersReducerDefaultState = [];

const usersReducer = (state = usersReducerDefaultState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return state.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            ...action.updates
          };
        }
        return user;
      });
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
