import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="loading-screen">Loading Experience...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
