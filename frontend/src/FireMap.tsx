import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from 'react-leaflet'
import type { Fire } from './types'

type FireMapProps = {
  fires: Fire[]
}

export default function FireMap({ fires }: FireMapProps) {
  return (
    <MapContainer
      center={[39, -98]}
      zoom={4}
      className="fire-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {fires.map((fire) => (
        <CircleMarker
          key={fire.id}
          center={[fire.latitude, fire.longitude]}
          radius={8}
          pathOptions={{
            color: '#b91c1c',
            fillColor: '#ef4444',
            fillOpacity: 0.8,
          }}
        >
          <Popup>
            <strong>{fire.id}</strong>
            <br />
            Fictional sample location
            <br />
            Latitude: {fire.latitude}
            <br />
            Longitude: {fire.longitude}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}