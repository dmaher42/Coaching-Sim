import React, { useEffect, useMemo, useRef, useState } from 'react';

const FIELD_HEIGHT = 140;

const TEAM_COLOURS = {
  us: '#1d4ed8',
  opp: '#dc2626',
  ball: '#f59e0b',
};

const roleDescriptions = {
  B1: 'Small defender', B2: 'Key defender 1', B3: 'Rebound defender 1', B4: 'Key defender 2',
  B5: 'High defender', B6: 'Rebound defender 2', W1: 'Wing 1', W2: 'Wing 2',
  M1: 'Reader mid', M2: 'Target mid', M3: 'Sweeper mid', R: 'Ruck',
  F1: 'Crumbing forward', F2: 'Deep tall forward', F3: 'Pressure forward',
  F4: 'Link tall', F5: 'Hybrid medium', F6: 'Puma forward/mid',
};

const basePlayers = [
  { id: 'B1', label: 'B1', team: 'us', x: 14, y: 110 }, { id: 'B2', label: 'B2', team: 'us', x: 34, y: 119 },
  { id: 'B3', label: 'B3', team: 'us', x: 50, y: 112 }, { id: 'B4', label: 'B4', team: 'us', x: 66, y: 119 },
  { id: 'B5', label: 'B5', team: 'us', x: 38, y: 96 }, { id: 'B6', label: 'B6', team: 'us', x: 62, y: 96 },
  { id: 'W1', label: 'W1', team: 'us', x: 15, y: 73 }, { id: 'W2', label: 'W2', team: 'us', x: 85, y: 73 },
  { id: 'M1', label: 'M1', team: 'us', x: 42, y: 73 }, { id: 'M2', label: 'M2', team: 'us', x: 50, y: 66 },
  { id: 'M3', label: 'M3', team: 'us', x: 58, y: 73 }, { id: 'R', label: 'R', team: 'us', x: 50, y: 58 },
  { id: 'F1', label: 'F1', team: 'us', x: 22, y: 40 }, { id: 'F2', label: 'F2', team: 'us', x: 48, y: 19 },
  { id: 'F3', label: 'F3', team: 'us', x: 73, y: 22 }, { id: 'F4', label: 'F4', team: 'us', x: 51, y: 35 },
  { id: 'F5', label: 'F5', team: 'us', x: 35, y: 48 }, { id: 'F6', label: 'F6', team: 'us', x: 66, y: 50 },
  { id: 'O1', label: 'O1', team: 'opp', x: 16, y: 102 }, { id: 'O2', label: 'O2', team: 'opp', x: 33, y: 111 },
  { id: 'O3', label: 'O3', team: 'opp', x: 51, y: 104 }, { id: 'O4', label: 'O4', team: 'opp', x: 67, y: 111 },
  { id: 'O5', label: 'O5', team: 'opp', x: 42, y: 88 }, { id: 'O6', label: 'O6', team: 'opp', x: 60, y: 88 },
  { id: 'O7', label: 'O7', team: 'opp', x: 18, y: 57 }, { id: 'O8', label: 'O8', team: 'opp', x: 33, y: 57 },
  { id: 'O9', label: 'O9', team: 'opp', x: 49, y: 50 }, { id: 'O10', label: 'O10', team: 'opp', x: 66, y: 57 },
  { id: 'O11', label: 'O11', team: 'opp', x: 81, y: 57 }, { id: 'O12', label: 'O12', team: 'opp', x: 30, y: 28 },
  { id: 'O13', label: 'O13', team: 'opp', x: 48, y: 11 }, { id: 'O14', label: 'O14', team: 'opp', x: 68, y: 21 },
];

const centreBouncePlayers = [
  { id: 'B1', label: 'B1', team: 'us', x: 20, y: 118 }, { id: 'B2', label: 'B2', team: 'us', x: 40, y: 122 },
  { id: 'B3', label: 'B3', team: 'us', x: 50, y: 116 }, { id: 'B4', label: 'B4', team: 'us', x: 60, y: 122 },
  { id: 'B5', label: 'B5', team: 'us', x: 35, y: 102 }, { id: 'B6', label: 'B6', team: 'us', x: 65, y: 102 },
  { id: 'W1', label: 'W1', team: 'us', x: 16, y: 70 }, { id: 'W2', label: 'W2', team: 'us', x: 84, y: 70 },
  { id: 'M1', label: 'M1', team: 'us', x: 44, y: 72 }, { id: 'M2', label: 'M2', team: 'us', x: 50, y: 66 },
  { id: 'M3', label: 'M3', team: 'us', x: 56, y: 72 }, { id: 'R', label: 'R', team: 'us', x: 50, y: 58 },
  { id: 'F1', label: 'F1', team: 'us', x: 24, y: 28 }, { id: 'F2', label: 'F2', team: 'us', x: 46, y: 18 },
  { id: 'F3', label: 'F3', team: 'us', x: 76, y: 28 }, { id: 'F4', label: 'F4', team: 'us', x: 54, y: 34 },
  { id: 'F5', label: 'F5', team: 'us', x: 38, y: 46 }, { id: 'F6', label: 'F6', team: 'us', x: 62, y: 46 },
  { id: 'O1', label: 'O1', team: 'opp', x: 22, y: 108 }, { id: 'O2', label: 'O2', team: 'opp', x: 40, y: 112 },
  { id: 'O3', label: 'O3', team: 'opp', x: 50, y: 106 }, { id: 'O4', label: 'O4', team: 'opp', x: 60, y: 112 },
  { id: 'O5', label: 'O5', team: 'opp', x: 38, y: 86 }, { id: 'O6', label: 'O6', team: 'opp', x: 62, y: 86 },
  { id: 'O7', label: 'O7', team: 'opp', x: 18, y: 66 }, { id: 'O8', label: 'O8', team: 'opp', x: 34, y: 66 },
  { id: 'O9', label: 'O9', team: 'opp', x: 50, y: 50 }, { id: 'O10', label: 'O10', team: 'opp', x: 66, y: 66 },
  { id: 'O11', label: 'O11', team: 'opp', x: 82, y: 66 }, { id: 'O12', label: 'O12', team: 'opp', x: 28, y: 24 },
  { id: 'O13', label: 'O13', team: 'opp', x: 50, y: 14 }, { id: 'O14', label: 'O14', team: 'opp', x: 72, y: 24 },
];

const centreBounceBall = { x: 50, y: 58 };

const presets = {
  centreBounce: { name: 'Centre bounce start', players: centreBouncePlayers, ball: centreBounceBall, notes: 'Centre bounce starting positions. Use this to set your stoppage structure and first movement patterns.' },
  kickoutBoundary: {
    name: 'Kick-out to boundary half-back',
    players: basePlayers.map((p) => ({ ...p, ...( {
      B1:{x:18,y:106}, B3:{x:38,y:102}, B5:{x:30,y:87}, W1:{x:18,y:66}, M1:{x:35,y:70}, M2:{x:47,y:66},
      M3:{x:60,y:77}, W2:{x:84,y:75}, F4:{x:26,y:46}, F5:{x:40,y:54}, F6:{x:60,y:60}, F2:{x:26,y:24}, F3:{x:54,y:24}, F1:{x:15,y:28}
    }[p.id] || {}) })),
    ball: { x: 15, y: 104 },
    notes: 'Boundary exit example. Support should come in layers, not all to the same contest.',
  },
  boundaryChain: {
    name: 'Second kick from half-back to half-forward boundary',
    players: basePlayers.map((p) => ({ ...p, ...( {
      B1:{x:12,y:96}, B3:{x:26,y:88}, B5:{x:21,y:73}, W1:{x:16,y:54}, M1:{x:26,y:58}, M2:{x:38,y:58},
      M3:{x:52,y:64}, W2:{x:78,y:66}, F4:{x:18,y:40}, F5:{x:34,y:46}, F6:{x:49,y:50}, F2:{x:24,y:21}, F3:{x:45,y:20}, F1:{x:12,y:24}
    }[p.id] || {}) })),
    ball: { x: 14, y: 43 },
    notes: 'The next movement after the first safe kick. Think next layer, front-and-square, and lane balance.',
  },
};

const phaseTemplates = {
  centreBounce: [
    { name: 'Phase 1', note: 'Initial stoppage positions.', arrows: [
      { from: 'R', to: { x: 50, y: 51 }, color: 'ball' }, { from: 'M1', to: { x: 40, y: 64 }, color: 'us' },
      { from: 'M3', to: { x: 60, y: 64 }, color: 'us' }, { from: 'W1', to: { x: 22, y: 62 }, color: 'us' },
      { from: 'W2', to: { x: 78, y: 62 }, color: 'us' }
    ]},
    { name: 'Phase 2', note: 'Ball out the front. Wings and forwards react.', arrows: [
      { from: 'M2', to: { x: 50, y: 52 }, color: 'ball' }, { from: 'F4', to: { x: 52, y: 26 }, color: 'us' },
      { from: 'F5', to: { x: 34, y: 38 }, color: 'us' }, { from: 'F6', to: { x: 66, y: 38 }, color: 'us' },
      { from: 'B5', to: { x: 40, y: 92 }, color: 'us' }, { from: 'B6', to: { x: 60, y: 92 }, color: 'us' }
    ]},
    { name: 'Phase 3', note: 'Spread and protect both sides after first possession.', arrows: [
      { from: 'W1', to: { x: 18, y: 52 }, color: 'us' }, { from: 'W2', to: { x: 82, y: 52 }, color: 'us' },
      { from: 'B3', to: { x: 50, y: 102 }, color: 'us' }, { from: 'F1', to: { x: 20, y: 22 }, color: 'us' },
      { from: 'F3', to: { x: 80, y: 22 }, color: 'us' }
    ]},
  ],
  kickoutBoundary: [
    { name: 'Phase 1', note: 'First kick exits to the boundary half-back.', arrows: [
      { from: { x: 10, y: 116 }, to: 'B1', color: 'ball' }, { from: 'B3', to: { x: 33, y: 97 }, color: 'us' },
      { from: 'W1', to: { x: 22, y: 58 }, color: 'us' }, { from: 'M1', to: { x: 29, y: 63 }, color: 'us' }
    ]},
    { name: 'Phase 2', note: 'Next layer arrives. Do not all pile into the same lane.', arrows: [
      { from: 'B1', to: { x: 18, y: 86 }, color: 'ball' }, { from: 'F4', to: { x: 22, y: 34 }, color: 'us' },
      { from: 'F5', to: { x: 35, y: 46 }, color: 'us' }, { from: 'M2', to: { x: 46, y: 58 }, color: 'us' },
      { from: 'W2', to: { x: 74, y: 68 }, color: 'us' }
    ]},
    { name: 'Phase 3', note: 'Far-side support works early for the switch or next release.', arrows: [
      { from: 'B5', to: { x: 42, y: 80 }, color: 'us' }, { from: 'B6', to: { x: 58, y: 86 }, color: 'us' },
      { from: 'W2', to: { x: 68, y: 60 }, color: 'us' }, { from: 'F2', to: { x: 28, y: 18 }, color: 'us' }
    ]},
  ],
  boundaryChain: [
    { name: 'Phase 1', note: 'Half-forward leads straight down the line.', arrows: [
      { from: 'B1', to: 'F4', color: 'ball' }, { from: 'F4', to: { x: 14, y: 32 }, color: 'us' },
      { from: 'F1', to: { x: 16, y: 19 }, color: 'us' }, { from: 'M1', to: { x: 31, y: 53 }, color: 'us' }
    ]},
    { name: 'Phase 2', note: 'Crumber stays front and square. Inside mid protects next lane.', arrows: [
      { from: 'F1', to: { x: 17, y: 25 }, color: 'us' }, { from: 'M1', to: { x: 35, y: 49 }, color: 'us' },
      { from: 'F5', to: { x: 28, y: 38 }, color: 'us' }, { from: 'W1', to: { x: 18, y: 45 }, color: 'us' }
    ]},
    { name: 'Phase 3', note: 'Other side and deeper support balance the ground.', arrows: [
      { from: 'W2', to: { x: 69, y: 60 }, color: 'us' }, { from: 'M3', to: { x: 50, y: 58 }, color: 'us' },
      { from: 'F2', to: { x: 30, y: 17 }, color: 'us' }, { from: 'B3', to: { x: 34, y: 80 }, color: 'us' }
    ]},
  ],
};

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function getLane(x) { if (x < 16.67) return 1; if (x < 33.34) return 2; if (x < 50.01) return 3; if (x < 66.68) return 4; if (x < 83.35) return 5; return 6; }

function getNextCustomLabel(team, players) {
  const prefix = team === 'us' ? 'U' : 'X';
  const numbers = players
    .filter((player) => player.label.startsWith(prefix))
    .map((player) => Number(player.label.slice(1)))
    .filter((value) => Number.isFinite(value));
  const next = numbers.length ? Math.max(...numbers) + 1 : 1;
  return `${prefix}${next}`;
}

function buildFeedback(players, ball, selectedScenario) {
  const us = players.filter((p) => p.team === 'us');
  const opp = players.filter((p) => p.team === 'opp');
  const byId = Object.fromEntries(players.map((p) => [p.id, p]));
  const nearbyOptions = us.filter((p) => p.id !== 'B2' && distance(p, ball) < 18);
  const aheadOptions = us.filter((p) => p.y < ball.y - 8);
  const corridorCount = us.filter((p) => [3, 4].includes(getLane(p.x))).length;
  const boundarySide = ball.x < 20 || ball.x > 80;
  const oppositeSideCount = us.filter((p) => { if (ball.x < 20) return p.x > 50; if (ball.x > 80) return p.x < 50; return false; }).length;
  const forwardTargets = ['F2', 'F4'].map((id) => byId[id]).filter(Boolean);
  const runners = ['F5', 'F6', 'W1', 'W2'].map((id) => byId[id]).filter(Boolean);
  const feedback = [];
  if (nearbyOptions.length < 2) feedback.push({ level: 'warn', text: 'There are not enough short support options near the ball. Add more “run to receive” around the kicker so he is not trapped.' });
  else feedback.push({ level: 'good', text: `You have ${nearbyOptions.length} short support options near the ball, which supports a safer release and handball chain.` });
  if (aheadOptions.length < 4) feedback.push({ level: 'warn', text: 'There are not enough players ahead of the ball. Your shape may become too flat and invite pressure back on the kicker.' });
  if (corridorCount < 3) feedback.push({ level: 'warn', text: 'The corridor looks underused. Even if you exit boundary-side first, you still need inside support to keep “face forward immediately” alive.' });
  else feedback.push({ level: 'good', text: 'You still have corridor presence, which keeps the next kick or handball option open if the boundary side gets squeezed.' });
  if (boundarySide && oppositeSideCount < 2) feedback.push({ level: 'warn', text: 'The opposite side is too empty. If you want “in one side, out the other”, someone must already be working to the far side before the trap arrives.' });
  const targetSpacing = forwardTargets.length === 2 ? Math.abs(forwardTargets[0].y - forwardTargets[1].y) : 0;
  if (targetSpacing < 8) feedback.push({ level: 'warn', text: 'F2 and F4 are too similar in height on the ground. Stagger them so one is a true deeper target and one is the link option one kick higher.' });
  else feedback.push({ level: 'good', text: 'F2 and F4 are staggered well. That gives you both a deeper contest and a link target higher up the ground.' });
  const runnerSpread = runners.filter((p) => p.y < ball.y && Math.abs(p.x - ball.x) > 8).length;
  if (runnerSpread < 2) feedback.push({ level: 'warn', text: 'Your runners are too close to the line of the ball. Stretch the ground more so the next layer can support and the defence has to make a decision.' });
  else feedback.push({ level: 'good', text: 'Your runners are stretching the ground. That should help open a lane for the second and third possession in the chain.' });
  const pressureOpp = opp.filter((p) => distance(p, ball) < 14).length;
  if (pressureOpp >= 3) feedback.push({ level: 'warn', text: 'There is heavy opposition pressure around the ball. If this is realistic pressure, the next action probably needs to be safer and quicker.' });
  if (selectedScenario === 'boundaryChain') {
    const hfLead = byId.F4; const crumber = byId.F1; const insideMid = byId.M1;
    if (hfLead && crumber && crumber.y > hfLead.y + 8) feedback.push({ level: 'good', text: 'Your crumbing forward is staying goal-side of the lead, which suits a spill or front-and-square outcome.' });
    else feedback.push({ level: 'warn', text: 'If the half-forward leads at the boundary, your crumber should stay positioned for the spill rather than joining the same lead lane.' });
    if (insideMid && insideMid.x > 30) feedback.push({ level: 'good', text: 'Your inside mid is protecting the next inside lane instead of getting dragged right to the boundary contest.' });
  }
  return feedback;
}

function PlayerChip({ player, onPointerDown, onDoubleClick, selected, roleHint }) {
  const size = player.team === 'ball' ? 18 : 34;
  const displayLabel = (player.name || player.label || '').trim();
  const dynamicSize = player.team === 'ball' ? 18 : Math.max(34, Math.min(78, 14 + displayLabel.length * 5));
  const width = player.team === 'ball' ? size : dynamicSize;
  return <button type="button" className={`player-chip ${selected ? 'selected' : ''} ${player.team}`} style={{ left: `${player.x}%`, top: `${(player.y / FIELD_HEIGHT) * 100}%`, width: `${width}px`, height: `${size}px`, background: TEAM_COLOURS[player.team] }} onPointerDown={onPointerDown} onDoubleClick={onDoubleClick} title={player.name ? `${roleHint} · ${player.name}` : roleHint}>{displayLabel}</button>;
}

function MovementOverlay({ players, arrows, show, pendingLine }) {
  if (!show && !pendingLine) return null;
  const byId = Object.fromEntries(players.map((p) => [p.id, p]));
  const resolvePoint = (value) => (typeof value === 'string' ? byId[value] : value);
  const allArrows = [...(show ? arrows : []), ...(pendingLine ? [pendingLine] : [])];
  return (
    <svg className="movement-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <marker id="arrow-us" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#60a5fa" /></marker>
        <marker id="arrow-ball" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#fbbf24" /></marker>
      </defs>
      {allArrows.map((arrow, index) => {
        const from = resolvePoint(arrow.from); const to = resolvePoint(arrow.to); if (!from || !to) return null;
        const x1 = from.x; const y1 = (from.y / FIELD_HEIGHT) * 100; const x2 = to.x; const y2 = (to.y / FIELD_HEIGHT) * 100;
        const marker = arrow.color === 'ball' ? 'url(#arrow-ball)' : 'url(#arrow-us)';
        const stroke = arrow.color === 'ball' ? '#fbbf24' : '#60a5fa';
        return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.7" strokeDasharray={arrow.color === 'ball' ? '0' : '2 1.5'} opacity={arrow.pending ? 0.8 : 1} markerEnd={marker} />;
      })}
    </svg>
  );
}

function FieldMarkings() {
  return (
    <svg className="field-markings" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <clipPath id="field-clip">
          <ellipse cx="50" cy="50" rx="48.2" ry="49.8" />
        </clipPath>
      </defs>
      <g clipPath="url(#field-clip)">
        <line className="field-mark field-center-line" x1="50" y1="0" x2="50" y2="100" />
        <line className="field-mark field-guide" x1="0" y1="30" x2="100" y2="30" />
        <line className="field-mark field-guide" x1="0" y1="70" x2="100" y2="70" />
        <path className="field-mark field-arc" d="M 16 16 C 30 28, 70 28, 84 16" />
        <path className="field-mark field-arc" d="M 16 84 C 30 72, 70 72, 84 84" />
        <rect className="field-mark field-goal-square" x="45" y="0" width="10" height="8" />
        <rect className="field-mark field-goal-square" x="45" y="92" width="10" height="8" />
        <line className="field-mark field-goal-post" x1="40" y1="0" x2="40" y2="8" />
        <line className="field-mark field-goal-post" x1="50" y1="0" x2="50" y2="8" />
        <line className="field-mark field-goal-post" x1="60" y1="0" x2="60" y2="8" />
        <line className="field-mark field-goal-post" x1="40" y1="92" x2="40" y2="100" />
        <line className="field-mark field-goal-post" x1="50" y1="92" x2="50" y2="100" />
        <line className="field-mark field-goal-post" x1="60" y1="92" x2="60" y2="100" />
        <rect className="field-mark field-center-square" x="23.5" y="35" width="53" height="30" />
        <circle className="field-mark field-center-circle" cx="50" cy="50" r="3.8" />
        <circle className="field-mark field-center-circle inner" cx="50" cy="50" r="1.4" />
        <path className="field-mark field-fifty" d="M 14 25 C 28 38, 72 38, 86 25" />
        <path className="field-mark field-fifty" d="M 14 75 C 28 62, 72 62, 86 75" />
      </g>
    </svg>
  );
}

export default function App() {
  const fieldRef = useRef(null);
  const [players, setPlayers] = useState(centreBouncePlayers);
  const [ball, setBall] = useState(centreBounceBall);
  const [selectedId, setSelectedId] = useState('M2');
  const [scenario, setScenario] = useState('centreBounce');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [customLines, setCustomLines] = useState([]);
  const [lineStartId, setLineStartId] = useState(null);
  const [lineType, setLineType] = useState('us');
  const [pendingLinePoint, setPendingLinePoint] = useState(null);
  const [customNote, setCustomNote] = useState('Use this board to drag players into shape. Start with one kick, then talk through the next two movements.');
  const [nameDraft, setNameDraft] = useState('');
  const [nameImportText, setNameImportText] = useState('');
  const [undoStack, setUndoStack] = useState([]);
  const selectedPlayer = players.find((p) => p.id === selectedId) || null;
  const feedback = useMemo(() => buildFeedback(players, ball, scenario), [players, ball, scenario]);
  const phases = phaseTemplates[scenario] || [];
  const activePhase = phases[phaseIndex] || null;

  useEffect(() => {
    setNameDraft(selectedPlayer?.name || '');
  }, [selectedPlayer?.id, selectedPlayer?.name]);

  function updateFromPointer(clientX, clientY, targetId) {
    const rect = fieldRef.current?.getBoundingClientRect(); if (!rect) return;
    const x = clamp(((clientX - rect.left) / rect.width) * 100, 2, 98);
    const y = clamp((((clientY - rect.top) / rect.height) * FIELD_HEIGHT), 2, FIELD_HEIGHT - 2);
    if (lineStartId) {
      setPendingLinePoint({ x, y });
      return;
    }
    if (targetId === 'ball') { setBall({ x, y }); return; }
    setPlayers((current) => current.map((player) => (player.id === targetId ? { ...player, x, y } : player)));
  }

  function startDrag(event, targetId) {
    if (lineStartId) return;
    event.preventDefault();
    setSelectedId(targetId);
    const move = (moveEvent) => updateFromPointer(moveEvent.clientX, moveEvent.clientY, targetId);
    const end = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); };
    window.addEventListener('pointermove', move); window.addEventListener('pointerup', end);
  }

  function getFieldPoint(clientX, clientY) {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: clamp(((clientX - rect.left) / rect.width) * 100, 2, 98),
      y: clamp((((clientY - rect.top) / rect.height) * FIELD_HEIGHT), 2, FIELD_HEIGHT - 2),
    };
  }

  function handleFieldPointerMove(event) {
    if (!lineStartId) return;
    const point = getFieldPoint(event.clientX, event.clientY);
    if (point) setPendingLinePoint(point);
  }

  function handleFieldClick(event) {
    if (!lineStartId) return;
    const point = getFieldPoint(event.clientX, event.clientY);
    if (!point) return;
    setCustomLines((current) => [...current, { id: `line-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, from: lineStartId, to: point, color: lineType }]);
    setLineStartId(null);
    setPendingLinePoint(null);
  }

  function handleFieldDoubleClick(event) {
    if (lineStartId) return;
    const point = getFieldPoint(event.clientX, event.clientY);
    if (!point) return;
    addPlayer('us', point);
  }

  function applyPreset(key) {
    const preset = presets[key]; setScenario(key); setPhaseIndex(0);
    setPlayers(preset.players.map((p) => ({ ...p, name: '' }))); setBall({ ...preset.ball }); setCustomNote(preset.notes); setSelectedId('M2');
    setCustomLines([]); setLineStartId(null); setPendingLinePoint(null); setUndoStack([]);
  }

  function addPlayer(team, point = null) {
    const label = getNextCustomLabel(team, players);
    const id = `${team}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const count = players.filter((player) => player.team === team).length;
    const newPlayer = {
      id,
      label,
      team,
      name: '',
      x: point?.x ?? (count % 2 === 0 ? 46 : 54),
      y: point?.y ?? (team === 'us' ? 86 : 54),
    };
    setPlayers([...players, newPlayer]);
    setSelectedId(id);
    setUndoStack((current) => [...current, { type: 'add-player', player: newPlayer, previousSelectedId: selectedId }]);
  }

  function removePlayerById(playerId) {
    const playerToRemove = players.find((player) => player.id === playerId);
    if (!playerToRemove) return;
    const removedLines = customLines.filter((line) => line.from === playerId);
    const remainingPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(remainingPlayers);
    setCustomLines((current) => current.filter((line) => line.from !== playerId));
    setSelectedId(selectedId === playerId ? remainingPlayers[0]?.id || 'M2' : selectedId);
    setUndoStack((current) => [...current, { type: 'remove-player', player: playerToRemove, index: players.findIndex((player) => player.id === playerId), lines: removedLines, previousSelectedId: selectedId }]);
  }

  function removeSelectedPlayer() {
    if (!selectedPlayer) return;
    removePlayerById(selectedPlayer.id);
  }

  function removeAllPlayers() {
    if (players.length === 0) return;
    setUndoStack((current) => [
      ...current,
      {
        type: 'remove-all-players',
        players: players.map((player) => ({ ...player })),
        lines: customLines.map((line) => ({ ...line })),
        previousSelectedId: selectedId,
      },
    ]);
    setPlayers([]);
    setCustomLines([]);
    setSelectedId('');
    setLineStartId(null);
    setPendingLinePoint(null);
  }

  function undoLastChange() {
    const lastAction = undoStack[undoStack.length - 1];
    if (!lastAction) return;
    if (lastAction.type === 'add-player') {
      setPlayers((current) => current.filter((player) => player.id !== lastAction.player.id));
      setSelectedId(lastAction.previousSelectedId || 'M2');
    } else if (lastAction.type === 'remove-player') {
      setPlayers((current) => {
        const withoutPlayer = current.filter((player) => player.id !== lastAction.player.id);
        const insertAt = clamp(lastAction.index, 0, withoutPlayer.length);
        withoutPlayer.splice(insertAt, 0, lastAction.player);
        return withoutPlayer;
      });
      if (lastAction.lines.length) {
        setCustomLines((current) => [...current, ...lastAction.lines]);
      }
      setSelectedId(lastAction.previousSelectedId || lastAction.player.id);
    } else if (lastAction.type === 'remove-all-players') {
      setPlayers(lastAction.players);
      setCustomLines(lastAction.lines);
      setSelectedId(lastAction.previousSelectedId || lastAction.players[0]?.id || 'M2');
    }
    setUndoStack((current) => current.slice(0, -1));
  }

  function startLine(type) {
    if (!selectedPlayer) return;
    setLineType(type);
    setLineStartId(selectedPlayer.id);
    setPendingLinePoint({ x: selectedPlayer.x, y: selectedPlayer.y - 8 });
  }

  function cancelLine() {
    setLineStartId(null);
    setPendingLinePoint(null);
  }

  function removeLinesForSelected() {
    if (!selectedPlayer) return;
    setCustomLines((current) => current.filter((line) => line.from !== selectedPlayer.id));
  }

  function clearAllLines() {
    setCustomLines([]);
    setLineStartId(null);
    setPendingLinePoint(null);
  }

  function saveSelectedName() {
    if (!selectedPlayer) return;
    const nextName = nameDraft.trim();
    setPlayers((current) => current.map((player) => (player.id === selectedPlayer.id ? { ...player, name: nextName } : player)));
  }

  function importPlayerNames() {
    const names = nameImportText
      .split(/\r?\n/)
      .map((value) => value.trim())
      .filter(Boolean);
    if (!names.length) return;
    setPlayers((current) => current.map((player, index) => (names[index] ? { ...player, name: names[index] } : player)));
  }

  function resetBoard() { applyPreset(scenario); }
  function prevPhase() { setPhaseIndex((current) => Math.max(0, current - 1)); }
  function nextPhase() { setPhaseIndex((current) => Math.min(phases.length - 1, current + 1)); }

  const pendingLine = lineStartId && pendingLinePoint ? { from: lineStartId, to: pendingLinePoint, color: lineType, pending: true } : null;
  const allVisibleArrows = [...(activePhase?.arrows || []), ...customLines];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div><h1>AFL Sim Coach</h1><p>Drag the players. Move the ball. Test whether your shape still works.</p></div>
        <div className="topbar-actions">
          <button onClick={() => applyPreset('centreBounce')}>Centre Bounce</button>
          <button onClick={() => applyPreset('kickoutBoundary')}>Kick-out shape</button>
          <button onClick={() => applyPreset('boundaryChain')}>Second-kick shape</button>
          <button onClick={resetBoard}>Reset</button>
          <button onClick={() => setShowControls((value) => !value)}>{showControls ? 'Hide controls' : 'Controls'}</button>
        </div>
      </header>

      <main className="layout-grid">
        <section className="board-panel card">
          <div className="field-shell">
            <div className="field" ref={fieldRef} onPointerMove={handleFieldPointerMove} onClick={handleFieldClick} onDoubleClick={handleFieldDoubleClick}>
              <div className="field-overlay">
                <FieldMarkings />
              </div>
              <MovementOverlay players={[...players, { id: 'ball', x: ball.x, y: ball.y }]} arrows={allVisibleArrows} show={showArrows} pendingLine={pendingLine} />
              {players.map((player) => <PlayerChip key={player.id} player={player} selected={selectedId === player.id} roleHint={roleDescriptions[player.label] || roleDescriptions[player.id] || player.label} onPointerDown={(event) => startDrag(event, player.id)} onDoubleClick={() => removePlayerById(player.id)} />)}
              <PlayerChip player={{ id: 'ball', label: '', team: 'ball', x: ball.x, y: ball.y }} selected={selectedId === 'ball'} roleHint="Ball" onPointerDown={(event) => startDrag(event, 'ball')} />
            </div>
          </div>
        </section>

        {showControls && <aside className="side-panel">
          <section className="card">
            <h2>Phase builder</h2>
            <p className="muted">{activePhase ? `${activePhase.name} · ${phaseIndex + 1}/${phases.length}` : 'No phases for this scenario yet.'}</p>
            <p className="position-readout">{activePhase?.note || 'Choose a preset to view the movement pattern.'}</p>
            <div className="topbar-actions" style={{ marginTop: '10px' }}>
              <button onClick={prevPhase} disabled={phaseIndex === 0}>Prev</button>
              <button onClick={nextPhase} disabled={phaseIndex >= phases.length - 1}>Next</button>
              <button onClick={() => setShowArrows((value) => !value)}>{showArrows ? 'Hide arrows' : 'Show arrows'}</button>
            </div>
          </section>

          <section className="card">
            <h2>Player tools</h2>
            <p className="muted">Double-click a player to remove them. Double-click open field space to add a teammate. Undo restores the last change.</p>
            <div className="topbar-actions" style={{ marginTop: '10px' }}>
              <button onClick={() => addPlayer('us')}>Add teammate</button>
              <button onClick={() => addPlayer('opp')}>Add opponent</button>
              <button onClick={removeSelectedPlayer} disabled={!selectedPlayer}>Remove selected</button>
              <button onClick={removeAllPlayers} disabled={players.length === 0}>Remove all players</button>
              <button onClick={undoLastChange} disabled={undoStack.length === 0}>Undo last change</button>
            </div>
          </section>

          <section className="card">
            <h2>Movement tools</h2>
            <p className="muted">Select a player, then create your own movement line.</p>
            <div className="topbar-actions" style={{ marginTop: '10px' }}>
              <button onClick={() => startLine('us')} disabled={!selectedPlayer || !!lineStartId}>Add player line</button>
              <button onClick={() => startLine('ball')} disabled={!selectedPlayer || !!lineStartId}>Add ball line</button>
              <button onClick={cancelLine} disabled={!lineStartId}>Cancel line</button>
            </div>
            <div className="topbar-actions" style={{ marginTop: '10px' }}>
              <button onClick={removeLinesForSelected} disabled={!selectedPlayer}>Remove selected lines</button>
              <button onClick={clearAllLines} disabled={customLines.length === 0 && !lineStartId}>Clear all lines</button>
            </div>
          </section>

          <section className="card">
            <h2>Selected role</h2>
            {selectedPlayer ? <><div className="role-pill">{selectedPlayer.name || selectedPlayer.label}</div><p className="muted">{roleDescriptions[selectedPlayer.label] || roleDescriptions[selectedPlayer.id] || 'Custom player.'}</p><p className="position-readout">Role {selectedPlayer.label} · Lane {getLane(selectedPlayer.x)}</p></> : <p className="muted">Select a player chip to inspect their role.</p>}
          </section>

          <section className="card">
            <h2>Player names</h2>
            <div className="name-row">
              <input type="text" value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} placeholder="Selected player name" />
              <button onClick={saveSelectedName} disabled={!selectedPlayer}>Write name</button>
            </div>
            <textarea className="name-import" value={nameImportText} onChange={(event) => setNameImportText(event.target.value)} placeholder="Paste one name per line, in roster order." />
            <div className="controls-row" style={{ marginTop: '10px' }}>
              <button onClick={importPlayerNames}>Import names</button>
              <button onClick={() => setNameImportText('')}>Clear import</button>
            </div>
          </section>

          <section className="card">
            <h2>Coach feedback</h2>
            <div className="feedback-list">{feedback.map((item, index) => <div key={`${item.level}-${index}`} className={`feedback-item ${item.level}`}><strong>{item.level === 'good' ? 'Working' : 'Check'}</strong><p>{item.text}</p></div>)}</div>
          </section>

          <section className="card">
            <h2>Scenario notes</h2>
            <textarea value={customNote} onChange={(event) => setCustomNote(event.target.value)} placeholder="Write what the play is, what the cue is, and what the next action should be." />
          </section>
        </aside>}
      </main>
    </div>
  );
}
