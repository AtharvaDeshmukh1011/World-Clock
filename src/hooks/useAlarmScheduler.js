import { useEffect, useRef, useState } from 'react'
import { formatHHMM } from '../utils/time'
import { playAlarmSound } from '../utils/beep'

/**
 * Watches `alarms` against the ticking `now` and fires each enabled alarm at
 * most once per minute-match (tracked per alarm id so toggling/editing other
 * alarms doesn't cause a refire). Returns the currently-firing alarm ids plus
 * a dismiss function for the UI to acknowledge/silence one.
 */
export function useAlarmScheduler(alarms, now) {
  const [firingIds, setFiringIds] = useState(() => new Set())
  const lastFiredKey = useRef(new Map()) // alarmId -> "YYYY-MM-DD HH:mm" already fired

  useEffect(() => {
    const dateKey = now.toDateString()
    const newlyFiring = []

    for (const alarm of alarms) {
      if (!alarm.enabled) continue
      const currentHHMM = formatHHMM(now, alarm.timeZone)
      if (currentHHMM !== alarm.time) continue

      const key = `${dateKey} ${currentHHMM}`
      if (lastFiredKey.current.get(alarm.id) === key) continue

      lastFiredKey.current.set(alarm.id, key)
      newlyFiring.push(alarm.id)
    }

    if (newlyFiring.length > 0) {
      setFiringIds((prev) => {
        const next = new Set(prev)
        newlyFiring.forEach((id) => next.add(id))
        return next
      })
      playAlarmSound()
    }
  }, [now, alarms])

  const dismissAlarm = (id) => {
    setFiringIds((prev) => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return { firingIds, dismissAlarm }
}
