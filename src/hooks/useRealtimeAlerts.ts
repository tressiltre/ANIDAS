import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import type { Database } from '@/integrations/supabase/types'

type Alert = Database['public']['Tables']['alerts']['Row']

export interface DashboardAlert {
  id: string
  timestamp: string
  severity: string
  signature: string
  sourceIp: string
  destIp: string
  protocol: string
  category: string
  srcPort?: number | null
  destPort?: number | null
  payload?: string | null
}

const mapAlert = (alert: Alert): DashboardAlert => ({
  id: alert.id,
  timestamp: new Date(alert.timestamp).toLocaleString(),
  severity: alert.severity,
  signature: alert.signature,
  sourceIp: alert.source_ip,
  destIp: alert.dest_ip,
  protocol: alert.protocol,
  category: alert.category,
  srcPort: alert.src_port,
  destPort: alert.dest_port,
  payload: alert.payload,
})

export const useRealtimeAlerts = () => {
  const [alerts, setAlerts] = useState<DashboardAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch initial alerts
    const fetchAlerts = async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Error fetching alerts:', error)
        setLoading(false)
        return
      }

      setAlerts(data.map(mapAlert))
      setLoading(false)
    }

    fetchAlerts()

    // Subscribe to realtime updates
    const channel = supabase
      .channel('alerts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'alerts'
        },
        (payload) => {
          const newAlert = mapAlert(payload.new as Alert)
          setAlerts((prev) => [newAlert, ...prev].slice(0, 100))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { alerts, loading }
}