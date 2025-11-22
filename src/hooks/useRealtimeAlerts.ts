import { useEffect, useState } from 'react'
export const useRealtimeAlerts = () => {
  const [alerts] = useState([])
  useEffect(() => {}, [])
  return alerts
}
