import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/Navbar';

import Footer from './components/Footer';
import { loadRoute, prefetchAllWhenIdle } from './routes';
import { refreshOnLayoutChange } from './lib/scrollTrigger';

// Lazy load pages for performance; the other pages are prefetched once idle
const Home = lazy(loadRoute['/']);
const About = lazy(loadRoute['/about']);
const Services = lazy(loadRoute['/services']);
const Contact = lazy(loadRoute['/contact']);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // A small timeout ensures that the DOM has been updated and any Suspense fallbacks have resolved
    // before we force the scroll position to the top.
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(prefetchAllWhenIdle, []);
  useEffect(() => refreshOnLayoutChange(), []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Suspense fallback={<div className="page-loading-skeleton" aria-hidden="true" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
