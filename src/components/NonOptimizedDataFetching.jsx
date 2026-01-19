import { useState, useEffect } from 'react';
import { fetchUsers, fetchUserStats, fetchPosts } from '../utils/mockApi';

/**
 * ❌ NON-OPTIMIZED DATA FETCHING
 *
 * Masalah yang ditunjukkan:
 * 1. Tidak ada caching - setiap render/mount akan fetch ulang
 * 2. Waterfall fetching - request dilakukan berurutan, bukan paralel
 * 3. Tidak ada staleTime - data selalu dianggap stale
 * 4. Manual loading & error handling di setiap fetch
 * 5. Fetch dilakukan meskipun parameter belum siap (userId kosong)
 * 6. Data tidak di-transform, komponen harus olah sendiri
 */

function NonOptimizedDataFetching() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState('');

  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);

  const [errorUsers, setErrorUsers] = useState(null);
  const [errorPosts, setErrorPosts] = useState(null);
  const [errorStats, setErrorStats] = useState(null);

  // ❌ Fetch users - tidak ada caching, fetch ulang setiap mount
  useEffect(() => {
    const loadUsers = async () => {
      setLoadingUsers(true);
      setErrorUsers(null);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setErrorUsers(err.message);
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, []); // Akan fetch ulang setiap component mount

  // ❌ Fetch posts - waterfall: tunggu users selesai baru fetch posts
  useEffect(() => {
    if (users.length === 0) return; // Tunggu users dulu

    const loadPosts = async () => {
      setLoadingPosts(true);
      setErrorPosts(null);
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setErrorPosts(err.message);
      } finally {
        setLoadingPosts(false);
      }
    };
    loadPosts();
  }, [users]); // Dependency pada users = waterfall

  // ❌ Fetch user stats - fetch meskipun selectedUserId kosong
  useEffect(() => {
    // Tidak ada check enabled, akan tetap jalan meskipun userId kosong
    const loadStats = async () => {
      if (!selectedUserId) {
        setUserStats(null);
        return;
      }

      setLoadingStats(true);
      setErrorStats(null);
      try {
        const data = await fetchUserStats(selectedUserId);
        // ❌ Data mentah, tidak di-transform
        setUserStats(data);
      } catch (err) {
        setErrorStats(err.message);
      } finally {
        setLoadingStats(false);
      }
    };
    loadStats();
  }, [selectedUserId]);

  // ❌ Manual data transformation di component
  const displayStats = userStats
    ? {
        totalPosts: userStats.totalPosts,
        avgLikes: userStats.averageLikes.toFixed(1),
        total: userStats.totalLikes,
      }
    : null;

  return (
    <div
      style={{ padding: '1rem', border: '2px solid #ff6b6b', borderRadius: 8 }}
    >
      <h3>❌ Non-Optimized Fetching</h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        Buka Console untuk lihat API calls. Perhatikan:
        <br />
        • Setiap kali component mount, fetch ulang semua data (no cache)
        <br />
        • Request dilakukan waterfall (berurutan)
        <br />• Manual loading & error state untuk setiap request
      </p>

      <div style={{ marginTop: '1rem' }}>
        <h4>Users {loadingUsers && '(Loading...)'}</h4>
        {errorUsers && <p style={{ color: 'red' }}>{errorUsers}</p>}
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        >
          <option value="">-- Select User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <h4>Posts {loadingPosts && '(Loading...)'}</h4>
        {errorPosts && <p style={{ color: 'red' }}>{errorPosts}</p>}
        <p>Total posts: {posts.length}</p>

        {selectedUserId && (
          <>
            <h4>User Stats {loadingStats && '(Loading...)'}</h4>
            {errorStats && <p style={{ color: 'red' }}>{errorStats}</p>}
            {displayStats && (
              <div
                style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: 4,
                }}
              >
                <p>📝 Total Posts: {displayStats.totalPosts}</p>
                <p>❤️ Total Likes: {displayStats.total}</p>
                <p>📊 Average Likes: {displayStats.avgLikes}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NonOptimizedDataFetching;
