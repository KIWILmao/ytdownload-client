const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "")

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok || data?.ok === false) {
    throw new Error(data?.error || "Request failed.")
  }

  return data
}

export function resolveVideo(url) {
  return request("/api/resolve", {
    method: "POST",
    body: JSON.stringify({ url }),
  })
}

export function fetchAdConfig() {
  return request("/api/ad-config")
}

export function createDownloadTicket(payload) {
  return request("/api/download-ticket", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function fetchDownloadStatus(jobId) {
  return request(`/api/download-status/${jobId}`)
}

export { API_BASE_URL }
