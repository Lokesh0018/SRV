import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import '../styles/Navbar.css';

const LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICES', href: '/services' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}${open ? ' is-open' : ''}`} aria-label="Primary">
      <div className="nav-content">
        <Link to="/" className="logo" onClick={close}>
          <img className="logo-dark" src="/SRV_Logo.png" alt="SRV Associates — home" width={822} height={720} />
          {/* light lockup, shown while the nav floats over the hero footage */}
          <img className="logo-light" src="/SRV_Logo_light.png" alt="" aria-hidden="true" width={822} height={720} />
        </Link>

        <div className="nav-right">
          <ul className="nav-links" id="nav-links">
            {LINKS.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.label}>
                  <Link to={l.href} className={`nav-link${isActive ? ' is-active' : ''}`} onClick={close}>
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li className="nav-links-cta">
              <Link to="/contact" className="nav-cta" onClick={close}>
                START A PROJECT
                <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-links"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
