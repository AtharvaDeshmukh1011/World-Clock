import { useLayoutEffect, useRef, useState } from 'react'
import { useTime } from '../context/TimeContext'
import { getZonedParts } from '../utils/time'

const TICK_MARKS = Array.from({ length: 60 }, (_, i) => i)

function useHandAngles({ hour, minute, second, ms }) {
  const prevRef = useRef({ hour, minute, second })
  const [suppressTransition, setSuppressTransition] = useState(false)

  useLayoutEffect(() => {
    const prev = prevRef.current
    const wrapped = second < prev.second || minute < prev.minute || hour < prev.hour
    prevRef.current = { hour, minute, second }
    if (wrapped) {
      setSuppressTransition(true)
      const id = requestAnimationFrame(() => setSuppressTransition(false))
      return () => cancelAnimationFrame(id)
    }
  }, [hour, minute, second])

  return {
    hourDeg: (hour % 12) * 30 + minute * 0.5,
    minuteDeg: minute * 6 + second * 0.1,
    secondDeg: second * 6 + ms * 0.006,
    suppressTransition,
  }
}

export default function AnalogClock({ timeZone, animationMode = 'tick', size = 180 }) {
  const now = useTime()
  const zoned = getZonedParts(now, timeZone)
  const { hourDeg, minuteDeg, secondDeg, suppressTransition } = useHandAngles(zoned)

  const smooth = animationMode === 'smooth' && !suppressTransition
  const transition = smooth ? 'transform 0.25s linear' : 'none'

  return (
    <svg
      className="analog-clock"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Analog clock face"
    >
      <circle className="analog-clock__face" cx="50" cy="50" r="48" />
      {TICK_MARKS.map((i) => {
        const isHour = i % 5 === 0
        const angle = i * 6
        return (
          <line
            key={i}
            className={isHour ? 'analog-clock__tick analog-clock__tick--hour' : 'analog-clock__tick'}
            x1="50"
            y1={isHour ? '6' : '8'}
            x2="50"
            y2="12"
            transform={`rotate(${angle} 50 50)`}
          />
        )
      })}
      <line
        className="analog-clock__hand analog-clock__hand--hour"
        x1="50"
        y1="50"
        x2="50"
        y2="26"
        style={{
          transform: `rotate(${hourDeg}deg)`,
          transition,
          transformBox: 'view-box',
          transformOrigin: '50px 50px',
        }}
      />
      <line
        className="analog-clock__hand analog-clock__hand--minute"
        x1="50"
        y1="50"
        x2="50"
        y2="16"
        style={{
          transform: `rotate(${minuteDeg}deg)`,
          transition,
          transformBox: 'view-box',
          transformOrigin: '50px 50px',
        }}
      />
      <line
        className="analog-clock__hand analog-clock__hand--second"
        x1="50"
        y1="58"
        x2="50"
        y2="12"
        style={{
          transform: `rotate(${secondDeg}deg)`,
          transition,
          transformBox: 'view-box',
          transformOrigin: '50px 50px',
        }}
      />
      <circle className="analog-clock__pivot" cx="50" cy="50" r="2.4" />
    </svg>
  )
}
