const getVisiblePosts = (posts, { text, searchBy }) =>
  posts.filter((post) => {
    if (searchBy === 'title') {
      return post.title.toLowerCase().includes(text.toLowerCase());
    } else if (searchBy === 'keyword') {
      return post.keywords.toLowerCase().includes(text.toLowerCase());
    } else if (searchBy === 'author') {
      return post.author.toLowerCase().includes(text.toLowerCase());
    }
  });
export default getVisiblePosts;
