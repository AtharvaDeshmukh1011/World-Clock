import { useEffect, useRef, useState } from 'react'

const TICK_INTERVAL_MS = 1000
const SMOOTH_INTERVAL_MS = 250

/**
 * Single shared ticking clock. Interval shortens slightly in "smooth" mode so
 * the CSS-driven second-hand sweep never visibly lags a real second, and
 * lengthens back to 1s in "tick" mode or when the tab is hidden / the user
 * prefers reduced motion, to avoid needless background work.
 */
export function useNow(animationMode = 'tick') {
  const [now, setNow] = useState(() => new Date())
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = media.matches
    const onChange = (e) => {
      prefersReducedMotion.current = e.matches
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    let intervalId = null

    const resolveInterval = () => {
      if (prefersReducedMotion.current || animationMode !== 'smooth') return TICK_INTERVAL_MS
      return SMOOTH_INTERVAL_MS
    }

    const start = () => {
      if (intervalId !== null) return
      setNow(new Date())
      intervalId = window.setInterval(() => setNow(new Date()), resolveInterval())
    }

    const stop = () => {
      if (intervalId === null) return
      window.clearInterval(intervalId)
      intervalId = null
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop()
      } else {
        start()
      }
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [animationMode])

  return now
}
