export default function AlarmList({ alarms, firingIds, onToggle, onDelete, onDismiss }) {
  if (alarms.length === 0) {
    return <p className="alarm-list__empty">No alarms set — add one above.</p>
  }

  const sorted = [...alarms].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <ul className="alarm-list">
      {sorted.map((alarm) => {
        const isFiring = firingIds.has(alarm.id)
        return (
          <li key={alarm.id} className={isFiring ? 'alarm-item alarm-item--firing' : 'alarm-item'}>
            <div className="alarm-item__info">
              <span className="alarm-item__time">{alarm.time}</span>
              <span className="alarm-item__label">{alarm.label}</span>
              <span className="alarm-item__zone">{alarm.timeZone}</span>
            </div>
            <div className="alarm-item__actions">
              {isFiring && (
                <button type="button" className="alarm-item__dismiss" onClick={() => onDismiss(alarm.id)}>
                  Dismiss
                </button>
              )}
              <label className="alarm-item__toggle">
                <input
                  type="checkbox"
                  checked={alarm.enabled}
                  onChange={() => onToggle(alarm.id)}
                  aria-label={`Enable ${alarm.label}`}
                />
                <span>{alarm.enabled ? 'On' : 'Off'}</span>
              </label>
              <button type="button" onClick={() => onDelete(alarm.id)} aria-label={`Delete ${alarm.label}`}>
                Delete
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
