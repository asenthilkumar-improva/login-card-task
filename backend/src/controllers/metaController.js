export function getServiceInfo(_req, res) {
  res.json({
    environment: 'Node + MongoDB API',
    serviceStatus: 'Healthy',
    loadedAt: new Date().toLocaleString(),
  })
}
