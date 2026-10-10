import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowUpRight, CheckCircle2, Clock, Mail, MapPin, Navigation, Phone, Send } from 'lucide-react';
import { SERVICES } from '../data/services';
import { CONTACT, MAPS_DIRECTIONS_URL, MAPS_EMBED_URL } from '../data/contact';
import '../styles/ContactPage.css';

type Fields = { name: string; phone: string; email: string; service: string; location: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: '', phone: '', email: '', service: '', location: '', message: '' };
const OTHER = 'Other / not sure yet';

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Please enter your name.';
  const digits = f.phone.replace(/\D/g, '');
  if (!digits) e.phone = 'Please enter a phone number so we can call you back.';
  else if (digits.length < 10) e.phone = 'Please enter a valid phone number (at least 10 digits).';
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (!f.message.trim()) e.message = 'Please tell us a little about your project.';
  return e;
}

/** Builds a pre-filled email to SRV — the site has no backend, so the visitor's mail app sends it. */
function buildMailto(f: Fields) {
  const subject = `Project enquiry${f.service ? ` – ${f.service}` : ''} – ${f.name.trim()}`;
  const body = [
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    f.email.trim() ? `Email: ${f.email.trim()}` : null,
    f.service ? `Service: ${f.service}` : null,
    f.location.trim() ? `Project location: ${f.location.trim()}` : null,
    '',
    f.message.trim(),
  ]
    .filter((line): line is string => line !== null)
    .join('\n');
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const Contact: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [params] = useSearchParams();
  const preset = SERVICES.find((s) => s.slug === params.get('service'))?.title ?? '';

  const [fields, setFields] = useState<Fields>({ ...EMPTY, service: preset });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Contact | SRV Associates';
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.cp-hero-copy > *', { y: 22, opacity: 0, duration: 0.8, stagger: 0.07 })
          .from('.cp-quick a', { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 }, '-=0.5')
          .from('.cp-form-card, .cp-aside > *', { y: 26, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.4');
      });
    }, el);
    return () => {
      ctx.revert();
      document.title = prevTitle;
    };
  }, []);

  const update = (key: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = ev.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    // clear a field's error as soon as it becomes valid
    if (errors[key]) setErrors((e) => ({ ...e, [key]: validate({ ...fields, [key]: value })[key] }));
  };

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Fields)[])[0];
    if (first) {
      document.getElementById(`cp-${first}`)?.focus();
      return;
    }
    window.location.href = buildMailto(fields);
    setSent(true);
  };

  const fieldProps = (key: keyof Fields) => ({
    id: `cp-${key}`,
    name: key,
    value: fields[key],
    onChange: update(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `cp-${key}-error` : undefined,
  });

  const errorText = (key: keyof Fields) =>
    errors[key] ? <p id={`cp-${key}-error`} className="cp-error">{errors[key]}</p> : null;

  return (
    <main ref={root} className="contact-page">
      {/* ---------- hero ---------- */}
      <section className="cp-hero" aria-labelledby="cp-title">
        <div className="cp-hero-grid" aria-hidden="true" />
        <div className="cp-container">
          <div className="cp-hero-copy">
            <p className="cp-eyebrow">Contact</p>
            <h1 id="cp-title" className="cp-title">
              Let's build <em>something real.</em>
            </h1>
            <p className="cp-lede">
              From conceptual architecture to structural execution, partner with SRV Associates to bring your next
              vision to life. Tell us about your project and we'll get back to you.
            </p>
          </div>

          <ul className="cp-quick" aria-label="Quick contact">
            <li>
              <a href={CONTACT.phoneHref} className="cp-quick-card">
                <span className="cp-quick-icon" aria-hidden="true"><Phone size={20} strokeWidth={1.75} /></span>
                <span className="cp-quick-text">
                  <span className="cp-quick-label">Call us</span>
                  <span className="cp-quick-value">{CONTACT.phoneDisplay}</span>
                </span>
                <ArrowUpRight className="cp-quick-arrow" size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="cp-quick-card">
                <span className="cp-quick-icon" aria-hidden="true"><Mail size={20} strokeWidth={1.75} /></span>
                <span className="cp-quick-text">
                  <span className="cp-quick-label">Email us</span>
                  <span className="cp-quick-value">{CONTACT.email}</span>
                </span>
                <ArrowUpRight className="cp-quick-arrow" size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="cp-quick-card">
                <span className="cp-quick-icon" aria-hidden="true"><Navigation size={20} strokeWidth={1.75} /></span>
                <span className="cp-quick-text">
                  <span className="cp-quick-label">Visit the office</span>
                  <span className="cp-quick-value">Get directions</span>
                </span>
                <ArrowUpRight className="cp-quick-arrow" size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- form + details ---------- */}
      <section className="cp-main" aria-label="Send an enquiry">
        <div className="cp-container cp-main-grid">
          <div className="cp-form-card">
            {sent ? (
              <div className="cp-sent" role="status">
                <CheckCircle2 size={40} strokeWidth={1.5} aria-hidden="true" />
                <h2 className="cp-h2">Your email is ready to send</h2>
                <p>
                  We've opened your email app with your enquiry filled in — just press send. If nothing opened, email
                  us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call{' '}
                  <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>.
                </p>
                <button type="button" className="cp-btn-ghost" onClick={() => setSent(false)}>
                  Edit enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 className="cp-h2">Tell us about your project</h2>
                <p className="cp-form-note">
                  Fields marked <span aria-hidden="true">*</span><span className="cp-sr">with an asterisk</span> are required.
                </p>

                <div className="cp-fields">
                  <div className="cp-field">
                    <label htmlFor="cp-name">Name <span aria-hidden="true">*</span></label>
                    <input type="text" autoComplete="name" required {...fieldProps('name')} />
                    {errorText('name')}
                  </div>
                  <div className="cp-field">
                    <label htmlFor="cp-phone">Phone <span aria-hidden="true">*</span></label>
                    <input type="tel" autoComplete="tel" inputMode="tel" required {...fieldProps('phone')} />
                    {errorText('phone')}
                  </div>
                  <div className="cp-field">
                    <label htmlFor="cp-email">Email</label>
                    <input type="email" autoComplete="email" {...fieldProps('email')} />
                    {errorText('email')}
                  </div>
                  <div className="cp-field">
                    <label htmlFor="cp-service">Service</label>
                    <select {...fieldProps('service')}>
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.title}>{s.title}</option>
                      ))}
                      <option value={OTHER}>{OTHER}</option>
                    </select>
                  </div>
                  <div className="cp-field cp-field-wide">
                    <label htmlFor="cp-location">Project location</label>
                    <input type="text" autoComplete="address-level2" placeholder="e.g. Madhurawada, Visakhapatnam" {...fieldProps('location')} />
                  </div>
                  <div className="cp-field cp-field-wide">
                    <label htmlFor="cp-message">Project details <span aria-hidden="true">*</span></label>
                    <textarea rows={5} required placeholder="Plot size, type of building, timeline — anything that helps." {...fieldProps('message')} />
                    {errorText('message')}
                  </div>
                </div>

                <div className="cp-submit-row">
                  <button type="submit" className="cp-btn">
                    Send enquiry <Send size={17} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                  <p className="cp-submit-note">Opens your email app with your enquiry filled in.</p>
                </div>
              </form>
            )}
          </div>

          <aside className="cp-aside" aria-label="Office details">
            <div className="cp-details">
              <div className="cp-detail">
                <span className="cp-detail-icon" aria-hidden="true"><MapPin size={20} strokeWidth={1.75} /></span>
                <div>
                  <h3 className="cp-detail-label">Registered office</h3>
                  <address className="cp-detail-value">
                    {CONTACT.addressLines.map((l) => <span key={l}>{l}</span>)}
                  </address>
                  <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="cp-inline-link">
                    Get directions <ArrowUpRight size={14} strokeWidth={2.25} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <div className="cp-detail">
                <span className="cp-detail-icon" aria-hidden="true"><Phone size={20} strokeWidth={1.75} /></span>
                <div>
                  <h3 className="cp-detail-label">Telephone</h3>
                  <a href={CONTACT.phoneHref} className="cp-detail-value cp-detail-link">{CONTACT.phoneDisplay}</a>
                </div>
              </div>
              <div className="cp-detail">
                <span className="cp-detail-icon" aria-hidden="true"><Mail size={20} strokeWidth={1.75} /></span>
                <div>
                  <h3 className="cp-detail-label">Email</h3>
                  <a href={`mailto:${CONTACT.email}`} className="cp-detail-value cp-detail-link">{CONTACT.email}</a>
                </div>
              </div>
              <div className="cp-detail">
                <span className="cp-detail-icon" aria-hidden="true"><Clock size={20} strokeWidth={1.75} /></span>
                <div>
                  <h3 className="cp-detail-label">Business hours</h3>
                  <dl className="cp-hours">
                    {CONTACT.hours.map((h) => (
                      <div key={h.days}><dt>{h.days}</dt><dd>{h.time}</dd></div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <div className="cp-map">
              <iframe
                title="Map showing the SRV Associates office in Arilova, Visakhapatnam"
                src={MAPS_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Contact;
