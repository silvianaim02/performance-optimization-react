import { Link } from 'react-router-dom'
import Children from '../components/children'
import MemoComponent from '../components/useMemoImplement'
import './PageLayout.css'
import PageHeader from '../components/PageHeader'
import InfoBox from '../components/InfoBox'

function RenderingPage() {
  const renderMainContent = () => {
    return (
      <>
       <div className="component-demo">
          <h2>❌ Non-Optimized Component</h2>
          <Children />
        </div>

        <div className="component-demo">
          <h2>✅ Optimized Component (with memo, useCallback, useMemo)</h2>
          <MemoComponent />
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
        title="Reduce Rendering & Re-rendering"
        description="Compare optimized vs non-optimized components using memo, useCallback, and useMemo"
      />

      <div className="content-section">
        <InfoBox
          title="📊 What to observe:"
          description="Compare optimized vs non-optimized components using memo, useCallback, and useMemo"
          points={[
            'Open the browser console to see render logs',
            'Click buttons in both components',
            'Notice how the non-optimized component re-renders child components unnecessarily',
            'The optimized component uses React.memo, useCallback, and useMemo to prevent unnecessary re-renders'
          ]}
        />
        {renderMainContent()}
      </div>
    </div>
  )
}

export default RenderingPage

