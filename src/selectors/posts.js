const getVisiblePosts = (posts = [], { text, searchBy, sortBy }, category) =>
  posts
    .filter((post) => {
      if (searchBy === 'title') {
        return post.title.toLowerCase().includes(text.toLowerCase());
      } else if (searchBy === 'keyword') {
        return post.keywords.toLowerCase().includes(text.toLowerCase());
      } else if (searchBy === 'author') {
        return post.author.toLowerCase().includes(text.toLowerCase());
      }
    })
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return a.stars < b.stars ? 1 : -1;
      } else if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
    })
    .filter((post) => {
      if (category && category !== 'all') {
        return post.keywords.includes(category.toLowerCase());
      }
      return post;
    });
export default getVisiblePosts;
