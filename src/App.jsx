import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import RenderingPage from './pages/RenderingPage'
import CodeSplittingPage from './pages/CodeSplittingPage'
import LargeListsPage from './pages/LargeListsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rendering" element={<RenderingPage />} />
        <Route path="/code-splitting" element={<CodeSplittingPage />} />
        <Route path="/large-lists" element={<LargeListsPage />} />
      </Routes>
    </Router>
  )
}

export default App
