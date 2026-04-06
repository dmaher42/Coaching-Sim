import React, { useMemo, useRef, useState } from 'react';

const FIELD_WIDTH = 100;
const FIELD_HEIGHT = 140;

const TEAM_COLOURS = {
  us: '#1d4ed8',
  opp: '#dc2626',
  ball: '#f59e0b',
};

const roleDescriptions = {
  B1: 'Small defender',
  B2: 'Key defender 1',
  B3: 'Rebound defender 1',
  B4: 'Key defender 2',
  B5: 'High defender',
  B6: 'Rebound defender 2',
  W1: 'Wing 1',
  W2: 'Wing 2',
  M1: 'Reader mid',
  M2: 'Target mid',
  M3: 'Sweeper mid',
  R: 'Ruck',
  F1: 'Crumbing forward',
  F2: 'Deep tall forward',
  F3: 'Pressure forward',
  F4: 'Link tall',
  F5: 'Hybrid medium',
  F6: 'Puma forward/mid',
};

const basePlayers = [
  { id: 'B1', label: 'B1', team: 'us', x: 14, y: 110 },
  { id: 'B2', label: 'B2', team: 'us', x: 34, y: 119 },
  { id: 'B3', label: 'B3', team: 'us', x: 50, y: 112 },
  { id: 'B4', label: 'B4', team: 'us', x: 66, y: 119 },
  { id: 'B5', label: 'B5', team: 'us', x: 38, y: 96 },
  { id: 'B6', label: 'B6', team: 'us', x: 62, y: 96 },
  { id: 'W1', label: 'W1', team: 'us', x: 15, y: 73 },
  { id: 'W2', label: 'W2', team: 'us', x: 85, y: 73 },
  { id: 'M1', label: 'M1', team: 'us', x: 42, y: 73 },
  { id: 'M2', label: 'M2', team: 'us', x: 50, y: 66 },
  { id: 'M3', label: 'M3', team: 'us', x: 58, y: 73 },
  { id: 'R', label: 'R', team: 'us', x: 50, y: 58 },
  { id: 'F1', label: 'F1', team: 'us', x: 22, y: 40 },
  { id: 'F2', label: 'F2', team: 'us', x: 48, y: 19 },
  { id: 'F3', label: 'F3', team: 'us', x: 73, y: 22 },
  { id: 'F4', label: 'F4', team: 'us', x: 51, y: 35 },
  { id: 'F5', label: 'F5', team: 'us', x: 35, y: 48 },
  { id: 'F6', label: 'F6', team: 'us', x: 66, y: 50 },
  { id: 'O1', label: 'O1', team: 'opp', x: 16, y: 102 },
  { id: 'O2', label: 'O2', team: 'opp', x: 33, y: 111 },
  { id: 'O3', label: 'O3', team: 'opp', x: 51, y: 104 },
  { id: 'O4', label: 'O4', team: 'opp', x: 67, y: 111 },
  { id: 'O5', label: 'O5', team: 'opp', x: 42, y: 88 },
  { id: 'O6', label: 'O6', team: 'opp', x: 60, y: 88 },
  { id: 'O7', label: 'O7', team: 'opp', x: 18, y: 57 },
  { id: 'O8', label: 'O8', team: 'opp', x: 33, y: 57 },
  { id: 'O9', label: 'O9', team: 'opp', x: 49, y: 50 },
  { id: 'O10', label: 'O10', team: 'opp', x: 66, y: 57 },
  { id: 'O11', label: 'O11', team: 'opp', x: 81, y: 57 },
  { id: 'O12', label: 'O12', team: 'opp', x: 30, y: 28 },
  { id: 'O13', label: 'O13', team: 'opp', x: 48, y: 11 },
  { id: 'O14', label: 'O14', team: 'opp', x: 68, y: 21 },
];

const centreBouncePlayers = [
  { id: 'B1', label: 'B1', team: 'us', x: 20, y: 118 },
  { id: 'B2', label: 'B2', team: 'us', x: 40, y: 122 },
  { id: 'B3', label: 'B3', team: 'us', x: 50, y: 116 },
  { id: 'B4', label: 'B4', team: 'us', x: 60, y: 122 },
  { id: 'B5', label: 'B5', team: 'us', x: 35, y: 102 },
  { id: 'B6', label: 'B6', team: 'us', x: 65, y: 102 },
  { id: 'W1', label: 'W1', team: 'us', x: 16, y: 70 },
  { id: 'W2', label: 'W2', team: 'us', x: 84, y: 70 },
  { id: 'M1', label: 'M1', team: 'us', x: 44, y: 72 },
  { id: 'M2', label: 'M2', team: 'us', x: 50, y: 66 },
  { id: 'M3', label: 'M3', team: 'us', x: 56, y: 72 },
  { id: 'R', label: 'R', team: 'us', x: 50, y: 58 },
  { id: 'F1', label: 'F1', team: 'us', x: 24, y: 28 },
  { id: 'F2', label: 'F2', team: 'us', x: 46, y: 18 },
  { id: 'F3', label: 'F3', team: 'us', x: 76, y: 28 },
  { id: 'F4', label: 'F4', team: 'us', x: 54, y: 34 },
  { id: 'F5', label: 'F5', team: 'us', x: 38, y: 46 },
  { id: 'F6', label: 'F6', team: 'us', x: 62, y: 46 },
  { id: 'O1', label: 'O1', team: 'opp', x: 22, y: 108 },
  { id: 'O2', label: 'O2', team: 'opp', x: 40, y: 112 },
  { id: 'O3', label: 'O3', team: 'opp', x: 50, y: 106 },
  { id: 'O4', label: 'O4', team: 'opp', x: 60, y: 112 },
  { id: 'O5', label: 'O5', team: 'opp', x: 38, y: 86 },
  { id: 'O6', label: 'O6', team: 'opp', x: 62, y: 86 },
  { id: 'O7', label: 'O7', team: 'opp', x: 18, y: 66 },
  { id: 'O8', label: 'O8', team: 'opp', x: 34, y: 66 },
  { id: 'O9', label: 'O9', team: 'opp', x: 50, y: 50 },
  { id: 'O10', label: 'O10', team: 'opp', x: 66, y: 66 },
  { id: 'O11', label: 'O11', team: 'opp', x: 82, y: 66 },
  { id: 'O12', label: 'O12', team: 'opp', x: 28, y: 24 },
  { id: 'O13', label: 'O13', team: 'opp', x: 50, y: 14 },
  { id: 'O14', label: 'O14', team: 'opp', x: 72, y: 24 },
];

const centreBounceBall = { x: 50, y: 58 };

const presets = {
  centreBounce: {
    name: 'Centre bounce start',
    players: centreBouncePlayers,
    ball: centreBounceBall,
    notes: 'Centre bounce starting positions. Use this to set your stoppage structure and first movement patterns.',
  },
  kickoutBoundary: {
    name: 'Kick-out to boundary half-back',
    players: basePlayers.map((p) => {
      const moves = {
        B1: { x: 18, y: 106 },
        B3: { x: 38, y: 102 },
        B5: { x: 30, y: 87 },
        W1: { x: 18, y: 66 },
        M1: { x: 35, y: 70 },
        M2: { x: 47, y: 66 },
        M3: { x: 60, y: 77 },
        W2: { x: 84, y: 75 },
        F4: { x: 26, y: 46 },
        F5: { x: 40, y: 54 },
        F6: { x: 60, y: 60 },
        F2: { x: 26, y: 24 },
        F3: { x: 54, y: 24 },
        F1: { x: 15, y: 28 },
      };
      return moves[p.id] ? { ...p, ...moves[p.id] } : p;
    }),
    ball: { x: 15, y: 104 },
    notes: 'Boundary exit example. Support should come in layers, not all to the same contest.',
  },
  boundaryChain: {
    name: 'Second kick from half-back to half-forward boundary',
    players: basePlayers.map((p) => {
      const moves = {
        B1: { x: 12, y: 96 },
        B3: { x: 26, y: 88 },
        B5: { x: 21, y: 73 },
        W1: { x: 16, y: 54 },
        M1: { x: 26, y: 58 },
        M2: { x: 38, y: 58 },
        M3: { x: 52, y: 64 },
        W2: { x: 78, y: 66 },
        F4: { x: 18, y: 40 },
        F5: { x: 34, y: 46 },
        F6: { x: 49, y: 50 },
        F2: { x: 24, y: 21 },
        F3: { x: 45, y: 20 },
        F1: { x: 12, y: 24 },
      };
      return moves[p.id] ? { ...p, ...moves[p.id] } : p;
    }),
    ball: { x: 14, y: 43 },
    notes: 'The next movement after the first safe kick. Think next layer, front-and-square, and lane balance.',
  },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getLane(x) {
  if (x < 16.67) return 1;
  if (x < 33.34) return 2;
  if (x < 50.01) return 3;
  if (x < 66.68) return 4;
  if (x < 83.35) return 5;
  return 6;
}

function buildFeedback(players, ball, selectedScenario) {
  const us = players.filter((p) => p.team === 'us');
  const opp = players.filter((p) => p.team === 'opp');
  const byId = Object.fromEntries(players.map((p) => [p.id, p]));
  const nearbyOptions = us.filter((p) => p.id !== 'B2' && distance(p, ball) < 18);
  const aheadOptions = us.filter((p) => p.y < ball.y - 8);
  const corridorCount = us.filter((p) => [3, 4].includes(getLane(p.x))).length;
  const boundarySide = ball.x < 20 || ball.x > 80;
  const oppositeSideCount = us.filter((p) => {
    if (ball.x < 20) return p.x > 50;
    if (ball.x > 80) return p.x < 50;
    return false;
  }).length;
  const forwardTargets = ['F2', 'F4'].map((id) => byId[id]).filter(Boolean);
  const runners = ['F5', 'F6', 'W1', 'W2'].map((id) => byId[id]).filter(Boolean);
  const feedback = [];

  if (nearbyOptions.length < 2) {
    feedback.push({
      level: 'warn',
      text: 'There are not enough short support options near the ball. Add more “run to receive” around the kicker so he is not trapped.',
    });
  } else {
    feedback.push({
      level: 'good',
      text: `You have ${nearbyOptions.length} short support options near the ball, which supports a safer release and handball chain.`,
    });
  }

  if (aheadOptions.length < 4) {
    feedback.push({
      level: 'warn',
      text: 'There are not enough players ahead of the ball. Your shape may become too flat and invite pressure back on the kicker.',
    });
  }

  if (corridorCount < 3) {
    feedback.push({
      level: 'warn',
      text: 'The corridor looks underused. Even if you exit boundary-side first, you still need inside support to keep “face forward immediately” alive.',
    });
  } else {
    feedback.push({
      level: 'good',
      text: 'You still have corridor presence, which keeps the next kick or handball option open if the boundary side gets squeezed.',
    });
  }

  if (boundarySide && oppositeSideCount < 2) {
    feedback.push({
      level: 'warn',
      text: 'The opposite side is too empty. If you want “in one side, out the other”, someone must already be working to the far side before the trap arrives.',
    });
  }

  const targetSpacing = forwardTargets.length === 2 ? Math.abs(forwardTargets[0].y - forwardTargets[1].y) : 0;
  if (targetSpacing < 8) {
    feedback.push({
      level: 'warn',
      text: 'F2 and F4 are too similar in height on the ground. Stagger them so one is a true deeper target and one is the link option one kick higher.',
    });
  } else {
    feedback.push({
      level: 'good',
      text: 'F2 and F4 are staggered well. That gives you both a deeper contest and a link target higher up the ground.',
    });
  }

  const runnerSpread = runners.filter((p) => p.y < ball.y && Math.abs(p.x - ball.x) > 8).length;
  if (runnerSpread < 2) {
    feedback.push({
      level: 'warn',
      text: 'Your runners are too close to the line of the ball. Stretch the ground more so the next layer can support and the defence has to make a decision.',
    });
  } else {
    feedback.push({
      level: 'good',
      text: 'Your runners are stretching the ground. That should help open a lane for the second and third possession in the chain.',
    });
  }

  const pressureOpp = opp.filter((p) => distance(p, ball) < 14).length;
  if (pressureOpp >= 3) {
    feedback.push({
      level: 'warn',
      text: 'There is heavy opposition pressure around the ball. If this is realistic pressure, the next action probably needs to be safer and quicker.',
    });
  }

  if (selectedScenario === 'boundaryChain') {
    const hfLead = byId.F4;
    const crumber = byId.F1;
    const insideMid = byId.M1;
    if (hfLead && crumber && crumber.y > hfLead.y + 8) {
      feedback.push({
        level: 'good',
        text: 'Your crumbing forward is staying goal-side of the lead, which suits a spill or front-and-square outcome.',
      });
    } else {
      feedback.push({
        level: 'warn',
        text: 'If the half-forward leads at the boundary, your crumber should stay positioned for the spill rather than joining the same lead lane.',
      });
    }
    if (insideMid && insideMid.x > 30) {
      feedback.push({
        level: 'good',
        text: 'Your inside mid is protecting the next inside lane instead of getting dragged right to the boundary contest.',
      });
    }
  }

  return feedback;
}

function PlayerChip({ player, onPointerDown, selected, roleHint }) {
  const size = player.team === 'ball' ? 18 : 34;
  return (
    <button
      type="button"
      className={`player-chip ${selected ? 'selected' : ''} ${player.team}`}
      style={{
        left: `${player.x}%`,
        top: `${(player.y / FIELD_HEIGHT) * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: TEAM_COLOURS[player.team],
      }}
      onPointerDown={onPointerDown}
      title={roleHint}
    >
      {player.label}
    </button>
  );
}

export default function App() {
  const fieldRef = useRef(null);
  const [players, setPlayers] = useState(centreBouncePlayers);
  const [ball, setBall] = useState(centreBounceBall);
  const [selectedId, setSelectedId] = useState('M2');
  const [scenario, setScenario] = useState('centreBounce');
  const [customNote, setCustomNote] = useState(
    'Use this board to drag players into shape. Start with one kick, then talk through the next two movements.'
  );

  const selectedPlayer = players.find((p) => p.id === selectedId) || null;

  const feedback = useMemo(
    () => buildFeedback(players, ball, scenario),
    [players, ball, scenario]
  );

  function updateFromPointer(clientX, clientY, targetId) {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clamp(((clientX - rect.left) / rect.width) * 100, 2, 98);
    const y = clamp((((clientY - rect.top) / rect.height) * FIELD_HEIGHT), 2, FIELD_HEIGHT - 2);

    if (targetId === 'ball') {
      setBall({ x, y });
      return;
    }

    setPlayers((current) =>
      current.map((player) =>
        player.id === targetId ? { ...player, x, y } : player
      )
    );
  }

  function startDrag(event, targetId) {
    event.preventDefault();
    setSelectedId(targetId);
    updateFromPointer(event.clientX, event.clientY, targetId);

    const move = (moveEvent) => updateFromPointer(moveEvent.clientX, moveEvent.clientY, targetId);
    const end = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
  }

  function applyPreset(key) {
    const preset = presets[key];
    setScenario(key);
    setPlayers(preset.players.map((p) => ({ ...p })));
    setBall({ ...preset.ball });
    setCustomNote(preset.notes);
  }

  function resetBoard() {
    applyPreset(scenario);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1>AFL Sim Coach</h1>
          <p>Drag the players. Move the ball. Test whether your shape still works.</p>
        </div>
        <div className="topbar-actions">
          <button onClick={() => applyPreset('centreBounce')}>Centre Bounce</button>
          <button onClick={() => applyPreset('kickoutBoundary')}>Kick-out shape</button>
          <button onClick={() => applyPreset('boundaryChain')}>Second-kick shape</button>
          <button onClick={resetBoard}>Reset</button>
        </div>
      </header>

      <main className="layout-grid">
        <section className="board-panel card">
          <div className="board-header">
            <div>
              <h2>Visual Board</h2>
              <p>{presets[scenario]?.name || 'Custom shape'}</p>
            </div>
            <div className="legend">
              <span><i className="dot us" /> Your team</span>
              <span><i className="dot opp" /> Opposition</span>
              <span><i className="dot ball" /> Ball</span>
            </div>
          </div>

          <div className="field" ref={fieldRef}>
            <div className="field-overlay">
              {[1, 2, 3, 4, 5].map((line) => (
                <div key={line} className="lane-line" style={{ left: `${(line / 6) * 100}%` }} />
              ))}
              <div className="centre-square" />
              <div className="centre-circle" />
              <div className="arc top" />
              <div className="arc bottom" />
              <div className="goal-square top" />
              <div className="goal-square bottom" />
            </div>

            {players.map((player) => (
              <PlayerChip
                key={player.id}
                player={player}
                selected={selectedId === player.id}
                roleHint={roleDescriptions[player.id] || player.label}
                onPointerDown={(event) => startDrag(event, player.id)}
              />
            ))}

            <PlayerChip
              player={{ id: 'ball', label: '', team: 'ball', x: ball.x, y: ball.y }}
              selected={selectedId === 'ball'}
              roleHint="Ball"
              onPointerDown={(event) => startDrag(event, 'ball')}
            />
          </div>

          <div className="board-footer">
            <p>
              Tip: start with the ball carrier, then ask: who is short support, who is next line,
              who protects the inside, and who stays dangerous ahead of the ball?
            </p>
          </div>
        </section>

        <aside className="side-panel">
          <section className="card">
            <h2>Selected role</h2>
            {selectedPlayer ? (
              <>
                <div className="role-pill">{selectedPlayer.id}</div>
                <p className="muted">{roleDescriptions[selectedPlayer.id] || 'Role description not set.'}</p>
                <p className="position-readout">
                  Lane {getLane(selectedPlayer.x)} · X {Math.round(selectedPlayer.x)} · Y {Math.round(selectedPlayer.y)}
                </p>
              </>
            ) : (
              <p className="muted">Select a player chip to inspect their role.</p>
            )}
          </section>

          <section className="card">
            <h2>Coach feedback</h2>
            <div className="feedback-list">
              {feedback.map((item, index) => (
                <div key={`${item.level}-${index}`} className={`feedback-item ${item.level}`}>
                  <strong>{item.level === 'good' ? 'Working' : 'Check'}</strong>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>Scenario notes</h2>
            <textarea
              value={customNote}
              onChange={(event) => setCustomNote(event.target.value)}
              placeholder="Write what the play is, what the cue is, and what the next action should be."
            />
          </section>

          <section className="card">
            <h2>How to use it</h2>
            <ol>
              <li>Choose a preset or hit reset.</li>
              <li>Drag the ball to where the possession starts.</li>
              <li>Move your players into the shape you want.</li>
              <li>Read the automatic feedback.</li>
              <li>Then talk through the next kick, handball, or contest.</li>
            </ol>
          </section>
        </aside>
      </main>
    </div>
  );
}
