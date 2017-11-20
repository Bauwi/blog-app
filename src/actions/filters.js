export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

export const searchByKeyword = () => ({
  type: 'SEARCH_BY_KEYWORD'
});

export const searchByTitle = () => ({
  type: 'SEARCH_BY_TITLE'
});

export const searchByAuthor = () => ({
  type: 'SEARCH_BY_AUTHOR'
});

export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

export const sortByStars = () => ({
  type: 'SORT_BY_STARS'
});

export const resetFilters = () => ({
  type: 'RESET_FILTERS'
});
