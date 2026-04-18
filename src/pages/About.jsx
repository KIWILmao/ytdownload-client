export default function About() {
  return (
    <div className="min-h-screen pt-16" style={{ background: '#0E0E0E' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(233,161,42,0.07) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">

        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: '#E9A12A' }}>About</span>
          <h1 className="font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: '#F2EDE6' }}>
            Built for everyone.
          </h1>
          <p className="text-lg max-w-lg leading-relaxed" style={{ color: '#8A8078', fontWeight: 300 }}>
            YTGrab is a free, no-nonsense YouTube downloader. Saving a video for offline use should be as simple as pressing a button.
          </p>
        </div>

        {/* Two-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Left: About */}
          <div>
            <p className="text-sm leading-loose mb-4" style={{ color: '#8A8078', fontWeight: 300 }}>
              We support high-resolution video downloads up to 4K and audio extraction up to 320kbps MP3.
              Our infrastructure processes requests instantly and never stores your data.
            </p>
            <p className="text-sm leading-loose mb-12" style={{ color: '#8A8078', fontWeight: 300 }}>
              No ads in the download flow, no watermarks, no account walls. We're funded by the small sponsored
              cards you see on the site — never by your data.
            </p>

            {/* Principles */}
            <h3 className="text-xs font-bold tracking-widest uppercase mb-5" style={{ color: '#504840' }}>
              What We Stand For
            </h3>
            <div className="space-y-3">
              {[
                { icon: '⚡', label: 'Speed', desc: 'Most downloads start in under 5 seconds.' },
                { icon: '🔒', label: 'Privacy', desc: 'No logs, no tracking, no accounts.' },
                { icon: '∞', label: 'Always free', desc: 'Core features will never be paywalled.' },
                { icon: '⚙️', label: 'Reliability', desc: '99.9% uptime. Just works.' },
              ].map(v => (
                <div
                  key={v.label}
                  className="flex gap-3 items-start p-4 rounded-xl"
                  style={{ background: '#161616', border: '1px solid #1E1E1E' }}
                >
                  <span className="text-base leading-none mt-0.5">{v.icon}</span>
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: '#F2EDE6' }}>{v.label}</div>
                    <div className="text-xs leading-relaxed" style={{ color: '#8A8078' }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats + links */}
          <div className="flex flex-col gap-8">

            {/* Stats block */}
            <div
              className="rounded-2xl p-8 grid grid-cols-2 gap-8"
              style={{ background: '#111111', border: '1px solid #1E1E1E' }}
            >
              {[
                { num: '50M+', label: 'Downloads served' },
                { num: '4K', label: 'Max resolution' },
                { num: '320kbps', label: 'Audio quality' },
                { num: '<5s', label: 'Avg processing' },
              ].map(s => (
                <div key={s.num}>
                  <div className="text-2xl font-bold mb-1" style={{ color: '#E9A12A' }}>{s.num}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: '#504840' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Formats */}
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#504840' }}>
                Supported Formats
              </h3>
              <div className="flex flex-wrap gap-2">
                {['MP4', 'MP3', 'WebM', 'MKV', '4K', '1080p', '720p', '480p', '360p', '320kbps'].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-semibold"
                    style={{ background: '#161616', border: '1px solid #272727', color: '#C8BFB4' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
