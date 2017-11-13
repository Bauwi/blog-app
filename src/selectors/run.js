const getRunPosts = (posts = [], run) => run.map(read => posts.find(post => post.id === read.id));
export default getRunPosts;
