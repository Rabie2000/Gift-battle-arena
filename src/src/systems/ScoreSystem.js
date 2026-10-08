export class ScoreSystem {
  constructor(players) {
    this.players = players.map((p) => ({ name: p.name, score: 0, energy: 100 }));
    this.listeners = [];
  }
  onChange(fn) { this.listeners.push(fn); }
  add(index, points) {
    const p = this.players[index];
    if (!p) return;
    p.score += points;
    this.emit();
  }
  ranking() { return [...this.players].sort((a, b) => b.score - a.score); }
  emit() { this.listeners.forEach((fn) => fn(this.ranking())); }
}
