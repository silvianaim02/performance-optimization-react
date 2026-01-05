import { Link } from 'react-router-dom'
import Children from '../components/children'
import MemoComponent from '../components/useMemoImplement'
import './PageLayout.css'

function RenderingPage() {
  return (
    <div className="page-container">
      <nav className="page-nav">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
      
      <header className="page-header">
        <h1>Reduce Rendering & Re-rendering</h1>
        <p>Compare optimized vs non-optimized components</p>
      </header>

      <div className="content-section">
        <div className="info-box">
          <h3>📊 What to observe:</h3>
          <ul>
            <li>Open the browser console to see render logs</li>
            <li>Click buttons in both components</li>
            <li>Notice how the non-optimized component re-renders child components unnecessarily</li>
            <li>The optimized component uses React.memo, useCallback, and useMemo to prevent unnecessary re-renders</li>
          </ul>
        </div>

        <div className="component-demo">
          <h2>❌ Non-Optimized Component</h2>
          <Children />
        </div>

        <div className="component-demo">
          <h2>✅ Optimized Component (with memo, useCallback, useMemo)</h2>
          <MemoComponent />
        </div>
      </div>
    </div>
  )
}

export default RenderingPage

