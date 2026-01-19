import { Link } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import PageHeader from '../components/PageHeader';
import NonOptimizedDataFetching from '../components/NonOptimizedDataFetching';
import OptimizedDataFetching from '../components/OptimizedDataFetching';

function FetchingDataPage() {
  const renderMainContent = () => {
    return (
      <>
        <div className="component-demo">
          <h2>❌ Non-Optimized Data Fetching</h2>
          <NonOptimizedDataFetching />
        </div>

        <div className="component-demo">
          <h2>✅ Optimized Data Fetching (React Query)</h2>
          <OptimizedDataFetching />
        </div>
      </>
    );
  };

  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="back-link">
          ← Back to Home
        </Link>
      </nav>
      <PageHeader
        title="Fetching Data Optimization"
        description="Learn best practices for efficient data fetching with React Query"
      />
      <div className="content-section">
        <InfoBox
          title="🔄 What to observe:"
          description="Compare data fetching strategies and their performance impact"
          points={[
            '🚫 Non-Optimized: Waterfall requests, no caching, excessive refetching',
            '✅ Optimized: Parallel requests, smart caching with staleTime & gcTime',
            '🎯 Use "select" to transform data at query level',
            '⚡ Use "enabled" to prevent unnecessary requests',
            '📊 Open Console (F12) to see API call patterns',
            '🔄 Try selecting different users and refreshing the page',
          ]}
        />
        {renderMainContent()}

        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: 8,
          }}
        >
          <h3>📚 Best Practices Summary:</h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>
              <strong>staleTime:</strong> Waktu data dianggap "fresh" (tidak
              perlu refetch). Set sesuai kebutuhan bisnis.
            </li>
            <li>
              <strong>gcTime (cacheTime):</strong> Berapa lama data disimpan di
              cache setelah tidak digunakan.
            </li>
            <li>
              <strong>select:</strong> Transform data di query level agar
              component dapat data "siap pakai".
            </li>
            <li>
              <strong>enabled:</strong> Conditional fetching - hanya fetch jika
              parameter/kondisi terpenuhi.
            </li>
            <li>
              <strong>Parallel Fetching:</strong> Gunakan useQueries atau
              multiple useQuery untuk fetch bersamaan (hindari waterfall).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FetchingDataPage;
