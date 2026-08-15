import { useTime } from '../context/TimeContext'
import { formatDateLabel, formatDigitalTime } from '../utils/time'

export default function DigitalClock({ timeZone, hourCycle = '24' }) {
  const now = useTime()

  return (
    <div className="digital-clock">
      <span className="digital-clock__time">{formatDigitalTime(now, timeZone, hourCycle)}</span>
      <span className="digital-clock__date">{formatDateLabel(now, timeZone)}</span>
    </div>
  )
}
