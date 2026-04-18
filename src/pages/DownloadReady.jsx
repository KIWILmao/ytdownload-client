import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchDownloadStatus } from '../lib/api'

export default function DownloadReady() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const ticket = state?.ticket
  const video = state?.session?.video

  const [job, setJob] = useState(ticket ? { id: ticket.jobId, status: ticket.status } : null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!ticket?.jobId) {
      navigate('/')
    }
  }, [navigate, ticket?.jobId])

  useEffect(() => {
    if (!ticket?.jobId) {
      return
    }

    let cancelled = false
    let timeoutId

    async function poll() {
      try {
        const data = await fetchDownloadStatus(ticket.jobId)
        if (cancelled) {
          return
        }

        setJob(data.job)
        setError('')

        if (data.job.status === 'queued' || data.job.status === 'downloading') {
          timeoutId = setTimeout(poll, 3000)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to check download status.')
          timeoutId = setTimeout(poll, 5000)
        }
      }
    }

    poll()

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [ticket?.jobId])

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0E0E0E', paddingTop: '64px' }}>
      <div className="w-full max-w-xl rounded-3xl p-8" style={{ background: '#141414', border: '1px solid #222' }}>
        <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: '#504840' }}>
          Download Status
        </p>
        <h1 className="text-2xl font-bold mb-3" style={{ color: '#F2EDE6' }}>
          {video?.title || 'Preparing your file'}
        </h1>
        <p className="text-sm mb-6" style={{ color: '#8A8078' }}>
          The Cloudflare Worker created your job. The downloader service is now preparing the file.
        </p>

        <div className="rounded-2xl p-4 mb-5" style={{ background: '#101010', border: '1px solid #1F1F1F' }}>
          <p className="text-xs mb-2" style={{ color: '#504840' }}>
            Job ID
          </p>
          <p className="text-sm break-all" style={{ color: '#C8BFB4' }}>
            {ticket?.jobId}
          </p>
        </div>

        <div className="rounded-2xl p-4 mb-6" style={{ background: '#101010', border: '1px solid #1F1F1F' }}>
          <p className="text-xs mb-2" style={{ color: '#504840' }}>
            Current Status
          </p>
          <p className="text-base font-semibold" style={{ color: job?.status === 'completed' ? '#E9A12A' : job?.status === 'failed' ? '#EF4444' : '#C8BFB4' }}>
            {job?.status || 'queued'}
          </p>
          {job?.error && (
            <p className="text-xs mt-3" style={{ color: '#EF4444' }}>
              {job.error}
            </p>
          )}
        </div>

        {job?.status === 'completed' && job?.downloadUrl ? (
          <a
            href={job.downloadUrl}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
            style={{ background: '#E9A12A', color: '#0E0E0E' }}
          >
            Download File
          </a>
        ) : (
          <div className="text-sm" style={{ color: '#8A8078' }}>
            {job?.status === 'failed'
              ? 'The job failed. Check the downloader setup and try again.'
              : 'This page refreshes automatically until the file is ready.'}
          </div>
        )}

        {error && (
          <p className="text-xs mt-4" style={{ color: '#EF4444' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
