import { createContext, useContext } from 'react'

const TimeContext = createContext(new Date())

export function TimeProvider({ now, children }) {
  return <TimeContext.Provider value={now}>{children}</TimeContext.Provider>
}

export function useTime() {
  return useContext(TimeContext)
}
