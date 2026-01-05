import { useState } from 'react';

// Simulate a heavy component with lots of data
function HeavyComponent1() {
  const [count, setCount] = useState(0);

  // Simulate heavy computation
  const heavyData = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    value: Math.random() * 1000,
    label: `Item ${i}`,
  }));

  console.log('HeavyComponent1 rendered');

  return (
    <div
      style={{ padding: '2rem', background: '#f0f8ff', borderRadius: '8px' }}
    >
      <h2>🎨 Heavy Component 1</h2>
      <p>This component contains 1000 data items and was loaded lazily.</p>
      <p>
        Check the Network tab - this component was loaded in a separate chunk!
      </p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </button>
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
        <h4>Sample Data (first 20 items):</h4>
        {heavyData.slice(0, 20).map((item) => (
          <div
            key={item.id}
            style={{ padding: '0.25rem', borderBottom: '1px solid #eee' }}
          >
            {item.label}: {item.value.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeavyComponent1;
