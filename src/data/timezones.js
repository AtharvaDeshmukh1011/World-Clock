// Fallback list for browsers without Intl.supportedValuesOf('timeZone').
// Also used to attach friendly city labels on top of raw IANA identifiers.
export const CURATED_TIMEZONES = [
  { timeZone: 'UTC', label: 'UTC' },
  { timeZone: 'Pacific/Honolulu', label: 'Honolulu' },
  { timeZone: 'America/Anchorage', label: 'Anchorage' },
  { timeZone: 'America/Los_Angeles', label: 'Los Angeles' },
  { timeZone: 'America/Denver', label: 'Denver' },
  { timeZone: 'America/Chicago', label: 'Chicago' },
  { timeZone: 'America/New_York', label: 'New York' },
  { timeZone: 'America/Sao_Paulo', label: 'São Paulo' },
  { timeZone: 'Atlantic/Reykjavik', label: 'Reykjavik' },
  { timeZone: 'Europe/London', label: 'London' },
  { timeZone: 'Europe/Paris', label: 'Paris' },
  { timeZone: 'Europe/Berlin', label: 'Berlin' },
  { timeZone: 'Europe/Athens', label: 'Athens' },
  { timeZone: 'Europe/Moscow', label: 'Moscow' },
  { timeZone: 'Africa/Cairo', label: 'Cairo' },
  { timeZone: 'Africa/Johannesburg', label: 'Johannesburg' },
  { timeZone: 'Asia/Dubai', label: 'Dubai' },
  { timeZone: 'Asia/Karachi', label: 'Karachi' },
  { timeZone: 'Asia/Kolkata', label: 'Mumbai / Delhi' },
  { timeZone: 'Asia/Dhaka', label: 'Dhaka' },
  { timeZone: 'Asia/Bangkok', label: 'Bangkok' },
  { timeZone: 'Asia/Shanghai', label: 'Shanghai' },
  { timeZone: 'Asia/Tokyo', label: 'Tokyo' },
  { timeZone: 'Asia/Seoul', label: 'Seoul' },
  { timeZone: 'Australia/Perth', label: 'Perth' },
  { timeZone: 'Australia/Sydney', label: 'Sydney' },
  { timeZone: 'Pacific/Auckland', label: 'Auckland' },
]

function cityLabelFromZone(zone) {
  const city = zone.split('/').pop() ?? zone
  return city.replace(/_/g, ' ')
}

export function getAvailableTimeZones() {
  if (typeof Intl.supportedValuesOf === 'function') {
    try {
      return Intl.supportedValuesOf('timeZone').map((timeZone) => ({
        timeZone,
        label: cityLabelFromZone(timeZone),
      }))
    } catch {
      // fall through to curated list
    }
  }
  return CURATED_TIMEZONES
}

export const DEFAULT_ZONE_IDS = [
  'America/New_York',
  'Europe/London',
  'Asia/Kolkata',
  'Asia/Tokyo',
]
