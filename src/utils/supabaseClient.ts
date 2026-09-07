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
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/registrations`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return false;
    }

    console.log('[GENESIZ Sync] Synced team registration to Supabase');
    return true;
  } catch {
    return false;
  }
}

export async function fetchTeamFromSupabase(
  searchInput: string, 
  teamPassword: string
): Promise<SupabaseRegistrationPayload | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  try {
    const cleanInput = searchInput.trim();
    const cleanPass = teamPassword.trim();
    
    // Single combined PostgREST query: leader_email matches OR id matches
    const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/registrations?team_password=eq.${encodeURIComponent(cleanPass)}&or=(leader_email.ilike.${encodeURIComponent(cleanInput)},id.eq.${encodeURIComponent(cleanInput.toUpperCase())})&select=*`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data: SupabaseRegistrationPayload[] = await response.json();
    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  } catch (err) {
    return null;
  }
}
