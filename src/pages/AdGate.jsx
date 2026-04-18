import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createDownloadTicket, fetchAdConfig } from '../lib/api'

const COUNTDOWN = 7

export default function AdGate({ step }) {
  const navigate = useNavigate()
  const { state } = useLocation()
  const session = state?.session
  const video = session?.video

  const [seconds, setSeconds] = useState(COUNTDOWN)
  const [ready, setReady] = useState(false)
  const [adConfig, setAdConfig] = useState({ directLink: '' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (!video?.url) {
      navigate('/')
    }
  }, [navigate, video?.url])

  useEffect(() => {
    let isMounted = true

    fetchAdConfig()
      .then(data => {
        if (isMounted) {
          setAdConfig(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setAdConfig({ directLink: import.meta.env.VITE_ADSTERRA_DIRECT_LINK || '' })
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (seconds <= 0) {
      setReady(true)
      return
    }

    const timer = setTimeout(() => setSeconds(value => value - 1), 1000)
    return () => clearTimeout(timer)
  }, [seconds])

  async function handleContinue() {
    if (!ready) {
      return
    }

    if (step === 1) {
      navigate('/select', { state })
      return
    }

    try {
      setError('')

      const ticket = await createDownloadTicket({
        sessionId: session?.sessionId,
        videoId: video?.id,
        videoUrl: video?.url,
        format: state?.selectedFormat,
        quality: state?.selectedQuality,
        adStepCompleted: true,
      })

      navigate('/download-ready', {
        replace: true,
        state: {
          session,
          ticket,
        },
      })
    } catch (err) {
      setError(err.message || 'Unable to prepare the download ticket.')
    }
  }

  const progress = ((COUNTDOWN - seconds) / COUNTDOWN) * 100
  const title = step === 1 ? 'Adsterra Sponsored Placement' : 'Adsterra Monetized Step'
  const description =
    step === 1
      ? 'Open your Adsterra direct link here, then continue to format selection.'
      : 'Use the second monetized step before the Worker creates a download ticket.'

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6" style={{ background: '#0E0E0E', paddingTop: '64px' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(233,161,42,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="flex items-center gap-2 mb-10 relative z-10">
        {[1, 2, 3].map(s => {
          const stepLabel = s === 1 ? 'Start' : s === 2 ? (step === 1 ? 'Ad' : 'Select') : (step === 1 ? 'Select' : 'Download')
          const active = (step === 1 && s === 2) || (step === 2 && s === 3)
          const done = (step === 1 && s === 1) || (step === 2 && s <= 2)

          return (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: done ? '#E9A12A' : active ? 'rgba(233,161,42,0.15)' : '#1A1A1A',
                    border: `1px solid ${done || active ? 'rgba(233,161,42,0.5)' : '#2A2A2A'}`,
                    color: done ? '#0E0E0E' : active ? '#E9A12A' : '#444',
                  }}
                >
                  {done ? '✓' : s}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: active ? '#E9A12A' : done ? '#8A8078' : '#333' }}>
                  {stepLabel}
                </span>
              </div>
              {s < 3 && <div className="w-8 h-px" style={{ background: done ? 'rgba(233,161,42,0.4)' : '#1E1E1E' }} />}
            </div>
          )
        })}
      </div>

      <div className="w-full max-w-lg rounded-2xl mb-8 relative z-10 overflow-hidden" style={{ background: '#141414', border: '1px solid #222' }}>
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#333' }}>
            Advertisement
          </span>
          <span className="text-xs" style={{ color: '#333' }}>
            {video?.title || 'Your download is being prepared'}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-12 px-6 gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#1E1E1E', border: '1px solid #2A2A2A' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#E9A12A" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E9A12A" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm mb-1" style={{ color: '#C8BFB4' }}>
              {title}
            </p>
            <p className="text-xs" style={{ color: '#504840' }}>
              {description}
            </p>
          </div>
          <a
            href={adConfig.directLink || '#'}
            target="_blank"
            rel="noreferrer"
            onClick={e => {
              if (!adConfig.directLink) {
                e.preventDefault()
              }
            }}
            className="px-5 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
            style={{ background: 'rgba(233,161,42,0.12)', border: '1px solid rgba(233,161,42,0.25)', color: '#E9A12A' }}
          >
            {adConfig.directLink ? 'Open Sponsored Offer ->' : 'Add Adsterra Link ->'}
          </a>
        </div>

        <div className="h-1" style={{ background: '#1A1A1A' }}>
          <div className="h-full transition-all duration-1000 ease-linear" style={{ width: `${progress}%`, background: '#E9A12A' }} />
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!ready}
        className="relative z-10 flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
        style={{
          background: ready ? '#E9A12A' : '#1A1A1A',
          color: ready ? '#0E0E0E' : '#444',
          border: `1px solid ${ready ? 'transparent' : '#2A2A2A'}`,
          cursor: ready ? 'pointer' : 'not-allowed',
          transform: ready ? 'scale(1)' : 'scale(0.98)',
        }}
        onMouseEnter={e => {
          if (ready) {
            e.currentTarget.style.background = '#D4901A'
          }
        }}
        onMouseLeave={e => {
          if (ready) {
            e.currentTarget.style.background = '#E9A12A'
          }
        }}
      >
        {!ready ? (
          <>
            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#333" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="#666" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Please wait {seconds}s...
          </>
        ) : step === 1 ? (
          <>
            Continue to Format Select
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v13M6 11l6 6 6-6M3 20h18" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Create Download Ticket
          </>
        )}
      </button>

      <p className="mt-4 text-xs relative z-10" style={{ color: '#333' }}>
        {ready ? 'Ready to proceed' : 'Ad-supported free downloads keep the flow open to everyone.'}
      </p>
      {error && (
        <p className="mt-2 text-xs relative z-10" style={{ color: '#EF4444' }}>
          {error}
        </p>
      )}
    </div>
  )
}
