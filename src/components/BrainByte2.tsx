import { useState, useEffect, useRef, useCallback } from 'react';

const SB_URL = 'https://lzhcrjlqncrvnoxiszyt.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGNyamxxbmNydm5veGlzenl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MjI2MzcsImV4cCI6MjEwNDA5ODYzN30.arJWv-rbbu-Rbo3rsWMzEDbhc4Q_rYF5SdVhiKwDrtY';
const QUIZ_DURATION = 3600;
const ADMIN_PIN = 'GSZ2026';

// Standard headers for score reads/inserts
const sbH = {
  'apikey': SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal',
};

// Admin headers — required by RLS policy on bb2_session
const sbAdmin = {
  ...sbH,
  'x-bb-admin': 'GSZ2026-CTRL',
};

// ─── Questions ────────────────────────────────────────────────────────────────

const PART_A = [
  { q:"In Python, how many distinct elements does the set {1, 1.0, True, '1'} contain? Use len() to find out.", o:["1","2","3","4"], a:1 },
  { q:"In Python, a = [1,2,3] is followed by the slice assignment a[5:] = [9]. What does print(a) then output?", o:["IndexError","[1, 2, 3, 9]","[1, 2, 3, None, None, 9]","[1, 2, 3, 5, 9]"], a:1 },
  { q:"In Python, what does print(0 or [] or 'a' and 'b') output? Remember that 'and' binds tighter than 'or'.", o:["a","[]","b","True"], a:2 },
  { q:"A generator g = (i for i in range(3)) is fully consumed by list(g). What does a second print(list(g)) show?", o:["StopIteration","None","[]","[0, 1, 2]"], a:2 },
  { q:"Class A has a class attribute x = []. After A().x.append(1) runs, what does print(A().x) display?", o:["[]","[1]","AttributeError","None"], a:1 },
  { q:"In Python, what does print(-2**2, (-2)**2, 2**-1) output? Pay attention to operator precedence.", o:["-4 4 0.5","4 4 0.5","-4 4 0","4 -4 0.5"], a:0 },
  { q:"In JavaScript, what are the results of typeof NaN, typeof [] and typeof null, in that order?", o:["NaN object null","number array object","undefined object object","number object object"], a:3 },
  { q:"In JavaScript, what does [1,2,3].map(parseInt) return? Recall that map also passes the index to the callback.", o:["[1, 2, 3]","[1, NaN, 3]","[NaN, NaN, NaN]","[1, NaN, NaN]"], a:3 },
  { q:"In JavaScript, what does the expression 'b' + 'a' + +'a' + 'a' evaluate to? Note the unary plus.", o:["baaa","ba0a","NaN","baNaNa"], a:3 },
  { q:"Using the extended Master theorem, what is the solution to the recurrence T(n) = 2T(n/2) + n·log n?", o:["Θ(n log n)","Θ(n log² n)","Θ(n²)","Θ(n)"], a:1 },
  { q:"What is the minimum number of comparisons needed to find both the maximum and minimum of n items?", o:["n − 1","2n − 3","⌈3n/2⌉ − 2","n log n"], a:2 },
  { q:"How many different spanning trees does the complete graph K5 on five labelled vertices have?", o:["25","100","125","625"], a:2 },
  { q:"In a uniformly random permutation of the numbers 1 to 10, what is the expected number of inversions?", o:["45","22.5","25","20"], a:1 },
  { q:"A Union-Find structure uses union by rank and path compression. What is the amortized cost per operation?", o:["O(1)","O(log n)","O(log* n)","O(α(n))"], a:3 },
  { q:"How many valid, properly balanced bracket sequences can be formed using exactly 5 pairs of brackets?", o:["14","32","42","120"], a:2 },
  { q:"With 32-bit addresses, 4KB pages, 4-byte PTEs and one-level paging, how big is the page table per process?", o:["1MB","4MB","16MB","4KB"], a:1 },
  { q:"TLB access takes 10ns with a 90% hit rate, memory takes 100ns, one-level paging. Find the effective access time.", o:["110 ns","120 ns","130 ns","100 ns"], a:1 },
  { q:"Round Robin, quantum 4: three processes arrive at t=0 with bursts 10, 6 and 2. What is the average turnaround time?", o:["12.67","16","13.33","14.67"], a:3 },
  { q:"A program calls fork() three times in a row with no conditions. How many processes exist, including the parent?", o:["3","4","6","8"], a:3 },
  { q:"A counting semaphore starts at 3. Five wait() calls are followed by two signal() calls. What is its final value?", o:["−2","0","2","3"], a:1 },
  { q:"Link: 10Mbps, 1000km, signal speed 2×10⁸ m/s. Transmission + propagation time for a 1250-byte packet?", o:["1 ms","5 ms","6 ms","11 ms"], a:2 },
  { q:"How many usable host addresses does a /22 IPv4 subnet provide, after excluding network and broadcast addresses?", o:["510","1022","1024","2046"], a:1 },
  { q:"Which single route summarises the two adjacent networks 192.168.4.0/24 and 192.168.5.0/24 without extra space?", o:["192.168.4.0/23","192.168.0.0/22","192.168.5.0/23","192.168.4.0/22"], a:0 },
  { q:"In the Go-Back-N protocol with a sender window size of 7, what is the minimum number of sequence-number bits?", o:["2","3","4","7"], a:1 },
  { q:"In Diffie-Hellman with p=23 and g=5, Alice picks a=6 and Bob picks b=15. What is the shared secret key?", o:["2","8","19","6"], a:0 },
  { q:"In RSA with primes p=3 and q=11 and public exponent e=7, what is the private exponent d (d·e ≡ 1 mod φ(n))?", o:["3","7","13","17"], a:0 },
  { q:"Which of these message authentication designs is vulnerable to hash length-extension attacks?", o:["HMAC-SHA256","H(key || message) with SHA-256","AES-CMAC","Poly1305"], a:1 },
  { q:"Relation R(A,B,C,D) has the functional dependencies A→B, B→C and C→D. How many candidate keys does R have?", o:["1","2","3","4"], a:0 },
  { q:"Which standard SQL isolation level blocks non-repeatable reads but still allows phantom reads?", o:["READ UNCOMMITTED","READ COMMITTED","REPEATABLE READ","SERIALIZABLE"], a:2 },
  { q:"In a schedule, T1 reads A, then T2 writes A, then T1 writes A. Is this schedule conflict serializable?", o:["Yes: T1 → T2","Yes: T2 → T1","No: precedence cycle","Only if T2 aborts"], a:2 },
  { q:"In PostgreSQL, what does SELECT 7/2, -7/2, 7%3 return? Note that all the literals are integers.", o:["3, -3, 1","3, -4, 1","3.5, -3.5, 1","3, -3, 2"], a:0 },
  { q:"What is the minimum number of parity bits a Hamming code needs to protect 11 data bits against single-bit errors?", o:["3","4","5","6"], a:1 },
  { q:"An IEEE-754 single-precision float has the hex pattern 0x40490FDB. Which value is it approximately?", o:["1.57","3.14","6.28","0.78"], a:1 },
  { q:"A classic 5-stage pipeline stalls for 1 cycle on 20% of instructions. What is the speedup over non-pipelined?", o:["3.5","4.17","4.5","5"], a:1 },
  { q:"By Amdahl's law, 80% of a program is perfectly parallelisable and runs on 4 processors. What is the speedup?", o:["2","2.5","3.2","4"], a:1 },
];

const PART_B = [
  { q:"Radix sort is a comparison-based sorting algorithm, just like merge sort and quicksort.", o:["True","False"], a:1 },
  { q:"A Python tuple that contains a list as one of its elements is hashable, so it works as a dict key.", o:["True","False"], a:1 },
  { q:"The TCP three-way handshake by itself is enough to prevent SYN flood denial-of-service attacks.", o:["True","False"], a:1 },
  { q:"If a connected weighted graph has a unique minimum spanning tree, all its edge weights must be distinct.", o:["True","False"], a:1 },
  { q:"Every decidable language can be decided by a deterministic algorithm in polynomial time (is in P).", o:["True","False"], a:1 },
  { q:"In SQL, UNION ALL removes duplicate rows from the combined result of the two queries.", o:["True","False"], a:1 },
  { q:"FIFO page replacement is a stack algorithm, so it can never suffer from Belady's anomaly.", o:["True","False"], a:1 },
  { q:"In a B+ tree, the actual data records are stored only in the leaf nodes, not in internal nodes.", o:["True","False"], a:0 },
  { q:"Textbook RSA encryption without padding is deterministic: the same message gives the same ciphertext.", o:["True","False"], a:0 },
  { q:"Any comparison-based sorting algorithm needs Ω(n log n) comparisons on average to sort n items.", o:["True","False"], a:0 },
  { q:"Every relation that is in Boyce-Codd Normal Form (BCNF) is automatically also in Third Normal Form.", o:["True","False"], a:0 },
  { q:"Using median-of-medians as the pivot rule makes quicksort run in O(n log n) time even in the worst case.", o:["True","False"], a:0 },
  { q:"TLS 1.3 still supports static RSA key exchange, where the client encrypts the secret to the server's key.", o:["True","False"], a:1 },
  { q:"IEEE-754 floating-point addition is associative, so (a+b)+c always equals a+(b+c).", o:["True","False"], a:1 },
  { q:"Dijkstra's algorithm still gives correct results when some edge weights are zero (none are negative).", o:["True","False"], a:0 },
];

const QUESTIONS = [
  ...PART_A.map((q, i) => ({ ...q, num: i + 1, part: 'A' as const, pts: 10 })),
  ...PART_B.map((q, i) => ({ ...q, num: PART_A.length + i + 1, part: 'B' as const, pts: 5 })),
];
const MAX_SCORE = PART_A.length * 10 + PART_B.length * 5;

const MCQ_COLORS = ['bg-red-600 hover:bg-red-500','bg-blue-600 hover:bg-blue-500','bg-yellow-500 hover:bg-yellow-400','bg-green-600 hover:bg-green-500'];
const TF_COLORS  = ['bg-green-600 hover:bg-green-500','bg-red-600 hover:bg-red-500'];

function fmt(s: number) {
  const m = Math.floor(Math.max(0,s)/60), sec = Math.max(0,s)%60;
  return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────

async function getSession2() {
  try {
    const r = await fetch(`${SB_URL}/rest/v1/bb2_session?id=eq.1&select=*`,
      { headers:{ apikey:SB_KEY, Authorization:`Bearer ${SB_KEY}` } });
    const d = await r.json(); return d[0] ?? null;
  } catch { return null; }
}

async function patchSession(patch: object) {
  await fetch(`${SB_URL}/rest/v1/bb2_session?id=eq.1`,{
    method:'PATCH', headers:sbAdmin, body:JSON.stringify(patch)
  });
}

async function ensureSession() {
  await fetch(`${SB_URL}/rest/v1/bb2_session`,{
    method:'POST',
    headers:{...sbAdmin,'Prefer':'resolution=ignore-duplicates,return=minimal'},
    body:JSON.stringify({ id:1, status:'waiting' }),
  });
}

// score + correct_count are intentionally NOT sent — DB trigger calculates them
async function submitScore2(name:string, answers:number[]) {
  await fetch(`${SB_URL}/rest/v1/bb2_scores`,{
    method:'POST', headers:sbH,
    body:JSON.stringify({ player_name:name, answers, score, correct_count:correct,
      total_questions:QUESTIONS.length, submitted_at:new Date().toISOString() }),
  }).catch(()=>{});
}

async function fetchScores2() {
  try {
    const r = await fetch(`${SB_URL}/rest/v1/bb2_scores?order=score.desc&limit=100&select=*`,
      { headers:{ apikey:SB_KEY, Authorization:`Bearer ${SB_KEY}` } });
    return await r.json();
  } catch { return []; }
}

// ─── Player Quiz ─────────────────────────────────────────────────────────────

export function BrainByte2Quiz() {
  const [phase, setPhase] = useState<'register'|'waiting'|'quiz'|'done'>('register');
  const [playerName, setPlayerName] = useState('');
  const [qi, setQi]         = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => new Array(QUESTIONS.length).fill(-1));
  const [selOpt, setSelOpt]   = useState<number|null>(null);
  const [score, setScore]     = useState(0);
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);

  // Refs to avoid stale closures in setInterval callbacks
  const answersRef = useRef(answers);
  const scoreRef   = useRef(score);
  const correctRef = useRef(correct);
  const doneRef    = useRef(false);          // prevent double-submit
  answersRef.current = answers;
  scoreRef.current   = score;
  correctRef.current = correct;

  const finalSubmit = useCallback(async (ans:number[]) => {
    if (doneRef.current) return;
    doneRef.current = true;
    await submitScore2(playerName, ans);
    setPhase('done');
  }, [playerName]);

  // ── Poll session while waiting ──────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'waiting') return;
    const check = async () => {
      const s = await getSession2();
      if (!s) return;
      if (s.status === 'active' && s.started_at) {
        const elapsed = Math.floor((Date.now() - new Date(s.started_at).getTime()) / 1000);
        const rem = QUIZ_DURATION - elapsed;
        if (rem <= 0) { await finalSubmit(answersRef.current); return; }
        setTimeLeft(rem);
        setPhase('quiz');
      } else if (s.status === 'ended') {
        await finalSubmit(answersRef.current);
      }
    };
    check();
    const t = setInterval(check, 2000);
    return () => clearInterval(t);
  }, [phase, finalSubmit]);

  // ── 1-second countdown during quiz ─────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'quiz') return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(t);
          finalSubmit(answersRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, finalSubmit]);

  // ── Poll for force-end during quiz ──────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'quiz') return;
    const t = setInterval(async () => {
      const s = await getSession2();
      if (s?.status === 'ended') finalSubmit(answersRef.current);
    }, 5000);
    return () => clearInterval(t);
  }, [phase, finalSubmit]);

  // ── Submit current answer and advance ──────────────────────────────────────
  const submitAnswer = () => {
    if (selOpt === null) return;
    const cur = QUESTIONS[qi];
    const isOk = selOpt === cur.a;
    const newAns = [...answersRef.current]; newAns[qi] = selOpt;
    const newSc  = scoreRef.current + (isOk ? cur.pts : 0);
    const newCor = correctRef.current + (isOk ? 1 : 0);
    setAnswers(newAns); setScore(newSc); setCorrect(newCor);
    setSelOpt(null);
    if (qi + 1 >= QUESTIONS.length) {
      finalSubmit(newAns);
    } else {
      setQi(qi + 1);
    }
  };

  // ─── REGISTER ──────────────────────────────────────────────────────────────
  if (phase === 'register') return (
    <div className="min-h-screen bg-[#0f0e17] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a1a2e] rounded-3xl p-8 shadow-2xl border border-purple-800/40 text-center">
        <div className="text-5xl mb-3">⚡</div>
        <h1 className="text-3xl font-black text-white mb-1">BRAINBYTE</h1>
        <div className="flex gap-2 justify-center mb-2">
          <span className="bg-purple-600/30 text-purple-300 text-xs font-bold px-3 py-1 rounded-full">ROUND 2</span>
          <span className="bg-red-600/30 text-red-300 text-xs font-bold px-3 py-1 rounded-full">EXPERT</span>
        </div>
        <p className="text-zinc-500 text-sm mb-6">{PART_A.length} MCQ · {PART_B.length} True/False · 60 min total</p>
        <input
          className="w-full bg-white/10 border border-purple-600/40 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-center text-lg font-semibold outline-none focus:border-purple-400 mb-4"
          placeholder="Enter your full name..."
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          onKeyDown={e => e.key==='Enter' && playerName.trim() && setPhase('waiting')}
          maxLength={40}
        />
        <button
          onClick={() => playerName.trim() && setPhase('waiting')}
          disabled={!playerName.trim()}
          className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-black rounded-xl text-lg transition-all"
        >JOIN QUIZ →</button>
        <p className="text-zinc-600 text-xs mt-4">Quiz starts when the organiser presses START. Get ready!</p>
      </div>
    </div>
  );

  // ─── WAITING ───────────────────────────────────────────────────────────────
  if (phase === 'waiting') return (
    <div className="min-h-screen bg-[#0f0e17] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-6 animate-pulse">⏳</div>
        <h2 className="text-2xl font-black text-white mb-2">Waiting for quiz to start…</h2>
        <p className="text-purple-400 mb-1">Welcome, <strong>{playerName}</strong>!</p>
        <p className="text-zinc-500 text-sm">The quiz will begin when the organiser starts the session.</p>
        <div className="mt-8 flex gap-1 justify-center">
          {[0,1,2].map(i=>(
            <div key={i} className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay:`${i*0.2}s`}}/>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── DONE ─────────────────────────────────────────────────────────────────
  if (phase === 'done') {
    const pct = Math.round((score/MAX_SCORE)*100);
    return (
      <div className="min-h-screen bg-[#0f0e17] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1a1a2e] rounded-3xl p-8 shadow-2xl border border-purple-800/40 text-center">
          <div className="text-5xl mb-4">{pct>=70?'🏆':pct>=50?'🎉':'💪'}</div>
          <h2 className="text-2xl font-black text-white mb-1">{playerName}</h2>
          <p className="text-purple-400 text-sm mb-6">Quiz Complete!</p>
          <div className="bg-white/5 rounded-2xl p-6 mb-4">
            <div className="text-5xl font-black text-purple-400 mb-1">{score}</div>
            <div className="text-zinc-500 text-sm">out of {MAX_SCORE} points</div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-green-900/30 rounded-xl p-4">
              <div className="text-2xl font-black text-green-400">{correct}</div>
              <div className="text-zinc-400 text-xs">Correct</div>
            </div>
            <div className="bg-red-900/30 rounded-xl p-4">
              <div className="text-2xl font-black text-red-400">{QUESTIONS.length-correct}</div>
              <div className="text-zinc-400 text-xs">Wrong / Skipped</div>
            </div>
          </div>
          <a href="/bb2-scores" className="block w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all">
            View Leaderboard 🏅
          </a>
        </div>
      </div>
    );
  }

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  const cur = QUESTIONS[qi];
  const timerPct = timeLeft / QUIZ_DURATION;
  const timerCol = timerPct>0.5 ? 'text-green-400' : timerPct>0.25 ? 'text-yellow-400' : 'text-red-400 animate-pulse';
  const barCol   = timerPct>0.5 ? 'bg-green-500'   : timerPct>0.25 ? 'bg-yellow-500'   : 'bg-red-500';
  const cols     = cur.part==='B' ? TF_COLORS : MCQ_COLORS;

  return (
    <div className="min-h-screen bg-[#0f0e17] flex flex-col">
      {/* Sticky header */}
      <div className="bg-black/60 px-4 py-3 flex items-center justify-between sticky top-0 z-10 backdrop-blur">
        <div className="text-sm">
          <span className="text-zinc-400">{qi+1} / {QUESTIONS.length}</span>
          {cur.part==='B' && <span className="ml-2 text-xs text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded-full">T / F</span>}
        </div>
        <div className={`text-2xl font-black font-mono ${timerCol}`}>{fmt(timeLeft)}</div>
        <div className="text-right">
          <div className="text-purple-400 font-bold text-sm">{score} pts</div>
          <div className="text-zinc-600 text-xs">{answers.filter(a=>a!==-1).length} answered</div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1.5 bg-zinc-800 w-full">
        <div className={`h-1.5 transition-all duration-1000 ${barCol}`} style={{width:`${timerPct*100}%`}}/>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-5">
        {/* Badge */}
        <div className="w-full max-w-3xl mb-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${cur.part==='A'?'bg-purple-600/30 text-purple-300':'bg-yellow-600/30 text-yellow-300'}`}>
            PART {cur.part} · Q{cur.num} · +{cur.pts} pts
          </span>
        </div>

        {/* Question box */}
        <div className="w-full max-w-3xl bg-[#1a1a2e] rounded-2xl p-6 mb-5 border border-purple-900/30 min-h-[80px] flex items-center">
          <p className="text-white text-base sm:text-lg font-semibold leading-relaxed">{cur.q}</p>
        </div>

        {/* Options */}
        <div className={`grid ${cur.part==='B'?'grid-cols-2':'grid-cols-1 sm:grid-cols-2'} gap-3 w-full max-w-3xl mb-5`}>
          {cur.o.map((opt,i) => (
            <button key={i} onClick={()=>setSelOpt(i)}
              className={`${cols[i]} ${selOpt===i?'ring-4 ring-white scale-[1.02] shadow-2xl':'opacity-85 hover:opacity-100'} text-white font-bold px-5 py-5 rounded-2xl text-left transition-all duration-150 flex items-center gap-3 shadow-lg`}
            >
              <span className="text-lg font-black opacity-70">{cur.part==='B'?(i===0?'✓':'✗'):String.fromCharCode(65+i)}</span>
              <span className="flex-1 text-sm sm:text-base">{opt}</span>
              {selOpt===i && <span className="w-4 h-4 rounded-full bg-white/50 flex-shrink-0"/>}
            </button>
          ))}
        </div>

        {/* Submit button */}
        <button onClick={submitAnswer} disabled={selOpt===null}
          className="w-full max-w-3xl py-4 bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-black rounded-2xl text-lg transition-all shadow-xl"
        >
          {qi+1===QUESTIONS.length ? 'SUBMIT FINAL ANSWER ✓' : 'SUBMIT & NEXT →'}
        </button>
        <p className="text-zinc-600 text-xs mt-3">Once submitted, your answer cannot be changed.</p>
      </div>
    </div>
  );
}

// ─── Admin Panel ─────────────────────────────────────────────────────────────

export function BrainByte2Admin() {
  const [pin, setPin]         = useState('');
  const [authed, setAuthed]   = useState(false);
  const [session, setSession] = useState<any>(null);
  const [scores, setScores]   = useState<any[]>([]);
  const [busy, setBusy]       = useState(false);

  const refresh = useCallback(async () => {
    const [s, sc] = await Promise.all([getSession2(), fetchScores2()]);
    setSession(s); setScores(sc);
  }, []);

  useEffect(() => {
    if (!authed) return;
    refresh();
    const t = setInterval(refresh, 3000);
    return () => clearInterval(t);
  }, [authed, refresh]);

  const act = async (fn: ()=>Promise<void>) => { setBusy(true); await fn(); await refresh(); setBusy(false); };

  const started = session?.started_at ? new Date(session.started_at) : null;
  const rem     = started ? Math.max(0, QUIZ_DURATION - Math.floor((Date.now()-started.getTime())/1000)) : 0;

  if (!authed) return (
    <div className="min-h-screen bg-[#0f0e17] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-[#1a1a2e] rounded-2xl p-8 border border-purple-800/40 text-center">
        <div className="text-4xl mb-4">🔐</div>
        <h1 className="text-xl font-black text-white mb-6">BrainByte Admin</h1>
        <input type="password"
          className="w-full bg-white/10 border border-purple-600/40 rounded-xl px-4 py-3 text-white text-center outline-none focus:border-purple-400 mb-4"
          placeholder="Enter PIN…" value={pin} onChange={e=>setPin(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter' && pin===ADMIN_PIN) setAuthed(true); }}
        />
        <button onClick={()=>pin===ADMIN_PIN && setAuthed(true)}
          className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl">
          ENTER
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f0e17] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <div>
          <h1 className="text-3xl font-black">🎛 Admin — BrainByte Round 2</h1>
          <p className="text-zinc-500 text-sm mt-1">Refreshes every 3s · {scores.length} submission(s)</p>
        </div>

        {/* Session card */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-purple-900/30">
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${session?.status==='active'?'bg-green-400 animate-pulse':session?.status==='ended'?'bg-red-400':'bg-yellow-400'}`}/>
            <span className="font-bold text-xl capitalize">{session?.status ?? '…'}</span>
            {session?.status==='active' && <span className="text-purple-400 font-mono">{fmt(rem)} remaining</span>}
          </div>
          <div className="flex flex-wrap gap-3">
            <button disabled={busy||session?.status==='active'}
              onClick={()=>act(async()=>{ await ensureSession(); await patchSession({status:'active',started_at:new Date().toISOString()}); })}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 disabled:bg-zinc-700 disabled:cursor-not-allowed font-bold rounded-xl transition-all">
              ▶ START QUIZ
            </button>
            <button disabled={busy||session?.status!=='active'}
              onClick={()=>{ if(confirm('End the quiz for ALL players right now?')) act(()=>patchSession({status:'ended'})); }}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 disabled:bg-zinc-700 disabled:cursor-not-allowed font-bold rounded-xl transition-all">
              ■ END NOW
            </button>
            <button disabled={busy}
              onClick={()=>{ if(confirm('Reset quiz? This sets status back to waiting.')) act(()=>patchSession({status:'waiting',started_at:null})); }}
              className="px-6 py-3 bg-zinc-600 hover:bg-zinc-500 disabled:opacity-50 font-bold rounded-xl transition-all">
              ↺ RESET
            </button>
          </div>
        </div>

        {/* Live submissions */}
        <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-purple-900/30">
          <h2 className="font-black text-lg mb-4">Live Submissions ({scores.length} / {session?.status==='active'?'ongoing':'—'})</h2>
          {scores.length===0
            ? <p className="text-zinc-500 text-sm">No submissions yet.</p>
            : <div className="space-y-2 max-h-96 overflow-y-auto">
                {scores.map((s,i)=>(
                  <div key={s.id} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                    <span className="text-zinc-500 text-sm w-6 flex-shrink-0">#{i+1}</span>
                    <span className="flex-1 font-semibold truncate">{s.player_name}</span>
                    <span className="text-purple-400 font-bold">{s.score} pts</span>
                    <span className="text-zinc-500 text-xs">{s.correct_count}/{s.total_questions}</span>
                  </div>
                ))}
              </div>
          }
        </div>

        <div className="flex gap-4">
          <a href="/bb2" className="text-purple-400 text-sm hover:underline">Player quiz →</a>
          <a href="/bb2-scores" className="text-purple-400 text-sm hover:underline">Leaderboard →</a>
        </div>
      </div>
    </div>
  );
}

// ─── Leaderboard ─────────────────────────────────────────────────────────────

export function BrainByte2Scores() {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ts, setTs] = useState(new Date());

  useEffect(()=>{
    const go = async()=>{ const d=await fetchScores2(); setScores(d); setTs(new Date()); setLoading(false); };
    go(); const t=setInterval(go,4000); return()=>clearInterval(t);
  },[]);

  const medal = (i:number) => i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${i+1}`;

  return (
    <div className="min-h-screen bg-[#0f0e17] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-4xl font-black mb-1">🏆 LEADERBOARD</h1>
          <p className="text-purple-400 font-mono text-sm">BRAINBYTE · Round 2 · Expert</p>
          <p className="text-zinc-600 text-xs mt-1">Updates every 4s · {ts.toLocaleTimeString()}</p>
        </div>
        {loading
          ? <div className="text-center text-zinc-400 py-20">Loading…</div>
          : scores.length===0
            ? <div className="text-center py-20">
                <div className="text-4xl mb-3">⏳</div>
                <p className="text-zinc-500">No scores yet.</p>
                <a href="/bb2" className="mt-4 inline-block text-purple-400 hover:underline">Go to quiz →</a>
              </div>
            : <div className="space-y-2">
                {scores.map((s,i)=>(
                  <div key={s.id} className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${
                    i===0?'bg-yellow-900/30 border-yellow-600/50':
                    i===1?'bg-zinc-700/30 border-zinc-500/50':
                    i===2?'bg-orange-900/20 border-orange-700/40':
                    'bg-white/5 border-white/10'}`}>
                    <span className="text-2xl w-8 text-center">{medal(i)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">{s.player_name}</p>
                      <p className="text-zinc-500 text-xs">{s.correct_count}/{s.total_questions} correct</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-purple-400 text-xl">{s.score}</p>
                      <p className="text-zinc-600 text-xs">/ {MAX_SCORE}</p>
                    </div>
                  </div>
                ))}
              </div>
        }
        <div className="text-center mt-6">
          <a href="/bb2" className="text-purple-400 text-sm hover:underline">← Back to Quiz</a>
        </div>
      </div>
    </div>
  );
}
