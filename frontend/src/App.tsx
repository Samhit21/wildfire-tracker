import { useEffect, useState } from 'react'
import FireMap from './FireMap'

import type { Fire } from './types'

export default function App() {
  const [status, setStatus] = useState('Connecting…')
  const [fires, setFires] = useState<Fire[]>([])
  const [fireMessage, setFireMessage] = useState('Loading sample fires…')

  useEffect(() => {
  const controller = new AbortController()

  async function loadFires() {
    try {
      const response = await fetch('/api/fires', {
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('Fire request failed')
      }

      const data: { fires: Fire[] } = await response.json()

      setFires(data.fires)
      setFireMessage(
        data.fires.length > 0
          ? 'Fictional sample data'
          : 'No sample locations found',
      )
    } catch {
      if (!controller.signal.aborted) {
        setFireMessage('Could not load fire locations')
      }
    }
  }

  async function checkBackend() {
    try {
      const response = await fetch('/api/health', {
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error('Health request failed')
      }

      const data = await response.json()

      if (data.status !== 'ok') {
        throw new Error('Unexpected health response')
      }

      setStatus('Backend connected')
    } catch {
      if (!controller.signal.aborted) {
        setStatus('Cannot reach backend')
      }
    }
  }

  void loadFires()
  void checkBackend()

  return () => controller.abort()
}, [])

  return (
    <main>
      <div className="intro">
      <h1>Wildfire Monitor</h1>
      <p role="status">{status}</p>

      <section aria-labelledby="fires-heading"> 
        <h2 id="fires-heading">Sample Fire Locations</h2>
        <p role="status">{fireMessage}</p>

        <ul>
          {fires.map((fire) => (
            <li key={fire.id}>
              {fire.latitude}, {fire.longitude}
            </li>
          ))}
        </ul>
        <FireMap fires={fires} />
      </section>
    </div>
  </main>
)
}
