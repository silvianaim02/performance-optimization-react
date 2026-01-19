// Mock API untuk simulasi data fetching
// Menambahkan delay untuk simulasi network request

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulasi data users
const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Manager'][i % 3],
}));

// Simulasi data posts
const mockPosts = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  userId: (i % 50) + 1,
  title: `Post Title ${i + 1}`,
  body: `This is the content of post ${i + 1}. Lorem ipsum dolor sit amet.`,
  likes: Math.floor(Math.random() * 100),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

// Simulasi data comments
const mockComments = Array.from({ length: 500 }, (_, i) => ({
  id: i + 1,
  postId: (i % 100) + 1,
  author: `Commenter ${i + 1}`,
  text: `This is comment ${i + 1}`,
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

// API: Fetch all users
export const fetchUsers = async () => {
  console.log('🌐 API Call: fetchUsers');
  await delay(800); // Simulasi network delay
  return mockUsers;
};

// API: Fetch user by ID
export const fetchUserById = async (userId) => {
  console.log(`🌐 API Call: fetchUserById(${userId})`);
  await delay(600);
  const user = mockUsers.find((u) => u.id === parseInt(userId));
  if (!user) throw new Error('User not found');
  return user;
};

// API: Fetch posts (dengan optional userId filter)
export const fetchPosts = async (userId = null) => {
  console.log(`🌐 API Call: fetchPosts${userId ? `(userId=${userId})` : ''}`);
  await delay(1000);
  if (userId) {
    return mockPosts.filter((p) => p.userId === parseInt(userId));
  }
  return mockPosts;
};

// API: Fetch post by ID
export const fetchPostById = async (postId) => {
  console.log(`🌐 API Call: fetchPostById(${postId})`);
  await delay(700);
  const post = mockPosts.find((p) => p.id === parseInt(postId));
  if (!post) throw new Error('Post not found');
  return post;
};

// API: Fetch comments for a post
export const fetchCommentsByPostId = async (postId) => {
  console.log(`🌐 API Call: fetchCommentsByPostId(${postId})`);
  await delay(900);
  return mockComments.filter((c) => c.postId === parseInt(postId));
};

// API: Fetch user stats (simulasi data yang perlu di-transform)
export const fetchUserStats = async (userId) => {
  console.log(`🌐 API Call: fetchUserStats(${userId})`);
  await delay(1200);
  const userPosts = mockPosts.filter((p) => p.userId === parseInt(userId));
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);

  return {
    userId: parseInt(userId),
    totalPosts: userPosts.length,
    totalLikes,
    averageLikes: userPosts.length > 0 ? totalLikes / userPosts.length : 0,
    posts: userPosts,
    lastPostDate:
      userPosts.length > 0
        ? userPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )[0].createdAt
        : null,
  };
};
