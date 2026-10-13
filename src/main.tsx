import React from 'react'
import ReactDOM from 'react-dom/client'
// Self-hosted fonts: served from our own origin with hashed, long-cached files.
// Each family ships per-subset files behind unicode-range, so only the
// subsets a page actually uses are downloaded.
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
