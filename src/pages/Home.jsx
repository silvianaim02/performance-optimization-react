import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const experiments = [
    {
      title: 'Reduce Rendering & Re-rendering',
      description: 'Compare optimized vs non-optimized components using memo, useCallback, and useMemo',
      path: '/rendering',
      topics: ['React.memo', 'useCallback', 'useMemo', 'Unnecessary re-renders']
    },
    {
      title: 'Code Splitting & Lazy Loading',
      description: 'Demonstrate lazy loading components and code splitting techniques',
      path: '/code-splitting',
      topics: ['React.lazy', 'Suspense', 'Dynamic imports', 'Bundle optimization']
    },
    {
      title: 'Large Lists/Tables Optimization',
      description: 'Optimize rendering of large datasets using virtualization',
      path: '/large-lists',
      topics: ['Virtual scrolling', 'Windowing', 'Pagination', 'Performance monitoring']
    }
  ]

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>⚡ React Performance Optimization Lab</h1>
        <p>Explore different performance optimization techniques in React</p>
      </header>

      <div className="experiments-grid">
        {experiments.map((experiment) => (
          <Link 
            key={experiment.path} 
            to={experiment.path} 
            className="experiment-card"
          >
            <h2>{experiment.title}</h2>
            <p>{experiment.description}</p>
            <div className="topics">
              {experiment.topics.map((topic) => (
                <span key={topic} className="topic-tag">{topic}</span>
              ))}
            </div>
            <div className="card-footer">
              <span className="explore-link">Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

