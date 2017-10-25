const filtersReducerDefaultState = {
  text: '',
  searchBy: 'title'
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      };
    case 'SEARCH_BY_KEYWORD':
      return {
        ...state,
        searchBy: 'keyword'
      };
    case 'SEARCH_BY_TITLE':
      return {
        ...state,
        searchBy: 'title'
      };
    case 'SEARCH_BY_AUTHOR':
      return {
        ...state,
        searchBy: 'author'
      };
    default:
      return state;
  }
};

export default filtersReducer;
