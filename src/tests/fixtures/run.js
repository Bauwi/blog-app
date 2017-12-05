const run = {
  posts: [
    {
      DBid: 'DBid1',
      content: {
        id: '1',
        title: 'Post 1 in Run',
        body: [{ text: 'This is the first Post in run', attributes: 'h1' }],
        keywords: 'red, green, blue',
        createdAt: 0,
        stars: 5,
        author: 'author1',
        authorId: 'author1Id',
        readingTime: 7,
        cover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
        miniCover: 'https://www.w3schools.com/w3css/img_fjords.jpg'
      },
      state: 'read'
    },
    {
      DBid: 'DBid2',
      content: {
        id: '2',
        title: 'Post 2 in Run',
        body: [{ text: 'This is the second Post in run', attributes: 'h2' }],
        keywords: 'cat, dog, fish',
        createdAt: -1500,
        stars: 25,
        author: 'author2',
        authorId: 'author2Id',
        readingTime: 12,
        cover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
        miniCover: 'https://www.w3schools.com/w3css/img_fjords.jpg'
      },
      state: 'unread'
    },
    {
      DBid: 'DBid3',
      content: {
        id: '3',
        title: 'Post 3 in Run',
        body: [{ text: 'blabla', attributes: 'h3' }],
        keywords: 'car, pool, cake',
        createdAt: 1000000,
        stars: 2,
        author: 'author3',
        authorId: 'author3Id',
        readingTime: 2,
        cover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
        miniCover: 'https://www.w3schools.com/w3css/img_fjords.jpg'
      },
      state: 'read'
    }
  ]
};

export const runAlt = {
  posts: [
    {
      DBid: 'DBid1',
      content: {
        id: '1',
        title: 'Post 1 in Run',
        body: [{ text: 'This is the first Post in run', attributes: 'h1' }],
        keywords: 'red, green, blue',
        createdAt: 0,
        stars: 5,
        author: 'author1',
        authorId: 'author1Id',
        readingTime: 7,
        cover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
        miniCover: 'https://www.w3schools.com/w3css/img_fjords.jpg'
      },
      state: 'read'
    },
    {
      DBid: 'DBid2',
      content: {
        id: '2',
        title: 'Post 2 in Run',
        body: [{ text: 'This is the second Post in run', attributes: 'h2' }],
        keywords: 'cat, dog, fish',
        createdAt: -1500,
        stars: 25,
        author: 'author2',
        authorId: 'author2Id',
        readingTime: 12,
        cover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
        miniCover: 'https://www.w3schools.com/w3css/img_fjords.jpg'
      },
      state: 'read'
    },
    {
      DBid: 'DBid3',
      content: {
        id: '3',
        title: 'Post 3 in Run',
        body: [{ text: 'blabla', attributes: 'h3' }],
        keywords: 'car, pool, cake',
        createdAt: 1000000,
        stars: 2,
        author: 'author3',
        authorId: 'author3Id',
        readingTime: 2,
        cover: 'https://www.w3schools.com/w3css/img_fjords.jpg',
        miniCover: 'https://www.w3schools.com/w3css/img_fjords.jpg'
      },
      state: 'read'
    }
  ]
};
export const posts = run.posts.map(post => post.content);

export default run;
