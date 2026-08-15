import { useTime } from '../context/TimeContext'
import { getUtcOffsetLabel, getZoneAbbreviation } from '../utils/time'
import AnalogClock from './AnalogClock'
import DigitalClock from './DigitalClock'

export default function ClockCard({ zone, hourCycle, animationMode, onRemove, removable }) {
  const now = useTime()
  const offset = getUtcOffsetLabel(now, zone.timeZone)
  const abbreviation = getZoneAbbreviation(now, zone.timeZone)

  return (
    <article className="clock-card">
      {removable && (
        <button
          type="button"
          className="clock-card__remove"
          onClick={() => onRemove(zone.id)}
          aria-label={`Remove ${zone.label}`}
          title="Remove"
        >
          &times;
        </button>
      )}
      <h3 className="clock-card__title">{zone.label}</h3>
      <AnalogClock timeZone={zone.timeZone} animationMode={animationMode} size={150} />
      <DigitalClock timeZone={zone.timeZone} hourCycle={hourCycle} />
      <p className="clock-card__meta">
        {abbreviation} &middot; {offset}
      </p>
    </article>
  )
}
