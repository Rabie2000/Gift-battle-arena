export class Leaderboard {
  constructor(el) { this.el = el; }
  render(ranking) {
    this.el.innerHTML =
      '<div class="lb-title">🏆 Leaderboard</div>' +
      ranking.map((p, i) =>
        `<div class="lb-row"><span>${i + 1}. ${p.name}</span><b>${p.score}</b></div>`
      ).join('');
  }
}
