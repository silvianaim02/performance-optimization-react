import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import './PageLayout.css'

// Lazy load heavy components
const HeavyComponent1 = lazy(() => import('../components/HeavyComponent1'))
const HeavyComponent2 = lazy(() => import('../components/HeavyComponent2'))
const HeavyComponent3 = lazy(() => import('../components/HeavyComponent3'))

function CodeSplittingPage() {
  const [activeComponent, setActiveComponent] = useState(null)

  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
      
      <header className="page-header">
        <h1>Code Splitting & Lazy Loading</h1>
        <p>Load components only when needed</p>
      </header>

      <div className="content-section">
        <div className="info-box">
          <h3>📦 What to observe:</h3>
          <ul>
            <li>Open Network tab in DevTools</li>
            <li>Click buttons below to load components on-demand</li>
            <li>Notice separate chunk files being loaded for each component</li>
            <li>Initial bundle size is smaller because components are loaded lazily</li>
          </ul>
        </div>

        <div className="button-group">
          <button 
            onClick={() => setActiveComponent('component1')}
            className={activeComponent === 'component1' ? 'active' : ''}
          >
            Load Component 1
          </button>
          <button 
            onClick={() => setActiveComponent('component2')}
            className={activeComponent === 'component2' ? 'active' : ''}
          >
            Load Component 2
          </button>
          <button 
            onClick={() => setActiveComponent('component3')}
            className={activeComponent === 'component3' ? 'active' : ''}
          >
            Load Component 3
          </button>
          <button onClick={() => setActiveComponent(null)}>
            Clear
          </button>
        </div>

        <div className="lazy-component-container">
          <Suspense fallback={<div className="loading">Loading component...</div>}>
            {activeComponent === 'component1' && <HeavyComponent1 />}
            {activeComponent === 'component2' && <HeavyComponent2 />}
            {activeComponent === 'component3' && <HeavyComponent3 />}
            {!activeComponent && (
              <div className="placeholder">
                Click a button above to load a component dynamically
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default CodeSplittingPage

