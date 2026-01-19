import { useState } from 'react';
import { useQuery, useQueries } from '@tanstack/react-query';
import { fetchUsers, fetchUserStats, fetchPosts } from '../utils/mockApi';

/**
 * ✅ OPTIMIZED DATA FETCHING dengan React Query
 *
 * Best Practices yang diterapkan:
 * 1. ✅ staleTime & gcTime (cacheTime) - kontrol kapan data dianggap stale dan berapa lama di-cache
 * 2. ✅ select - transform data di query level, bukan di component
 * 3. ✅ enabled - conditional fetching, hanya fetch jika parameter siap
 * 4. ✅ Parallel fetching - gunakan useQueries untuk fetch paralel
 * 5. ✅ Automatic caching, loading, error handling
 * 6. ✅ Automatic refetch on stale
 */

function OptimizedDataFetching() {
  const [selectedUserId, setSelectedUserId] = useState('');

  // ✅ 1. PARALLEL FETCHING: Users & Posts fetch bersamaan (tidak waterfall)
  const queries = useQueries({
    queries: [
      {
        queryKey: ['users'],
        queryFn: fetchUsers,
        // ✅ staleTime: data dianggap fresh selama 2 menit
        staleTime: 2 * 60 * 1000,
        // ✅ gcTime: data tetap di cache selama 5 menit
        gcTime: 5 * 60 * 1000,
        // ✅ select: transform data agar component dapat data siap pakai
        select: (data) => {
          // Transform: sort by name dan tambah label
          return data
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((user) => ({
              ...user,
              label: `${user.name} (${user.role})`,
            }));
        },
      },
      {
        queryKey: ['posts'],
        queryFn: fetchPosts,
        staleTime: 3 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        // ✅ select: hanya ambil data yang diperlukan
        select: (data) => ({
          total: data.length,
          recent: data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5),
        }),
      },
    ],
  });

  const [usersQuery, postsQuery] = queries;

  // ✅ 2. ENABLED: User stats hanya di-fetch jika selectedUserId ada
  const userStatsQuery = useQuery({
    queryKey: ['userStats', selectedUserId],
    queryFn: () => fetchUserStats(selectedUserId),
    // ✅ enabled: query tidak akan jalan jika selectedUserId kosong
    enabled: !!selectedUserId,
    staleTime: 1 * 60 * 1000, // 1 menit
    gcTime: 3 * 60 * 1000,
    // ✅ select: transform data supaya component dapat data siap pakai
    select: (data) => ({
      totalPosts: data.totalPosts,
      totalLikes: data.totalLikes,
      avgLikes: data.averageLikes.toFixed(1),
      lastPost: data.lastPostDate
        ? new Date(data.lastPostDate).toLocaleDateString()
        : 'N/A',
    }),
  });

  return (
    <div
      style={{ padding: '1rem', border: '2px solid #51cf66', borderRadius: 8 }}
    >
      <h3>✅ Optimized Fetching (React Query)</h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>
        Buka Console untuk lihat API calls. Perhatikan:
        <br />
        • Users & Posts di-fetch PARALEL (bersamaan)
        <br />
        • Data di-cache, tidak fetch ulang jika masih fresh (staleTime)
        <br />
        • User stats hanya fetch jika user dipilih (enabled)
        <br />• Data sudah di-transform (select), component terima data siap
        pakai
      </p>

      <div style={{ marginTop: '1rem' }}>
        <h4>
          Users {usersQuery.isLoading && '(Loading...)'}
          {usersQuery.isFetching && !usersQuery.isLoading && '(Refetching...)'}
        </h4>
        {usersQuery.isError && (
          <p style={{ color: 'red' }}>{usersQuery.error.message}</p>
        )}

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
          disabled={usersQuery.isLoading}
        >
          <option value="">-- Select User --</option>
          {usersQuery.data?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.label}
            </option>
          ))}
        </select>

        <h4>
          Posts {postsQuery.isLoading && '(Loading...)'}
          {postsQuery.isFetching && !postsQuery.isLoading && '(Refetching...)'}
        </h4>
        {postsQuery.isError && (
          <p style={{ color: 'red' }}>{postsQuery.error.message}</p>
        )}
        {postsQuery.data && (
          <div>
            <p>📊 Total posts: {postsQuery.data.total}</p>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>
              Recent: {postsQuery.data.recent.length} posts loaded
            </p>
          </div>
        )}

        {selectedUserId && (
          <>
            <h4>
              User Stats {userStatsQuery.isLoading && '(Loading...)'}
              {userStatsQuery.isFetching &&
                !userStatsQuery.isLoading &&
                '(Refetching...)'}
            </h4>
            {userStatsQuery.isError && (
              <p style={{ color: 'red' }}>{userStatsQuery.error.message}</p>
            )}
            {userStatsQuery.data && (
              <div
                style={{
                  background: '#e7f5ff',
                  padding: '1rem',
                  borderRadius: 4,
                }}
              >
                <p>📝 Total Posts: {userStatsQuery.data.totalPosts}</p>
                <p>❤️ Total Likes: {userStatsQuery.data.totalLikes}</p>
                <p>📊 Average Likes: {userStatsQuery.data.avgLikes}</p>
                <p>📅 Last Post: {userStatsQuery.data.lastPost}</p>
              </div>
            )}
          </>
        )}
      </div>

      <div
        style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: '#fff3bf',
          borderRadius: 4,
          fontSize: '0.85rem',
        }}
      >
        <strong>💡 Tips:</strong>
        <br />
        • Pilih user, lalu pilih user lain - perhatikan stats tidak fetch ulang
        jika masih dalam staleTime
        <br />• Refresh halaman - data dari cache langsung muncul (background
        refetch)
      </div>
    </div>
  );
}

export default OptimizedDataFetching;
