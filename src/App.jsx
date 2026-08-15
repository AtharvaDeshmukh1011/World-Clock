import { useEffect } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useNow } from './hooks/useNow'
import { TimeProvider } from './context/TimeContext'
import Header from './components/Header'
import ControlsBar from './components/ControlsBar'
import WorldClockGrid from './components/WorldClockGrid'
import AlarmManager from './components/AlarmManager'

export default function App() {
  const [theme, setTheme] = useLocalStorage('wcd:theme', 'light')
  const [hourCycle, setHourCycle] = useLocalStorage('wcd:hourCycle', '24')
  const [animationMode, setAnimationMode] = useLocalStorage('wcd:animationMode', 'smooth')

  const now = useNow(animationMode)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <TimeProvider now={now}>
      <div className="app">
        <Header />
        <ControlsBar
          theme={theme}
          onThemeChange={setTheme}
          hourCycle={hourCycle}
          onHourCycleChange={setHourCycle}
          animationMode={animationMode}
          onAnimationModeChange={setAnimationMode}
        />
        <main className="app__main">
          <WorldClockGrid hourCycle={hourCycle} animationMode={animationMode} />
          <AlarmManager />
        </main>
      </div>
    </TimeProvider>
  )
}
