import { useState } from 'react'

// Simulate another heavy component with different content
function HeavyComponent2() {
  const [items, setItems] = useState([])
  
  const addItem = () => {
    setItems([...items, { id: Date.now(), text: `Item ${items.length + 1}` }])
  }

  // Simulate heavy data processing
  const processedData = Array.from({ length: 500 }, (_, i) => ({
    id: i,
    name: `Product ${i}`,
    price: (Math.random() * 100).toFixed(2),
    category: ['Electronics', 'Clothing', 'Food', 'Books'][Math.floor(Math.random() * 4)]
  }))

  console.log('HeavyComponent2 rendered')

  return (
    <div style={{ padding: '2rem', background: '#fff0f5', borderRadius: '8px' }}>
      <h2>🛍️ Heavy Component 2</h2>
      <p>This component simulates a product catalog with 500 items.</p>
      <p>It was loaded on-demand to reduce initial bundle size.</p>
      
      <div style={{ marginTop: '1rem' }}>
        <button onClick={addItem}>Add Item</button>
        <div style={{ marginTop: '0.5rem' }}>
          {items.map(item => (
            <div key={item.id} style={{ padding: '0.5rem', background: 'white', margin: '0.25rem 0', borderRadius: '4px' }}>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '1rem', maxHeight: '200px', overflow: 'auto', background: 'white', padding: '1rem', borderRadius: '4px' }}>
        <h4>Product Catalog (first 15 items):</h4>
        {processedData.slice(0, 15).map(product => (
          <div key={product.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
            <span>{product.name}</span>
            <span>{product.category}</span>
            <span>${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HeavyComponent2

