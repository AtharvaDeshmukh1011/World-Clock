import { useLocalStorage } from '../hooks/useLocalStorage'
import { CURATED_TIMEZONES, DEFAULT_ZONE_IDS } from '../data/timezones'
import ClockCard from './ClockCard'
import TimezoneSelector from './TimezoneSelector'

function labelForZone(timeZone) {
  const known = CURATED_TIMEZONES.find((z) => z.timeZone === timeZone)
  if (known) return known.label
  return timeZone.split('/').pop().replace(/_/g, ' ')
}

const DEFAULT_ZONES = DEFAULT_ZONE_IDS.map((timeZone) => ({
  id: timeZone,
  timeZone,
  label: labelForZone(timeZone),
}))

export default function WorldClockGrid({ hourCycle, animationMode }) {
  const [zones, setZones] = useLocalStorage('wcd:zones', DEFAULT_ZONES)

  function addZone(zone) {
    setZones((prev) => [...prev, { id: zone.timeZone, timeZone: zone.timeZone, label: zone.label }])
  }

  function removeZone(id) {
    setZones((prev) => prev.filter((z) => z.id !== id))
  }

  return (
    <section className="world-clock" aria-label="World clock">
      <div className="world-clock__toolbar">
        <h2>World Clock</h2>
        <TimezoneSelector existingZoneIds={zones.map((z) => z.timeZone)} onAdd={addZone} />
      </div>
      {zones.length === 0 ? (
        <p className="world-clock__empty">No timezones added yet — search above to add one.</p>
      ) : (
        <div className="world-clock__grid">
          {zones.map((zone) => (
            <ClockCard
              key={zone.id}
              zone={zone}
              hourCycle={hourCycle}
              animationMode={animationMode}
              onRemove={removeZone}
              removable
            />
          ))}
        </div>
      )}
    </section>
  )
}
