import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(14,14,14,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(233,161,42,0.1)' : '1px solid transparent',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              style={{ background: '#E9A12A' }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <polygon points="5,3 5,12 12,7.5" fill="#0E0E0E" />
              </svg>
            </div>
            <span className="font-bold text-[15px] tracking-tight" style={{ color: '#F2EDE6' }}>
              YTGrab
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive ? 'text-mustard' : ''
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? '#E9A12A' : '#8A8078',
                  })}
                  onMouseEnter={e => { if (!e.currentTarget.getAttribute('aria-current')) e.currentTarget.style.color = '#F2EDE6' }}
                  onMouseLeave={e => { if (!e.currentTarget.getAttribute('aria-current')) e.currentTarget.style.color = '#8A8078' }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150 hover:scale-105 active:scale-95"
            style={{
              background: '#E9A12A',
              color: '#0E0E0E',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#D4901A'}
            onMouseLeave={e => e.currentTarget.style.background = '#E9A12A'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 3v13M6 11l6 6 6-6M3 20h18" stroke="#0E0E0E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Free
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: '#F2EDE6' }}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block h-0.5 rounded transition-all duration-200"
                  style={{
                    background: '#F2EDE6',
                    transform: open
                      ? i === 0 ? 'translateY(8px) rotate(45deg)'
                      : i === 2 ? 'translateY(-8px) rotate(-45deg)'
                      : 'none'
                      : 'none',
                    opacity: open && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#0E0E0E' }}
      >
        {navLinks.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className="text-3xl font-bold tracking-tight transition-colors"
            style={({ isActive }) => ({ color: isActive ? '#E9A12A' : '#F2EDE6' })}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </>
  )
}
