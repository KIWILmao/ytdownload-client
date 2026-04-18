import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import FAQ from './pages/FAQ'
import About from './pages/About'
import AdGate from './pages/AdGate'
import FormatSelect from './pages/FormatSelect'
import DownloadReady from './pages/DownloadReady'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/go" element={<AdGate step={1} />} />
        <Route path="/select" element={<FormatSelect />} />
        <Route path="/go/download" element={<AdGate step={2} />} />
        <Route path="/download-ready" element={<DownloadReady />} />
      </Routes>
    </>
  )
}
