import { useState } from 'react'
import AdCard from '../components/AdCard'

const faqs = [
  { q: 'Is YTGrab completely free?', a: 'Yes, entirely free. No account required, no watermarks, no hidden charges. Download as many videos as you need.' },
  { q: 'What formats and qualities are supported?', a: 'We support MP4 (up to 4K), MP3 (up to 320kbps), WebM, and MKV. Available qualities depend on the original video uploaded to YouTube.' },
  { q: 'Can I download YouTube Shorts or playlists?', a: 'Yes to both. For playlists, paste the playlist URL and choose to download all videos at once or select individual ones.' },
  { q: 'How long does a download take?', a: 'Most videos are ready in under 5 seconds. Longer 4K videos may take up to 20 seconds depending on your internet connection.' },
  { q: 'Is downloading YouTube videos legal?', a: "Downloading for personal, offline viewing is generally acceptable. Distributing or monetizing downloaded content may violate copyright law and YouTube's Terms of Service." },
  { q: 'Do you store my data or video files?', a: 'No. We process requests ephemerally — files are served directly and never stored. We do not log URLs or track users.' },
  { q: 'Why is my video unavailable for download?', a: 'Some videos are region-locked, age-restricted, or private. Live streams currently in progress are also not supported.' },
  { q: 'Does it work on mobile?', a: 'Yes. YTGrab works in any modern mobile browser. iPhone users can use the Files app to access downloads after saving.' },
]

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid #1E1E1E' }}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span
          className="text-sm font-medium leading-snug transition-colors"
          style={{ color: open ? '#F2EDE6' : '#C8BFB4' }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-base leading-none transition-all duration-200 font-light"
          style={{
            background: open ? 'rgba(233,161,42,0.1)' : '#1E1E1E',
            border: `1px solid ${open ? 'rgba(233,161,42,0.3)' : '#2A2A2A'}`,
            color: open ? '#E9A12A' : '#504840',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '200px' : '0' }}
      >
        <p className="pb-5 text-sm leading-relaxed max-w-xl" style={{ color: '#8A8078', fontWeight: 300 }}>{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="min-h-screen pt-16" style={{ background: '#0E0E0E' }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse 50% 40% at 20% 80%, rgba(233,161,42,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">

        <div className="mb-12">
          <span className="text-xs font-bold tracking-widest uppercase block mb-3" style={{ color: '#E9A12A' }}>FAQ</span>
          <h1 className="font-bold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem,5vw,3rem)', color: '#F2EDE6' }}>
            Common questions
          </h1>
          <p className="text-lg max-w-sm leading-relaxed" style={{ color: '#8A8078', fontWeight: 300 }}>
            Everything you need to know about YTGrab.
          </p>
        </div>

        <div className="flex gap-12 items-start">

          {/* Accordion */}
          <div
            className="flex-1 rounded-2xl px-6"
            style={{ background: '#111111', border: '1px solid #1E1E1E' }}
          >
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>

          {/* Sidebar */}
          <aside className="w-52 flex-shrink-0 hidden md:flex flex-col gap-4 sticky top-24">
            <div className="rounded-xl p-5" style={{ background: '#161616', border: '1px solid #272727' }}>
              <h4 className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#504840' }}>Still stuck?</h4>
              <p className="text-xs leading-relaxed mb-4" style={{ color: '#8A8078' }}>
                Can't find your answer? We read every message.
              </p>
              <a
                href="/about"
                className="inline-block px-4 py-2 text-xs font-semibold rounded-lg transition-all hover:opacity-80"
                style={{ background: '#E9A12A', color: '#0E0E0E' }}
              >
                Contact Us →
              </a>
            </div>
            <AdCard variant="vertical" />
          </aside>
        </div>

        <div className="mt-8 md:hidden">
          <AdCard variant="horizontal" />
        </div>
      </div>
    </div>
  )
}
