export default function AdCard({ variant = 'horizontal', title, desc }) {
  const isVertical = variant === 'vertical'
  const isSm = variant === 'horizontal-sm'

  const defaultTitle = isVertical ? 'Pro Video Editor' : 'CloudConvert — Convert Any Format'
  const defaultDesc = isVertical ? 'Edit, trim, export in seconds.' : 'MP4, MKV, AVI, WebM and 200+ more.'

  return (
    <div
      className={`relative rounded-xl transition-all duration-200 cursor-pointer group ${
        isSm ? 'p-3 flex items-center gap-3' :
        isVertical ? 'p-4' :
        'px-4 py-3 flex items-center gap-3'
      }`}
      style={{ background: '#141414', border: '1px solid #222' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(233,161,42,0.2)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#222' }}
    >
      <span className="absolute top-2 right-2.5 text-[9px] font-bold tracking-widest uppercase" style={{ color: '#333' }}>
        Ad
      </span>

      {/* Icon */}
      <div
        className={`rounded-lg flex items-center justify-center flex-shrink-0 ${
          isSm ? 'w-8 h-8' : isVertical ? 'w-full h-14 mb-3' : 'w-9 h-9'
        }`}
        style={{ background: '#1E1E1E', border: '1px solid #2A2A2A' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#E9A12A" strokeWidth="1.5" strokeLinejoin="round" opacity="0.8" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E9A12A" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <p className={`font-semibold leading-tight ${isSm ? 'text-xs pr-6' : 'text-sm pr-8'}`} style={{ color: '#C8BFB4' }}>
          {title || defaultTitle}
        </p>
        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#504840' }}>
          {desc || defaultDesc}
        </p>
        {isVertical && (
          <a href="#" onClick={e => e.preventDefault()}
            className="inline-block mt-2 text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-70"
            style={{ color: '#E9A12A' }}>
            Learn More →
          </a>
        )}
      </div>

      {!isVertical && !isSm && (
        <a href="#" onClick={e => e.preventDefault()}
          className="flex-shrink-0 text-xs font-semibold tracking-wide uppercase whitespace-nowrap transition-opacity hover:opacity-70"
          style={{ color: '#E9A12A' }}>
          Try Free →
        </a>
      )}
    </div>
  )
}
