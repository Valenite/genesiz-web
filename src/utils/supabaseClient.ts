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
    console.warn('[GENESIZ Sync] Missing Supabase URL or Anon Key');
    return false;
  }

  const endpoint = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/registrations?on_conflict=id`;
  const body = JSON.stringify(payload);
  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    // return=minimal: Supabase won't try to SELECT back the row (avoids RLS SELECT policy blocks)
    'Prefer': 'resolution=merge-duplicates,return=minimal',
  };

  // Try up to 3 times with increasing delays
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body,
        signal: controller.signal,
        // keepalive: request survives even if user closes tab mid-registration
        keepalive: true,
      });

      clearTimeout(timeoutId);

      if (response.ok || response.status === 201 || response.status === 204) {
        console.log(`[GENESIZ Sync] ✓ Synced ${payload.id} to Supabase (attempt ${attempt})`);
        return true;
      }

      const errText = await response.text();
      console.warn(`[GENESIZ Sync] Attempt ${attempt} failed: ${response.status}`, errText);

    } catch (err) {
      console.warn(`[GENESIZ Sync] Attempt ${attempt} network error:`, err);
    }

    // Wait before retry: 1s, 2s
    if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 1000));
  }

  console.error('[GENESIZ Sync] All 3 attempts failed for:', payload.id);
  return false;
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
