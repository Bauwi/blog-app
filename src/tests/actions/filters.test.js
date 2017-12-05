import {
  setTextFilter,
  searchByTitle,
  searchByKeyword,
  searchByAuthor,
  sortByDate,
  sortByStars
} from '../../actions/filters';

// SEARCH_BY_TITLE
test('should generate search by title action object', () => {
  const action = searchByTitle();

  expect(action).toEqual({ type: 'SEARCH_BY_TITLE' });
});

// SEARCH_BY_KEYWORD
test('should generate search by keyword action object', () => {
  const action = searchByKeyword();

  expect(action).toEqual({ type: 'SEARCH_BY_KEYWORD' });
});

// SEARCH_BY_AUTHOR
test('should generate search by author action object', () => {
  const action = searchByAuthor();

  expect(action).toEqual({ type: 'SEARCH_BY_AUTHOR' });
});

// SORT_BY_STARS
test('should generate sort by stars action object', () => {
  const action = sortByStars();

  expect(action).toEqual({ type: 'SORT_BY_STARS' });
});

// SORT_BY_DATE
test('should generate sort by date action object', () => {
  const action = sortByDate();

  expect(action).toEqual({ type: 'SORT_BY_DATE' });
});

// SET_TEXT_FILTER
test('should generate set text filter action object if text provided', () => {
  const action = setTextFilter('123abc');

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: '123abc'
  });
});

test('should generate set text filter action object if text is not provided', () => {
  const action = setTextFilter();

  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: ''
  });
});
