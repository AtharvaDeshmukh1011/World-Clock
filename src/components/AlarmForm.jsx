import { useState } from 'react'
import { CURATED_TIMEZONES } from '../data/timezones'
import { guessLocalTimeZone } from '../utils/time'

const LOCAL_ZONE = guessLocalTimeZone()

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `alarm-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function AlarmForm({ onAdd }) {
  const [time, setTime] = useState('07:00')
  const [label, setLabel] = useState('')
  const [timeZone, setTimeZone] = useState(LOCAL_ZONE)

  function handleSubmit(e) {
    e.preventDefault()
    if (!time) return
    onAdd({
      id: generateId(),
      time,
      label: label.trim() || 'Alarm',
      timeZone,
      enabled: true,
    })
    setLabel('')
  }

  return (
    <form className="alarm-form" onSubmit={handleSubmit}>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        aria-label="Alarm time"
      />
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Label (optional)"
        aria-label="Alarm label"
        maxLength={40}
      />
      <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} aria-label="Alarm timezone">
        <option value={LOCAL_ZONE}>Local ({LOCAL_ZONE})</option>
        {CURATED_TIMEZONES.filter((z) => z.timeZone !== LOCAL_ZONE).map((z) => (
          <option key={z.timeZone} value={z.timeZone}>
            {z.label}
          </option>
        ))}
      </select>
      <button type="submit">Add Alarm</button>
    </form>
  )
}
