const filtersReducerDefaultState = {
  text: '',
  searchBy: 'title',
  sortBy: 'stars'
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
    case 'SORT_BY_STARS':
      return {
        ...state,
        sortBy: 'stars'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    default:
      return state;
  }
};

export default filtersReducer;
