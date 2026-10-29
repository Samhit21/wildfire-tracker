import { parse } from 'csv-parse/sync'

export type FireDetection = {
  id: string
  latitude: number
  longitude: number
}

export async function fetchFireDetections(): Promise<FireDetection[]> {
  const apiKey = process.env.FIRMS_MAP_KEY?.trim()

  if (!apiKey) {
    throw new Error('FIRMS_MAP_KEY is not configured')
  }

  const source = 'VIIRS_SNPP_NRT'
  const area = '-125,24,-66,50'
  const days = 3

  const url =
    'https://firms.modaps.eosdis.nasa.gov/api/area/csv/' +
    `${encodeURIComponent(apiKey)}/${source}/${area}/${days}`

  const response = await fetch(url, {
    signal: AbortSignal.timeout(15_000),
  })

  if (!response.ok) {
    throw new Error(`NASA FIRMS returned HTTP ${response.status}`)
  }

  const csv = await response.text()

    const requiredColumns = [
    'latitude',
    'longitude',
    'acq_date',
    'acq_time',
    'satellite',
  ]

  let headersChecked = false

  const rows: Record<string, string>[] = parse(csv, {
    bom: true,
    trim: true,
    skip_empty_lines: true,
    columns: (headers: string[]) => {
      const hasRequiredColumns = requiredColumns.every((column) =>
        headers.includes(column),
      )

      if (!hasRequiredColumns) {
        throw new Error('NASA FIRMS response is missing required columns')
      }

      headersChecked = true
      return headers
    },
  })

  if (!headersChecked) {
    throw new Error('NASA FIRMS returned an empty response without CSV headers')
  }

  return rows.map((row) => {
    const latitude = Number(row.latitude)
    const longitude = Number(row.longitude)

    if (
      !row.latitude ||
      !row.longitude ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180 ||
      !row.acq_date ||
      !row.acq_time ||
      !row.satellite
    ) {
      throw new Error('NASA FIRMS returned an invalid detection')
    }

    const id = [
      source,
      row.satellite,
      row.acq_date,
      row.acq_time.padStart(4, '0'),
      latitude,
      longitude,
    ].join(':')

    return {
      id,
      latitude,
      longitude,
    }
  })
}