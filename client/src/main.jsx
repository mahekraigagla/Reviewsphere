import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
          <div style={{ maxWidth: '500px', textAlign: 'center', background: '#111827', padding: '30px', borderRadius: '16px', border: '1px solid #1f2937' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#14b8a6', marginBottom: '12px' }}>ReviewSphere Application Notice</h2>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '20px' }}>
              The page encountered a minor render refresh. Click the button below to reload and continue.
            </p>
            <button 
              onClick={() => { window.location.href = '/'; }} 
              style={{ backgroundColor: '#135f52', color: '#fff', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Reload ReviewSphere Home
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)

