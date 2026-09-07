// Lightweight Supabase REST helper using native fetch
// Environment variables: VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lzhcrjlqncrvnoxiszyt.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGNyamxxbmNydm5veGlzenl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MjI2MzcsImV4cCI6MjEwNDA5ODYzN30.arJWv-rbbu-Rbo3rsWMzEDbhc4Q_rYF5SdVhiKwDrtY';

export interface SupabaseRegistrationPayload {
  id: string;
  leader_name: string;
  leader_email: string;
  team_password: string;
  team_name: string;
  institution: string;
  discord_tag?: string;
  selected_events: string[];
  selected_event_names: string[];
  members: any[];
  created_at: string;
}

export async function syncRegistrationToSupabase(payload: SupabaseRegistrationPayload): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[GENESIZ Sync] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not configured. Registration saved to LocalStorage only.');
    return false;
  }

  try {
    const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/registrations`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[GENESIZ Sync] Supabase sync error:', errText);
      return false;
    }

    console.log('[GENESIZ Sync] Successfully synced registration to Supabase database!');
    return true;
  } catch (err) {
    console.error('[GENESIZ Sync] Network failure syncing to Supabase:', err);
    return false;
  }
}

export async function fetchTeamFromSupabase(
  leaderEmail: string, 
  teamPassword: string
): Promise<SupabaseRegistrationPayload | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  try {
    const cleanEmail = leaderEmail.trim().toLowerCase();
    const cleanPass = teamPassword.trim();
    
    const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/registrations?leader_email=ilike.${encodeURIComponent(cleanEmail)}&team_password=eq.${encodeURIComponent(cleanPass)}&select=*`;
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error('[GENESIZ Sync] Failed to query Supabase team:', await response.text());
      return null;
    }

    const data: SupabaseRegistrationPayload[] = await response.json();
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (err) {
    console.error('[GENESIZ Sync] Error fetching team from Supabase:', err);
    return null;
  }
}

export async function fetchTeamByOperativeIdFromSupabase(
  operativeId: string,
  teamPassword: string
): Promise<SupabaseRegistrationPayload | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  try {
    const cleanId = operativeId.trim().toUpperCase();
    const cleanPass = teamPassword.trim();

    const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/registrations?id=eq.${encodeURIComponent(cleanId)}&team_password=eq.${encodeURIComponent(cleanPass)}&select=*`;

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) return null;
    const data: SupabaseRegistrationPayload[] = await response.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (err) {
    console.error('[GENESIZ Sync] Error fetching team by ID from Supabase:', err);
    return null;
  }
}
