import { memo, useCallback, useMemo, useState } from "react";

const Child = memo(function Child({ title, onClick, options, style }) {
  console.log("render Child:", title);

  return (
    <div style={style}>
      <p>{title}</p>
      <button onClick={onClick}>Click child on memo optimization</button>
      <pre>{JSON.stringify(options, null, 2)}</pre>
    </div>
  );
});

export default function MemoComponent() {
console.log('----------------')
  console.log("render with optimiazation");

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // ✅ stabil: function tidak ganti tiap render
  const handleChildClick = useCallback(() => {
    alert("child clicked");
  }, []);

  // ✅ stabil: object tidak ganti tiap render
  const options = useMemo(() => ({ size: "M", variant: "primary" }), []);

  // ✅ stabil: object style tidak ganti tiap render
  const style = useMemo(
    () => ({ border: "1px solid #ccc", padding: 12, borderRadius: 8 }),
    []
  );

  const expensiveValue = useMemo(() => {
    let total = 0;
    for (let i = 0; i < 5_000_00; i++) total += i;
    return total;
  }, [count]);

  return (
    <div style={{ padding: 16 }}>
      <h2>With Optimization using useMemo</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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
