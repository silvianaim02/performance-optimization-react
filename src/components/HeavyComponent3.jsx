import { useState, useMemo } from 'react';

// Simulate a heavy component with charts/visualization
function HeavyComponent3() {
  const [filter, setFilter] = useState('all');

  // Simulate heavy data for visualization
  const chartData = useMemo(() => {
    return Array.from({ length: 365 }, (_, i) => ({
      day: i + 1,
      value: Math.sin(i / 30) * 50 + Math.random() * 20 + 50,
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    }));
  }, []);

  const filteredData = useMemo(() => {
    if (filter === 'all') return chartData;
    return chartData.filter((d) => d.category === filter);
  }, [chartData, filter]);

  const stats = useMemo(() => {
    const values = filteredData.map((d) => d.value);
    return {
      avg: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2),
      min: Math.min(...values).toFixed(2),
      max: Math.max(...values).toFixed(2),
      count: values.length,
    };
  }, [filteredData]);

  console.log('HeavyComponent3 rendered');

  return (
    <div
      style={{ padding: '2rem', background: '#f0fff0', borderRadius: '8px' }}
    >
      <h2>📊 Heavy Component 3</h2>
      <p>This component simulates data visualization with 365 data points.</p>
      <p>Loaded separately to keep the main bundle small.</p>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            background: filter === 'all' ? '#667eea' : 'white',
            color: filter === 'all' ? 'white' : 'black',
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter('A')}
          style={{
            background: filter === 'A' ? '#667eea' : 'white',
            color: filter === 'A' ? 'white' : 'black',
          }}
        >
          Category A
        </button>
        <button
          onClick={() => setFilter('B')}
          style={{
            background: filter === 'B' ? '#667eea' : 'white',
            color: filter === 'B' ? 'white' : 'black',
          }}
        >
          Category B
        </button>
        <button
          onClick={() => setFilter('C')}
          style={{
            background: filter === 'C' ? '#667eea' : 'white',
            color: filter === 'C' ? 'white' : 'black',
          }}
        >
          Category C
        </button>
      </div>

      <div
        style={{
          marginTop: '1rem',
          background: 'white',
          padding: '1rem',
          borderRadius: '4px',
        }}
      >
        <h4>Statistics:</h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            textAlign: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>Count</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {stats.count}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>Average</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {stats.avg}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>Min</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {stats.min}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>Max</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {stats.max}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: '1rem',
          maxHeight: '200px',
          overflow: 'auto',
          background: 'white',
          padding: '1rem',
          borderRadius: '4px',
        }}
      >
        <h4>Data Points (first 30):</h4>
        {filteredData.slice(0, 30).map((point) => (
          <div
            key={point.day}
            style={{
              padding: '0.25rem',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>Day {point.day}</span>
            <span>Category {point.category}</span>
            <span>{point.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeavyComponent3;
