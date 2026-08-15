import { useMemo, useState } from 'react'
import { getAvailableTimeZones } from '../data/timezones'

export default function TimezoneSelector({ existingZoneIds, onAdd }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const allZones = useMemo(() => getAvailableTimeZones(), [])

  const matches = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim().toLowerCase()
    return allZones
      .filter(
        (z) =>
          !existingZoneIds.includes(z.timeZone) &&
          (z.timeZone.toLowerCase().includes(q) || z.label.toLowerCase().includes(q)),
      )
      .slice(0, 8)
  }, [allZones, query, existingZoneIds])

  function handleSelect(zone) {
    onAdd(zone)
    setQuery('')
    setOpen(false)
  }

  return (
    <div className="tz-selector">
      <input
        type="text"
        className="tz-selector__input"
        placeholder="Add a city or timezone..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        aria-label="Search for a timezone to add"
      />
      {open && matches.length > 0 && (
        <ul className="tz-selector__results" role="listbox">
          {matches.map((zone) => (
            <li key={zone.timeZone}>
              <button type="button" onMouseDown={() => handleSelect(zone)}>
                <span>{zone.label}</span>
                <span className="tz-selector__zone-id">{zone.timeZone}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim() && matches.length === 0 && (
        <div className="tz-selector__results tz-selector__results--empty">No matches</div>
      )}
    </div>
  )
}
