import AdCard from '../components/AdCard'

const steps = [
  {
    n: '01',
    title: 'Copy the YouTube URL',
    desc: 'Find your video on YouTube and copy the URL from the address bar or the share button below the video.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#E9A12A" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#E9A12A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Paste & Choose Format',
    desc: 'Paste the URL into YTGrab\'s input field. Select your preferred format — MP4, MP3, WebM — and your desired quality.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="8" y="2" width="8" height="4" rx="1" stroke="#E9A12A" strokeWidth="2" />
        <path d="M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2" stroke="#E9A12A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M9 12h6M9 16h4" stroke="#E9A12A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Click Download',
    desc: 'Hit the Download button. Our servers process the video and prepare your file — usually in under 5 seconds.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#E9A12A" strokeWidth="2" opacity="0.5" />
        <path d="M8 12l4 4 4-4M12 8v8" stroke="#E9A12A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Save to Your Device',
    desc: 'Your download starts automatically. Save the file wherever you like — no app or account required.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#E9A12A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M7 10l5 5 5-5M12 15V3" stroke="#E9A12A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <div className="min-h-screen pt-16" style={{ background: '#0E0E0E' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(233,161,42,0.07) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">

        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: '#E9A12A' }}>Guide</span>
          <h1 className="font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: '#F2EDE6' }}>
            How it works
          </h1>
          <p className="text-lg max-w-md leading-relaxed" style={{ color: '#8A8078', fontWeight: 300 }}>
            Four steps. No account, no software, no catch.
          </p>
        </div>

        <div className="flex gap-12 items-start">

          {/* Steps */}
          <div className="flex-1">
            {steps.map((step, i) => (
              <div key={step.n} className="flex gap-6 relative">
                {i < steps.length - 1 && (
                  <div
                    className="absolute w-px"
                    style={{
                      left: '27px', top: '68px',
                      height: 'calc(100% - 40px)',
                      background: 'linear-gradient(to bottom, rgba(233,161,42,0.2), rgba(233,161,42,0.03))',
                    }}
                  />
                )}

                {/* Icon block */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center relative"
                  style={{ background: '#161616', border: '1px solid rgba(233,161,42,0.15)' }}
                >
                  {step.icon}
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold"
                    style={{ background: '#0E0E0E', border: '1px solid #2A2A2A', color: '#504840' }}
                  >
                    {i + 1}
                  </span>
                </div>

                <div className="pb-12">
                  <h3 className="font-semibold text-base mb-1.5 mt-3" style={{ color: '#F2EDE6' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed max-w-md" style={{ color: '#8A8078', fontWeight: 300 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="w-52 flex-shrink-0 hidden md:flex flex-col gap-4 sticky top-24">
            <div
              className="rounded-xl p-5"
              style={{ background: '#161616', border: '1px solid rgba(233,161,42,0.12)' }}
            >
              <h4 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#504840' }}>Pro Tips</h4>
              {['Works with Shorts', 'Supports full playlists', 'No file size limits'].map((t, i) => (
                <div key={i} className="flex gap-2 items-start mb-2.5 text-xs leading-relaxed" style={{ color: '#8A8078' }}>
                  <span style={{ color: '#E9A12A', marginTop: '1px' }}>›</span>
                  {t}
                </div>
              ))}
            </div>
            <AdCard variant="vertical" />
          </aside>
        </div>
      </div>
    </div>
  )
}
