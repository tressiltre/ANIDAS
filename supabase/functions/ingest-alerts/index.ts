import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const requestData = await req.json();
    console.log('Received alert data:', requestData);

    // Handle both single alert and bulk alerts
    const alerts = Array.isArray(requestData) ? requestData : [requestData];
    
    // Transform and insert alerts
    const transformedAlerts = alerts.map((alert: any) => ({
      timestamp: alert.timestamp || new Date().toISOString(),
      severity: alert.severity || 'medium',
      signature: alert.signature || alert.alert?.signature || 'Unknown',
      source_ip: alert.src_ip || alert.source_ip || alert.alert?.source?.ip || '0.0.0.0',
      dest_ip: alert.dest_ip || alert.dest_ip || alert.alert?.target?.ip || '0.0.0.0',
      protocol: alert.proto || alert.protocol || 'UNKNOWN',
      category: alert.alert?.category || alert.category || 'Unknown',
      src_port: alert.src_port || alert.source_port || null,
      dest_port: alert.dest_port || alert.dest_port || null,
      payload: alert.payload || null,
      metadata: alert.metadata || alert
    }));

    const { data, error } = await supabaseClient
      .from('alerts')
      .insert(transformedAlerts)
      .select();

    if (error) {
      console.error('Error inserting alerts:', error);
      throw error;
    }

    console.log(`Successfully inserted ${data.length} alerts`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        inserted: data.length,
        alerts: data
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error: any) {
    console.error('Error in ingest-alerts function:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error occurred' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});