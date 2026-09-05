import { syncRegistrationToSupabase } from './supabaseClient';

export interface TeamMemberRecord {
  name: string;
  email: string;
  discordTag?: string;
  joinedAt: string;
}

export interface RegistrationRecord {
  id: string; // e.g. GSZ-2026-8A3F
  leaderName: string;
  leaderEmail: string;
  teamPassword: string;
  teamName: string;
  institution: string;
  discordTag?: string;
  selectedEvents: string[]; // event IDs
  selectedEventNames: string[];
  members: TeamMemberRecord[];
  createdAt: string;
}

const STORAGE_KEY = 'genesiz_registrations_v2';

export const getRegistrations = (): RegistrationRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read registrations from storage:', err);
    return [];
  }
};

export const saveRegistrations = (records: RegistrationRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save registrations:', err);
  }
};

export const registerNewTeam = (data: {
  leaderName: string;
  leaderEmail: string;
  teamPassword: string;
  teamName: string;
  institution: string;
  discordTag?: string;
  selectedEvents: string[];
  selectedEventNames: string[];
}): RegistrationRecord => {
  const records = getRegistrations();
  const cleanEmail = data.leaderEmail.trim().toLowerCase();
  const cleanPass = data.teamPassword.trim();

  // Check if an existing team matches this leader email & team password (update mode)
  const existingIndex = records.findIndex(
    (r) => r.leaderEmail === cleanEmail && r.teamPassword === cleanPass
  );

  let recordToSave: RegistrationRecord;

  if (existingIndex !== -1) {
    // Update existing team registration (Preserve Operative ID and existing members)
    const existing = records[existingIndex];
    recordToSave = {
      ...existing,
      leaderName: data.leaderName.trim(),
      teamName: data.teamName.trim() || existing.teamName,
      institution: data.institution.trim() || existing.institution,
      discordTag: data.discordTag?.trim() || existing.discordTag,
      selectedEvents: data.selectedEvents,
      selectedEventNames: data.selectedEventNames,
    };
    records[existingIndex] = recordToSave;
    console.log(`[Registration Storage] Updated existing Operative Code ${recordToSave.id} with new events:`, data.selectedEvents);
  } else {
    // Generate new unique 4-character hex ID (e.g. GSZ-2026-A4F9)
    let randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
    let operativeId = `GSZ-2026-${randomHex}`;

    while (records.some((r) => r.id === operativeId)) {
      randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
      operativeId = `GSZ-2026-${randomHex}`;
    }

    recordToSave = {
      id: operativeId,
      leaderName: data.leaderName.trim(),
      leaderEmail: cleanEmail,
      teamPassword: cleanPass,
      teamName: data.teamName.trim() || `${data.leaderName.trim()}'s Squad`,
      institution: data.institution.trim(),
      discordTag: data.discordTag?.trim(),
      selectedEvents: data.selectedEvents,
      selectedEventNames: data.selectedEventNames,
      members: [],
      createdAt: new Date().toISOString(),
    };
    records.push(recordToSave);
  }

  saveRegistrations(records);

  // Sync to Cloud Supabase for Discord Bot validation
  syncRegistrationToSupabase({
    id: recordToSave.id,
    leader_name: recordToSave.leaderName,
    leader_email: recordToSave.leaderEmail,
    team_password: recordToSave.teamPassword,
    team_name: recordToSave.teamName,
    institution: recordToSave.institution,
    discord_tag: recordToSave.discordTag,
    selected_events: recordToSave.selectedEvents,
    selected_event_names: recordToSave.selectedEventNames,
    members: recordToSave.members,
    created_at: recordToSave.createdAt,
  });

  return recordToSave;
};

export const joinExistingTeam = (data: {
  memberName: string;
  memberEmail: string;
  leaderEmail: string;
  teamPassword: string;
  discordTag?: string;
}): RegistrationRecord => {
  const records = getRegistrations();
  const searchLeaderEmail = data.leaderEmail.trim().toLowerCase();
  const searchPass = data.teamPassword.trim();

  const targetIndex = records.findIndex(
    (r) => r.leaderEmail === searchLeaderEmail && r.teamPassword === searchPass
  );

  if (targetIndex === -1) {
    throw new Error('No team found matching the Team Leader Email and Team Password provided.');
  }

  const team = records[targetIndex];

  // Prevent duplicate member email in team
  const memberEmailClean = data.memberEmail.trim().toLowerCase();
  const alreadyJoined = team.members.some((m) => m.email.toLowerCase() === memberEmailClean);

  if (!alreadyJoined) {
    team.members.push({
      name: data.memberName.trim(),
      email: memberEmailClean,
      discordTag: data.discordTag?.trim(),
      joinedAt: new Date().toISOString(),
    });
    records[targetIndex] = team;
    saveRegistrations(records);
  }

  // Sync updated team roster to Cloud Supabase for Discord Bot validation
  syncRegistrationToSupabase({
    id: team.id,
    leader_name: team.leaderName,
    leader_email: team.leaderEmail,
    team_password: team.teamPassword,
    team_name: team.teamName,
    institution: team.institution,
    discord_tag: team.discordTag,
    selected_events: team.selectedEvents,
    selected_event_names: team.selectedEventNames,
    members: team.members,
    created_at: team.createdAt,
  });

  return team;
};

export const exportRegistrationsCSV = (): void => {
  const records = getRegistrations();
  if (records.length === 0) {
    alert('No registrations currently recorded.');
    return;
  }

  const headers = [
    'Operative ID',
    'Role',
    'Delegate Name',
    'Delegate Email',
    'Team Name',
    'Institution',
    'Discord / Phone',
    'Team Password',
    'Accredited Events',
    'Registration Date'
  ];

  const rows: string[][] = [];

  records.forEach((rec) => {
    // Leader row
    rows.push([
      rec.id,
      'TEAM LEADER / CAPTAIN',
      rec.leaderName,
      rec.leaderEmail,
      rec.teamName,
      rec.institution,
      rec.discordTag || 'N/A',
      rec.teamPassword,
      rec.selectedEventNames.join('; '),
      new Date(rec.createdAt).toLocaleDateString()
    ]);

    // Member rows
    rec.members.forEach((m) => {
      rows.push([
        rec.id,
        'TEAM MEMBER',
        m.name,
        m.email,
        rec.teamName,
        rec.institution,
        m.discordTag || 'N/A',
        rec.teamPassword,
        rec.selectedEventNames.join('; '),
        new Date(m.joinedAt).toLocaleDateString()
      ]);
    });
  });

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `GENESIZ_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
