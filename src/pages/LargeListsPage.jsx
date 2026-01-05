import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './PageLayout.css'
import PageHeader from '../components/PageHeader'

// Simple virtual list implementation
function VirtualList({ items, itemHeight = 50, containerHeight = 600 }) {
  const [scrollTop, setScrollTop] = useState(0)

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight)
    const end = Math.ceil((scrollTop + containerHeight) / itemHeight)
    return { start, end }
  }, [scrollTop, itemHeight, containerHeight])

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end)
  }, [items, visibleRange])

  const totalHeight = items.length * itemHeight
  const offsetY = visibleRange.start * itemHeight

  return (
    <div 
      style={{ height: containerHeight, overflow: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div 
              key={visibleRange.start + index}
              style={{ 
                height: itemHeight, 
                padding: '10px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <strong>#{visibleRange.start + index + 1}</strong>
              <span style={{ marginLeft: '1rem' }}>{item.name}</span>
              <span style={{ marginLeft: 'auto', color: '#666' }}>{item.email}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LargeListsPage() {
  const [listSize, setListSize] = useState(10000)
  const [useVirtualization, setUseVirtualization] = useState(true)

  const items = useMemo(() => {
    return Array.from({ length: listSize }, (_, i) => ({
      id: i,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`
    }))
  }, [listSize])

  const renderMainContent = () => {
    return (
      <>
        <div className="controls">
          <label>
            List Size: 
            <select value={listSize} onChange={(e) => setListSize(Number(e.target.value))}>
              <option value={1000}>1,000 items</option>
              <option value={10000}>10,000 items</option>
              <option value={50000}>50,000 items</option>
              <option value={100000}>100,000 items</option>
            </select>
          </label>
          
          <label>
            <input 
              type="checkbox" 
              checked={useVirtualization}
              onChange={(e) => setUseVirtualization(e.target.checked)}
            />
            Use Virtualization
          </label>
        </div>

        <div className="list-demo">
          <h3>
            {useVirtualization ? '✅ Virtualized List' : '❌ Regular List'} 
            ({items.length.toLocaleString()} items)
          </h3>
          
          {useVirtualization ? (
            <VirtualList items={items} />
          ) : (
            <div style={{ height: 600, overflow: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
              {items.slice(0, 1000).map((item, index) => (
                <div 
                  key={item.id}
                  style={{ 
                    height: 50, 
                    padding: '10px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <strong>#{index + 1}</strong>
                  <span style={{ marginLeft: '1rem' }}>{item.name}</span>
                  <span style={{ marginLeft: 'auto', color: '#666' }}>{item.email}</span>
                </div>
              ))}
              {items.length > 1000 && (
                <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                  ... and {(items.length - 1000).toLocaleString()} more items (limited to 1000 for performance)
                </div>
              )}
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
      <PageHeader
        title="Large Lists/Tables Optimization"
        description="Efficiently render thousands of items"
      />

      <div className="content-section">
        <InfoBox
          title="🚀 What to observe:"
          description="Efficiently render thousands of items"
          points={[
            'Toggle between virtualized and non-virtualized rendering',
            'Notice the performance difference with large datasets',
            'Virtualization only renders visible items',
            'Check React DevTools Profiler to see render times'
          ]}
        />
        {renderMainContent()}
      </div>
    </div>
  )
}

export default LargeListsPage

