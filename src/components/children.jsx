import { useMemo, useState } from 'react';

function Child({ title, onClick, options, style }) {
  console.log('render Child:', title);

  return (
    <div style={style}>
      <p>{title}</p>
      <button onClick={onClick}>Click child</button>
      <pre>{JSON.stringify(options, null, 2)}</pre>
    </div>
  );
}

export default function Children() {
  console.log('----------------');
  console.log('render Children non-optimiazation');

  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ tanpa useMemo:
  // - function baru setiap render
  // - object/array baru setiap render
  const handleChildClick = () => alert('child clicked');
  const options = { size: 'M', variant: 'primary' };
  const style = { border: '1px solid #ccc', padding: 12, borderRadius: 8 };

  // Simulasi komputasi agak berat
  const expensiveValue = useMemo(() => {
    let total = 0;
    for (let i = 0; i < 5_000_00; i++) total += i; // sengaja
    return total;
  }, [count]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Without Optimization using useMemo</h2>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button onClick={() => setCount((c) => c + 1)}>count: {count}</button>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ketik di sini"
        />
      </div>

      <p>expensiveValue depends on count: {expensiveValue}</p>

      <Child
        title="I am Child"
        onClick={handleChildClick}
        options={options}
        style={style}
      />
    </div>
  );
}
