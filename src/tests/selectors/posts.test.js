import selectPosts from '../../selectors/posts';
import { posts } from '../fixtures/run';

const defaultFilters = {
  text: '',
  searchBy: 'title',
  sortBy: 'date'
};

test('should filter by title value', () => {
  const result = selectPosts(posts, { ...defaultFilters, text: 'Post 3' });
  expect(result).toEqual([posts[2]]);
});

test('should filter by author value', () => {
  const filters = { ...defaultFilters, text: 'author2', searchBy: 'author' };
  const result = selectPosts(posts, filters);
  expect(result).toEqual([posts[1]]);
});

test('should filter by keyword value', () => {
  const filters = { ...defaultFilters, text: 'pool', searchBy: 'keyword' };
  const result = selectPosts(posts, filters);
  expect(result).toEqual([posts[2]]);
});

test('should order by date', () => {
  const result = selectPosts(posts, defaultFilters);
  expect(result).toEqual([posts[2], posts[0], posts[1]]);
});

test('should order by stars', () => {
  const filters = { ...defaultFilters, sortBy: 'stars' };
  const result = selectPosts(posts, filters);
  expect(result).toEqual([posts[1], posts[0], posts[2]]);
});
