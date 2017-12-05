import filtersReducer from '../../reducers/filters';

const filtersReducerDefaultState = {
  text: '',
  searchBy: 'title',
  sortBy: 'stars'
};

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(filtersReducerDefaultState);
});

test('should set sortBy to date', () => {
  const state = filtersReducer(filtersReducerDefaultState, { type: 'SORT_BY_DATE' });
  expect(state.sortBy).toEqual('date');
});

test('should set sortBy to stars', () => {
  const state = filtersReducer(
    { ...filtersReducerDefaultState, sortBy: 'date' },
    { type: 'SORT_BY_STARS' }
  );
  expect(state.sortBy).toEqual('stars');
});

test('should set searchBy to keyword', () => {
  const state = filtersReducer(filtersReducerDefaultState, { type: 'SEARCH_BY_KEYWORD' });
  expect(state.searchBy).toEqual('keyword');
});

test('should set searchBy to author', () => {
  const state = filtersReducer(filtersReducerDefaultState, { type: 'SEARCH_BY_AUTHOR' });
  expect(state.searchBy).toEqual('author');
});

test('should set searchBy to title', () => {
  const state = filtersReducer(
    { ...filtersReducerDefaultState, searchBy: 'author' },
    { type: 'SEARCH_BY_TITLE' }
  );
  expect(state.searchBy).toEqual('title');
});

test('should set text filter', () => {
  const state = filtersReducer(filtersReducerDefaultState, {
    type: 'SET_TEXT_FILTER',
    text: '123abc'
  });
  expect(state.text).toEqual('123abc');
});
