import { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import './PageLayout.css';
import PageHeader from '../components/PageHeader';
import InfoBox from '../components/InfoBox';

// Lazy load heavy components
const HeavyComponent1 = lazy(() => import('../components/HeavyComponent1'));
const HeavyComponent2 = lazy(() => import('../components/HeavyComponent2'));
const HeavyComponent3 = lazy(() => import('../components/HeavyComponent3'));

function CodeSplittingPage() {
  const [activeComponent, setActiveComponent] = useState(null);

  const renderMainContent = () => {
    return (
      <>
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
          <button onClick={() => setActiveComponent(null)}>Clear</button>
        </div>

        <div className="lazy-component-container">
          <Suspense
            fallback={<div className="loading">Loading component...</div>}
          >
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
        title="Code Splitting & Lazy Loading"
        description="Load components only when needed"
      />
      <div className="content-section">
        <InfoBox
          title="📦 What to observe:"
          description="Load components only when needed"
          points={[
            'Open Network tab in DevTools',
            'Click buttons below to load components on-demand',
            'Notice separate chunk files being loaded for each component',
            'Initial bundle size is smaller because components are loaded lazily',
          ]}
        />
        {renderMainContent()}
      </div>
    </div>
  );
}

export default CodeSplittingPage;
