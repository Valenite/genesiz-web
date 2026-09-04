// Lightweight Supabase REST helper using native fetch
// Environment variables: VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
