import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const formatMeta = {
  mp4: { desc: 'Video + Audio', icon: 'MP4' },
  mp3: { desc: 'Audio only', icon: 'MP3' },
  webm: { desc: 'Web optimized', icon: 'WEB' },
  mkv: { desc: 'Full quality', icon: 'MKV' },
}

export default function FormatSelect() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const formats = state?.session?.formats || []
  const defaultFormat = formats[0]?.id || 'mp4'
  const defaultQuality = formats[0]?.qualities?.[0] || ''

  const [selectedFormat, setSelectedFormat] = useState(defaultFormat)
  const [selectedQuality, setSelectedQuality] = useState(defaultQuality)

  useEffect(() => {
    if (!state?.session?.video?.url) {
      navigate('/')
    }
  }, [navigate, state?.session?.video?.url])

  const activeFormat = formats.find(format => format.id === selectedFormat)
  const video = state?.session?.video
  const videoTitle = video?.title || 'YouTube Video'

  function pickFormat(id) {
    const nextFormat = formats.find(format => format.id === id)
    setSelectedFormat(id)
    setSelectedQuality(nextFormat?.qualities?.[0] || '')
  }

  function handleDownload() {
    navigate('/go/download', {
      state: {
        ...state,
        selectedFormat,
        selectedQuality,
      },
    })
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center px-6" style={{ background: '#0E0E0E', paddingTop: '64px' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(233,161,42,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="flex items-center gap-2 mb-8 relative z-10">
        {['Start', 'Ad', 'Select', 'Download'].map((label, i) => {
          const s = i + 1
          const done = s <= 2
          const active = s === 3

          return (
            <div key={s} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: done ? '#E9A12A' : active ? 'rgba(233,161,42,0.15)' : '#1A1A1A',
                    border: `1px solid ${done || active ? 'rgba(233,161,42,0.5)' : '#2A2A2A'}`,
                    color: done ? '#0E0E0E' : active ? '#E9A12A' : '#444',
                  }}
                >
                  {done ? '✓' : s}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: active ? '#E9A12A' : done ? '#8A8078' : '#333' }}>
                  {label}
                </span>
              </div>
              {s < 4 && <div className="w-8 h-px" style={{ background: done ? 'rgba(233,161,42,0.4)' : '#1E1E1E' }} />}
            </div>
          )
        })}
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="flex items-center gap-3 mb-6 p-3 rounded-xl" style={{ background: '#141414', border: '1px solid #1E1E1E' }}>
          <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden" style={{ background: '#1E1E1E' }}>
            {video?.thumbnail ? (
              <img src={video.thumbnail} alt={videoTitle} className="w-full h-full object-cover" />
            ) : null}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: '#C8BFB4' }}>
              {videoTitle}
            </p>
            <p className="text-xs truncate" style={{ color: '#504840' }}>
              {video?.url}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="text-xs px-2.5 py-1 rounded-lg transition-colors"
            style={{ color: '#8A8078', background: '#1E1E1E' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#E9A12A'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#8A8078'
            }}
          >
            Change
          </button>
        </div>

        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#504840' }}>
          Format
        </p>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {formats.map(format => (
            <button
              key={format.id}
              onClick={() => pickFormat(format.id)}
              className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl transition-all duration-150"
              style={{
                background: selectedFormat === format.id ? 'rgba(233,161,42,0.1)' : '#141414',
                border: `1px solid ${selectedFormat === format.id ? 'rgba(233,161,42,0.4)' : '#222'}`,
              }}
            >
              <span className="text-xs font-bold px-2 py-1 rounded-md" style={{ background: '#1E1E1E', color: '#E9A12A' }}>
                {formatMeta[format.id]?.icon || format.label}
              </span>
              <span className="text-xs font-bold" style={{ color: selectedFormat === format.id ? '#E9A12A' : '#C8BFB4' }}>
                {format.label}
              </span>
              <span className="text-[10px]" style={{ color: '#504840' }}>
                {formatMeta[format.id]?.desc || 'Format option'}
              </span>
            </button>
          ))}
        </div>

        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#504840' }}>
          Quality
        </p>
        <div className="flex flex-wrap gap-2 mb-7">
          {activeFormat?.qualities?.map(quality => (
            <button
              key={quality}
              onClick={() => setSelectedQuality(quality)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
              style={{
                background: selectedQuality === quality ? 'rgba(233,161,42,0.1)' : '#141414',
                border: `1px solid ${selectedQuality === quality ? 'rgba(233,161,42,0.4)' : '#222'}`,
                color: selectedQuality === quality ? '#E9A12A' : '#8A8078',
              }}
            >
              {quality}
            </button>
          ))}
        </div>

        <button
          onClick={handleDownload}
          disabled={!activeFormat || !selectedQuality}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98]"
          style={{
            background: !activeFormat || !selectedQuality ? '#B57C1A' : '#E9A12A',
            color: '#0E0E0E',
            opacity: !activeFormat || !selectedQuality ? 0.8 : 1,
          }}
          onMouseEnter={e => {
            if (activeFormat && selectedQuality) {
              e.currentTarget.style.background = '#D4901A'
            }
          }}
          onMouseLeave={e => {
            if (activeFormat && selectedQuality) {
              e.currentTarget.style.background = '#E9A12A'
            }
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 3v13M6 11l6 6 6-6M3 20h18" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download {activeFormat?.label || 'File'} - {selectedQuality}
        </button>
      </div>
    </div>
  )
}
