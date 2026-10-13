import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

// The animated landscape is a large SVG scene at the very bottom of every page:
// fetch and mount it only when the footer gets near the viewport.
const FooterAnimation = lazy(() => import('./FooterAnimation'));

const Footer: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const el = mainRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setShowScene(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setShowScene(true);
      io.disconnect();
    }, { rootMargin: '800px 0px' });
    // While a lazy route is still loading the page is empty and the footer sits
    // in view, so only start watching once the visitor scrolls (or, for pages
    // too short to scroll, a few seconds after load).
    let fallback = 0;
    const start = () => {
      window.removeEventListener('scroll', start);
      window.clearTimeout(fallback);
      io.observe(el);
    };
    const arm = () => { fallback = window.setTimeout(start, 3000); };
    window.addEventListener('scroll', start, { once: true, passive: true });
    if (document.readyState === 'complete') arm();
    else window.addEventListener('load', arm, { once: true });
    return () => {
      window.removeEventListener('scroll', start);
      window.removeEventListener('load', arm);
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-main" ref={mainRef}>
        {/* Decorative panoramic construction landscape inside footer-main */}
        {showScene && (
          <Suspense fallback={null}>
            <FooterAnimation />
          </Suspense>
        )}

        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <a href="#" className="footer-logo">
              <img src="/media/srv-logo-footer.webp" alt="SRV Associates Logo" width={192} height={192} loading="lazy" decoding="async" />
            </a>
            <p className="footer-desc">
              Comprehensive architectural and structural engineering solutions. From ground to sky.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/#idea">Our Process</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <address className="footer-address">
              <p>SRV Associates</p>
              <p>123 Business Tower,</p>
              <p>Sector 62, Noida,</p>
              <p>Uttar Pradesh, India</p>
              <p className="footer-contact-link">
                <a href="mailto:info@srvassociate.in">info@srvassociate.in</a>
              </p>
              <p className="footer-contact-link">
                <a href="tel:+919876543210">+91 98765 43210</a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} SRV Associates. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
