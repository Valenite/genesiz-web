import { useState, useEffect, useRef, useCallback } from 'react';

const SUPABASE_URL = 'https://lzhcrjlqncrvnoxiszyt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6aGNyamxxbmNydm5veGlzenl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MjI2MzcsImV4cCI6MjEwNDA5ODYzN30.arJWv-rbbu-Rbo3rsWMzEDbhc4Q_rYF5SdVhiKwDrtY';

const Q = [
  { q:"A 3Ω and 6Ω in parallel are in series with 4Ω across a 12V battery. What current flows through the 3Ω resistor?", o:["0.67A","2A","1.33A","4A"], a:2, t:60 },
  { q:"A Carnot engine runs between 500K and 300K. By how much must the hot side rise to reach 50% efficiency?", o:["100K","50K","150K","200K"], a:0, t:60 },
  { q:"In a transistor with current gain β = 100, the emitter current is 2.02mA. What is the collector current?", o:["2.02mA","1.98mA","0.02mA","2.00mA"], a:3, t:60 },
  { q:"Python: f(x, acc=[]) does acc += [x]; return acc. After a=f(1); b=f(2), what do print(a is b, a) show?", o:["False [1]","True [1, 2]","False [1, 2]","True [2]"], a:1, t:30 },
  { q:"Python: what does print(Decimal(0.1)+Decimal(0.2)==Decimal('0.3'), round(2.5), round(3.5)) output?", o:["True 3 4","False 3 4","False 2 4","True 2 4"], a:2, t:30 },
  { q:"Python: x = [[0] * 2] * 2 is created, then x[0][0] = 1. What does print(x) output?", o:["[[1, 0], [1, 0]]","[[1, 0], [0, 0]]","[[1, 1], [1, 1]]","[[0, 0], [1, 0]]"], a:0, t:30 },
  { q:"Python: fs = [lambda: i for i in range(3)]. What does [f() for f in fs] return, given late binding?", o:["[0, 1, 2]","[3, 3, 3]","NameError","[2, 2, 2]"], a:3, t:30 },
  { q:"Python: what does print(-7 // 2, -7 % 2, int(-7 / 2)) output? Think about floor vs truncation.", o:["-3 -1 -3","-4 1 -3","-4 -1 -4","-3 1 -3"], a:1, t:30 },
  { q:"Python: what does print(~5, 5 ^ 3, -5 >> 1) output? Think about two's complement and bitwise XOR.", o:["-6 6 -3","-5 6 -2","-6 7 -3","-6 6 -2"], a:0, t:30 },
  { q:"Python: a = (1, [2, 3]) then a[1] += [4]. What happens when this runs, and what is a afterwards?", o:["No error; a becomes (1, [2, 3, 4])","TypeError raised; a stays (1, [2, 3])","TypeError raised, yet a becomes (1, [2, 3, 4])","SyntaxError"], a:2, t:30 },
  { q:"JavaScript: what does console.log(0.1 + 0.2, typeof NaN, [] == ![]) print, in order?", o:["0.3 \"number\" false","0.30000000000000004 \"number\" true","0.30000000000000004 \"NaN\" true","0.3 \"number\" true"], a:1, t:30 },
  { q:"To get the k largest of n unsorted items using a min-heap of size k, what is the time complexity?", o:["O(n log n)","O(k log n)","O(n + k)","O(n log k)"], a:3, t:30 },
  { q:"What is the amortised time complexity of Dijkstra's algorithm when it uses a Fibonacci heap?", o:["O(E log V)","O((V + E) log V)","O(E + V log V)","O(V²)"], a:2, t:30 },
  { q:"A postfix expression is evaluated with a stack: 5 1 2 + 4 * + 3 −. What is the final result?", o:["14","10","18","20"], a:0, t:30 },
  { q:"A hash table uses linear probing with load factor 0.5. Expected probes for an unsuccessful search (Knuth)?", o:["1.5","2.5","2.0","3.0"], a:1, t:60 },
  { q:"How many structurally different binary search trees can be built from exactly 4 distinct keys?", o:["10","16","24","14"], a:3, t:30 },
  { q:"FIFO page replacement, string 1,2,3,4,1,2,5,1,2,3,4,5. Page faults with 3 frames, then 4 frames?", o:["9 and 10","10 and 9","9 and 9","10 and 10"], a:0, t:60 },
  { q:"3 processes each need at most 2 units of one resource type. Minimum units that guarantee no deadlock?", o:["3","6","4","5"], a:2, t:30 },
  { q:"SRTF scheduling: P1(arrival 0,burst 8), P2(1,4), P3(2,9), P4(3,5). What is average waiting time?", o:["7.75","6.5","8.75","5.5"], a:1, t:60 },
  { q:"In C/C++, which guarantees does the volatile qualifier provide for thread communication through a variable?", o:["Both atomicity and memory ordering","Atomicity only","Memory ordering only","Neither; it only restricts compiler optimisation of that access"], a:3, t:30 },
  { q:"In TCP teardown, which state does the active closer enter for 2×MSL after sending the final ACK?", o:["CLOSE_WAIT","FIN_WAIT_2","TIME_WAIT","LAST_ACK"], a:2, t:30 },
  { q:"A host has the IP address 172.16.37.200/21. What is the network address of its subnet?", o:["172.16.32.0","172.16.36.0","172.16.37.0","172.16.0.0"], a:0, t:30 },
  { q:"What is a gratuitous ARP message, and what is it typically used for on a local network?", o:["A request for the default gateway's MAC address","Unsolicited announcement of its own IP-MAC mapping; updates caches","An encrypted ARP reply used with IPsec","An ARP message relayed across routers"], a:1, t:30 },
  { q:"Which defence most directly defeats precomputed rainbow-table attacks on stored password hashes?", o:["A longer hash output length","SHA-512 instead of SHA-256, without any salt","Base64-encoding the hash before storing it","A unique random salt per password (with bcrypt or Argon2)"], a:3, t:30 },
  { q:"Which cross-origin browser request triggers a CORS preflight (OPTIONS) request before it is sent?", o:["A GET request with no custom headers","POST with application/x-www-form-urlencoded","POST with Content-Type: application/json","A HEAD request with no custom headers"], a:2, t:30 },
  { q:"Which transport protocol and port number does HTTP/3 use by default for web traffic?", o:["UDP port 443, via QUIC","TCP port 443","UDP port 80","SCTP port 443"], a:0, t:30 },
  { q:"Relation R(A,B,C) has dependencies AB → C and C → B. What is the highest normal form R satisfies?", o:["1NF","2NF","3NF but not BCNF","BCNF"], a:2, t:30 },
  { q:"Table t has column x holding 1, 2 and 3. What does SELECT COUNT(*) FROM t WHERE x NOT IN (1, NULL) return?", o:["2","0","3","NULL"], a:1, t:30 },
  { q:"L1 cache: 1ns, 90% hit. L2: 10ns, 80% local hit on L1 misses. Memory: 100ns. What is average access time?", o:["3ns","5.5ns","11ns","4ns"], a:3, t:60 },
  { q:"An ideal 5-stage RISC pipeline with no hazards or stalls runs 100 instructions. How many clock cycles total?", o:["104","105","500","100"], a:0, t:30 },
  { q:"A Square class extends Rectangle and overrides setWidth to also set height. Which SOLID principle is violated?", o:["Single Responsibility Principle","Open/Closed Principle","Liskov Substitution Principle","Dependency Inversion Principle"], a:2, t:30 },
  { q:"After rebasing your own feature branch that was already pushed, what is the safest way to update the remote?", o:["git push --force","git push --mirror","git pull --rebase","git push --force-with-lease (refuses if remote has unfetched commits)"], a:3, t:30 },
  { q:"In Java, which singleton implementation is naturally safe against reflection and serialization attacks?", o:["Double-checked locking without volatile","A single-element enum","Lazy init with a synchronized getInstance()","An eagerly initialised static final field"], a:1, t:30 },
  { q:"Python: counter() defines n=0 and inner inc() doing n+=1; return n. What does print(counter()()) show?", o:["1","0","UnboundLocalError","NameError"], a:2, t:30 },
  { q:"Why does a generational garbage collector need a write barrier and a remembered set?", o:["To track old-to-young references so minor GCs skip scanning old gen","To stop threads writing to freed memory","To compact the heap after every collection","To detect reference cycles missed by reference counting"], a:0, t:30 },
];

const COLORS = ['bg-red-600 hover:bg-red-500','bg-blue-600 hover:bg-blue-500','bg-yellow-500 hover:bg-yellow-400','bg-green-600 hover:bg-green-500'];
const SHAPES = ['▲','◆','●','■'];

async function submitScore(name: string, score: number, correct: number) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/bb_scores`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ player_name: name, score, correct_count: correct, total_questions: Q.length }),
    });
  } catch { /* silent fail */ }
}

export function BrainByteQuiz() {
  const [phase, setPhase] = useState<'welcome'|'countdown'|'question'|'feedback'|'results'>('welcome');
  const [name, setName] = useState('');
  const [qi, setQi] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [cd, setCd] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);

  const clearTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  const startQuestion = useCallback((idx: number) => {
    setQi(idx);
    setSelected(null);
    setTimeLeft(Q[idx].t);
    setPhase('question');
  }, []);

  // Timer countdown during question
  useEffect(() => {
    if (phase !== 'question') return;
    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          setPhase('feedback');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [phase, qi]);

  // Auto-advance after feedback (1.5s)
  useEffect(() => {
    if (phase !== 'feedback') return;
    const t = setTimeout(() => {
      if (qi + 1 < Q.length) startQuestion(qi + 1);
      else setPhase('results');
    }, 1500);
    return () => clearTimeout(t);
  }, [phase, qi, startQuestion]);

  // Initial countdown 3..2..1
  useEffect(() => {
    if (phase !== 'countdown') return;
    setCd(3);
    const t = setInterval(() => {
      setCd(p => {
        if (p <= 1) { clearInterval(t); startQuestion(0); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase, startQuestion]);

  const handleAnswer = (idx: number) => {
    if (phase !== 'question' || selected !== null) return;
    clearTimer();
    setSelected(idx);
    const isCorrect = idx === Q[qi].a;
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / Q[qi].t) * 500);
      setScore(s => s + 1000 + timeBonus);
      setCorrect(c => c + 1);
    }
    setPhase('feedback');
  };

  // Submit score when results shown
  useEffect(() => {
    if (phase === 'results') submitScore(name, score, correct);
  }, [phase]);

  const pct = timeLeft / Q[qi]?.t || 0;
  const barColor = pct > 0.5 ? 'bg-green-500' : pct > 0.25 ? 'bg-yellow-500' : 'bg-red-500';

  if (phase === 'welcome') return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#16213e] rounded-3xl p-8 shadow-2xl border border-violet-800/40 text-center">
        <div className="text-5xl mb-4">🧠</div>
        <h1 className="text-3xl font-black text-white mb-1">BRAINBYTE</h1>
        <p className="text-violet-400 text-sm font-mono mb-6">Round 1 — Qualification · {Q.length} Questions</p>
        <input
          className="w-full bg-white/10 border border-violet-600/40 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-center text-lg font-semibold outline-none focus:border-violet-400 mb-4"
          placeholder="Enter your name..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && name.trim() && setPhase('countdown')}
          maxLength={30}
        />
        <button
          onClick={() => name.trim() && setPhase('countdown')}
          disabled={!name.trim()}
          className="w-full py-4 bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-black rounded-xl text-lg transition-all"
        >
          START QUIZ →
        </button>
        <p className="text-zinc-500 text-xs mt-4">Scores are submitted to the live leaderboard automatically.</p>
      </div>
    </div>
  );

  if (phase === 'countdown') return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
      <div className="text-center">
        <p className="text-zinc-400 text-xl mb-4">Get ready, {name}!</p>
        <div className="text-9xl font-black text-white animate-pulse">{cd}</div>
      </div>
    </div>
  );

  if (phase === 'results') return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#16213e] rounded-3xl p-8 shadow-2xl border border-violet-800/40 text-center">
        <div className="text-5xl mb-4">{correct >= Q.length * 0.7 ? '🏆' : correct >= Q.length * 0.5 ? '🎉' : '💪'}</div>
        <h2 className="text-3xl font-black text-white mb-1">{name}</h2>
        <p className="text-violet-400 text-sm mb-6">Quiz Complete!</p>
        <div className="bg-white/5 rounded-2xl p-6 mb-4">
          <div className="text-5xl font-black text-violet-400 mb-1">{score.toLocaleString()}</div>
          <div className="text-zinc-400 text-sm">Total Score</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-green-900/30 rounded-xl p-4">
            <div className="text-2xl font-black text-green-400">{correct}</div>
            <div className="text-zinc-400 text-xs">Correct</div>
          </div>
          <div className="bg-red-900/30 rounded-xl p-4">
            <div className="text-2xl font-black text-red-400">{Q.length - correct}</div>
            <div className="text-zinc-400 text-xs">Wrong/Skipped</div>
          </div>
        </div>
        <a
          href="/bb-scores"
          className="block w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-all"
        >
          View Leaderboard 🏅
        </a>
      </div>
    </div>
  );

  const cur = Q[qi];

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40">
        <span className="text-zinc-400 text-sm font-mono">{qi + 1} / {Q.length}</span>
        <span className="text-violet-400 font-bold text-sm">{score.toLocaleString()} pts</span>
        <span className="text-zinc-400 text-sm font-mono">{name}</span>
      </div>

      {/* Timer bar */}
      <div className="h-2 bg-zinc-800 w-full">
        <div
          className={`h-2 transition-all duration-1000 ${barColor}`}
          style={{ width: `${(timeLeft / cur.t) * 100}%` }}
        />
      </div>

      {/* Timer number */}
      <div className="text-center py-2">
        <span className={`text-2xl font-black ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{timeLeft}</span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center px-4 pb-4">
        <div className="w-full max-w-3xl bg-[#16213e] rounded-2xl p-6 mb-4 shadow-xl border border-violet-900/30 min-h-[100px] flex items-center justify-center">
          <p className="text-white text-base sm:text-lg font-semibold text-center leading-relaxed">{cur.q}</p>
        </div>

        {/* Answer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl">
          {cur.o.map((opt, i) => {
            let extra = '';
            if (phase === 'feedback') {
              if (i === cur.a) extra = 'ring-4 ring-green-400 opacity-100 scale-105';
              else if (i === selected) extra = 'ring-4 ring-red-400 opacity-60';
              else extra = 'opacity-40';
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={phase === 'feedback'}
                className={`${COLORS[i]} ${extra} text-white font-bold px-4 py-5 rounded-2xl text-left text-sm sm:text-base transition-all duration-200 flex items-center gap-3 shadow-lg disabled:cursor-default`}
              >
                <span className="text-xl opacity-80">{SHAPES[i]}</span>
                <span className="flex-1">{opt}</span>
                {phase === 'feedback' && i === cur.a && <span className="text-xl">✓</span>}
                {phase === 'feedback' && i === selected && i !== cur.a && <span className="text-xl">✗</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function BrainByteScores() {
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchScores = async () => {
    try {
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/bb_scores?order=score.desc&limit=50&select=*`,
        { headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` } }
      );
      if (r.ok) {
        const d = await r.json();
        setScores(d);
        setLastUpdate(new Date());
      }
    } catch { /* silent */ } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const t = setInterval(fetchScores, 4000);
    return () => clearInterval(t);
  }, []);

  const medal = (i: number) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-6">
          <h1 className="text-4xl font-black mb-1">🏆 LEADERBOARD</h1>
          <p className="text-violet-400 font-mono text-sm">BRAINBYTE · Round 1 · Live</p>
          <p className="text-zinc-600 text-xs mt-1">Updates every 4s · Last: {lastUpdate.toLocaleTimeString()}</p>
        </div>

        {loading ? (
          <div className="text-center text-zinc-400 py-20">Loading scores...</div>
        ) : scores.length === 0 ? (
          <div className="text-center text-zinc-500 py-20">
            <div className="text-4xl mb-3">⏳</div>
            <p>No scores yet. Be the first!</p>
            <a href="/brainbyte" className="mt-4 inline-block text-violet-400 underline">Take the quiz →</a>
          </div>
        ) : (
          <div className="space-y-2">
            {scores.map((s, i) => (
              <div
                key={s.id}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border ${
                  i === 0 ? 'bg-yellow-900/30 border-yellow-600/50' :
                  i === 1 ? 'bg-zinc-700/30 border-zinc-500/50' :
                  i === 2 ? 'bg-orange-900/20 border-orange-700/40' :
                  'bg-white/5 border-white/10'
                }`}
              >
                <span className="text-2xl w-8 text-center">{medal(i)}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base truncate">{s.player_name}</p>
                  <p className="text-zinc-400 text-xs">{s.correct_count}/{s.total_questions} correct</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-violet-400 text-lg">{Number(s.score).toLocaleString()}</p>
                  <p className="text-zinc-500 text-xs">pts</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <a href="/brainbyte" className="text-violet-400 text-sm hover:underline">← Back to Quiz</a>
        </div>
      </div>
    </div>
  );
}
