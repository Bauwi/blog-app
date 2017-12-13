export default (posts = [], categories) => {
  const res = categories.map((category) => {
    const arr = posts.filter(post => post.keywords.includes(category));
    const arrSorted = arr.sort((a, b) => a.stars < b.stars);

    return [arrSorted[0], arrSorted[1]];
  });
  if (res[0][0] === undefined) {
    return [];
  }
  return [res[0][0], res[1][0], res[2][0], res[0][1], res[1][1], res[2][1]];
  // return res;
};
