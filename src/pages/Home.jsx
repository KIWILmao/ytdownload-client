import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdCard from '../components/AdCard'
import { resolveVideo } from '../lib/api'

export default function Home() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!url.trim()) {
      setError(true)
      setErrorMessage('Please paste a YouTube URL first.')
      setTimeout(() => setError(false), 800)
      return
    }

    try {
      setIsLoading(true)
      setError(false)
      setErrorMessage('')

      const data = await resolveVideo(url)
      navigate('/go', { state: { session: data } })
    } catch (err) {
      setError(true)
      setErrorMessage(err.message || 'Unable to process that URL right now.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: '#0E0E0E', paddingTop: '64px' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(233,161,42,0.1) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(233,161,42,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 55% at 50% 0%, black 0%, transparent 100%)',
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase"
          style={{
            background: 'rgba(233,161,42,0.1)',
            border: '1px solid rgba(233,161,42,0.25)',
            color: '#E9A12A',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#E9A12A', boxShadow: '0 0 6px #E9A12A' }}
          />
          Free · No Account · No Limits
        </div>

        <h1
          className="text-center font-bold tracking-tight leading-tight mb-3"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)', color: '#F2EDE6' }}
        >
          Download YouTube
          <br />
          <span style={{ color: '#E9A12A' }}>videos instantly.</span>
        </h1>

        <p
          className="text-center mb-8 max-w-sm leading-relaxed"
          style={{ color: '#8A8078', fontWeight: 300, fontSize: '1rem' }}
        >
          Paste any YouTube link, validate it through the Worker API, then move into the
          Adsterra-powered download flow.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div
            className="flex rounded-xl overflow-hidden transition-all duration-200"
            style={{
              background: '#141414',
              border: `1px solid ${error ? 'rgba(239,68,68,0.6)' : 'rgba(233,161,42,0.2)'}`,
              boxShadow: error ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none',
            }}
          >
            <span className="flex items-center pl-4 flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"
                  fill={url ? '#E9A12A' : '#2A2A2A'}
                />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={url ? '#0E0E0E' : '#141414'} />
              </svg>
            </span>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
              className="flex-1 py-3.5 px-3 text-sm bg-transparent outline-none min-w-0"
              style={{ color: '#F2EDE6' }}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 m-1.5 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-95"
              style={{
                background: isLoading ? '#B57C1A' : '#E9A12A',
                color: '#0E0E0E',
                opacity: isLoading ? 0.8 : 1,
              }}
              onMouseEnter={e => {
                if (!isLoading) {
                  e.currentTarget.style.background = '#D4901A'
                }
              }}
              onMouseLeave={e => {
                if (!isLoading) {
                  e.currentTarget.style.background = '#E9A12A'
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#0E0E0E" strokeOpacity="0.25" strokeWidth="3" />
                    <path d="M12 3a9 9 0 0 1 9 9" stroke="#0E0E0E" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Checking
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v13M6 11l6 6 6-6M3 20h18" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="text-xs mt-2 text-center" style={{ color: '#EF4444' }}>
              {errorMessage}
            </p>
          )}
        </form>
      </div>

      <div className="relative z-10 px-6 pb-6" style={{ borderTop: '1px solid #1A1A1A' }}>
        <p className="text-center text-xs mb-3 mt-4" style={{ color: '#333' }}>
          Sponsored
        </p>
        <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
          <AdCard variant="horizontal-sm" title="Adsterra Direct Link" desc="Use the main gate button as your first monetized click." />
          <AdCard variant="horizontal-sm" title="Native Banner" desc="Add a low-friction slot below the form after approval." />
          <AdCard variant="horizontal-sm" title="Social Bar" desc="Layer in higher-yield monetization once the flow is stable." />
        </div>
      </div>
    </div>
  )
}
