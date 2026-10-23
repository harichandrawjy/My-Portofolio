// Long-only Markowitz frontier, solved the way Arus does it: projected gradient
// descent with an exact Euclidean projection onto the probability simplex.
// Inputs are illustrative sector figures, not market data.

export type Asset = { name: string; mu: number; sigma: number };

export const assets: Asset[] = [
  { name: "Banks", mu: 0.12, sigma: 0.18 },
  { name: "Telecom", mu: 0.08, sigma: 0.15 },
  { name: "Consumer", mu: 0.07, sigma: 0.13 },
  { name: "Mining", mu: 0.16, sigma: 0.32 },
  { name: "Property", mu: 0.1, sigma: 0.26 },
];

const correlation = [
  [1.0, 0.45, 0.4, 0.35, 0.5],
  [0.45, 1.0, 0.35, 0.2, 0.3],
  [0.4, 0.35, 1.0, 0.15, 0.3],
  [0.35, 0.2, 0.15, 1.0, 0.4],
  [0.5, 0.3, 0.3, 0.4, 1.0],
];

export const riskFree = 0.06;

const n = assets.length;
const mu = assets.map((a) => a.mu);
const cov = assets.map((a, i) =>
  assets.map((b, j) => correlation[i][j] * a.sigma * b.sigma),
);

export type Portfolio = {
  weights: number[];
  ret: number;
  vol: number;
  sharpe: number;
};

/** Exact projection onto { w : w_i >= 0, sum(w) = 1 } (Duchi et al., 2008). */
export function projectToSimplex(v: number[]): number[] {
  const u = [...v].sort((a, b) => b - a);
  let cumulative = 0;
  let theta = 0;
  for (let i = 0; i < u.length; i++) {
    cumulative += u[i];
    const t = (cumulative - 1) / (i + 1);
    if (u[i] - t > 0) theta = t;
  }
  return v.map((x) => Math.max(x - theta, 0));
}

function describe(weights: number[]): Portfolio {
  let ret = 0;
  let variance = 0;
  for (let i = 0; i < n; i++) {
    ret += mu[i] * weights[i];
    for (let j = 0; j < n; j++) variance += weights[i] * cov[i][j] * weights[j];
  }
  const vol = Math.sqrt(variance);
  return { weights, ret, vol, sharpe: (ret - riskFree) / vol };
}

// Gershgorin bound on the largest eigenvalue of 2Σ gives a safe step size.
const lipschitz =
  2 * Math.max(...cov.map((row) => row.reduce((s, x) => s + Math.abs(x), 0)));
const step = 1 / lipschitz;

/** Minimise wᵀΣw − λ·μᵀw over the simplex, warm-started from `start`. */
function solve(lambda: number, start: number[], iterations: number): number[] {
  let w = start;
  for (let k = 0; k < iterations; k++) {
    const grad = w.map((_, i) => {
      let g = -lambda * mu[i];
      for (let j = 0; j < n; j++) g += 2 * cov[i][j] * w[j];
      return g;
    });
    w = projectToSimplex(w.map((x, i) => x - step * grad[i]));
  }
  return w;
}

/**
 * One parameterised frontier: sweep λ from 0 (minimum variance) until the
 * portfolio is fully in the highest-return asset, then resample at evenly
 * spaced returns so a slider moves along the curve at a steady pace.
 */
export function computeFrontier(points = 61): Portfolio[] {
  const dense: Portfolio[] = [];
  let w = new Array(n).fill(1 / n);
  const lambdaMax = 4;
  const steps = 400;
  for (let s = 0; s <= steps; s++) {
    const lambda = lambdaMax * (s / steps) ** 2;
    w = solve(lambda, w, s === 0 ? 4000 : 400);
    dense.push(describe(w));
  }

  const lo = dense[0].ret;
  const hi = Math.max(...mu);
  const out: Portfolio[] = [];
  let k = 0;
  for (let p = 0; p < points; p++) {
    const target = lo + ((hi - lo) * p) / (points - 1);
    while (k < dense.length - 2 && dense[k + 1].ret < target) k++;
    const a = dense[k];
    const b = dense[k + 1];
    const t = b.ret === a.ret ? 0 : Math.min(1, Math.max(0, (target - a.ret) / (b.ret - a.ret)));
    out.push(describe(a.weights.map((x, i) => x + t * (b.weights[i] - x))));
  }
  return out;
}

export function assetPoint(i: number) {
  return { ret: mu[i], vol: Math.sqrt(cov[i][i]) };
}
