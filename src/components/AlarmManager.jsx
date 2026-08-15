import { useEffect, useRef } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useAlarmScheduler } from '../hooks/useAlarmScheduler'
import { useTime } from '../context/TimeContext'
import { primeAudio } from '../utils/beep'
import AlarmForm from './AlarmForm'
import AlarmList from './AlarmList'

export default function AlarmManager() {
  const now = useTime()
  const [alarms, setAlarms] = useLocalStorage('wcd:alarms', [])
  const { firingIds, dismissAlarm } = useAlarmScheduler(alarms, now)
  const primed = useRef(false)

  useEffect(() => {
    function handleFirstGesture() {
      if (primed.current) return
      primed.current = true
      primeAudio()
      window.removeEventListener('pointerdown', handleFirstGesture)
      window.removeEventListener('keydown', handleFirstGesture)
    }
    window.addEventListener('pointerdown', handleFirstGesture)
    window.addEventListener('keydown', handleFirstGesture)
    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture)
      window.removeEventListener('keydown', handleFirstGesture)
    }
  }, [])

  function addAlarm(alarm) {
    setAlarms((prev) => [...prev, alarm])
  }

  function toggleAlarm(id) {
    setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)))
  }

  function deleteAlarm(id) {
    setAlarms((prev) => prev.filter((a) => a.id !== id))
    dismissAlarm(id)
  }

  const firingAlarms = alarms.filter((a) => firingIds.has(a.id))

  return (
    <section className="alarm-manager" aria-label="Alarms">
      <h2>Alarms</h2>
      {firingAlarms.length > 0 && (
        <div className="alarm-banner" role="alert">
          {firingAlarms.map((a) => (
            <div key={a.id} className="alarm-banner__item">
              <span>
                {a.label} &mdash; {a.time} ({a.timeZone})
              </span>
              <button type="button" onClick={() => dismissAlarm(a.id)}>
                Dismiss
              </button>
            </div>
          ))}
        </div>
      )}
      <AlarmForm onAdd={addAlarm} />
      <AlarmList
        alarms={alarms}
        firingIds={firingIds}
        onToggle={toggleAlarm}
        onDelete={deleteAlarm}
        onDismiss={dismissAlarm}
      />
    </section>
  )
}
