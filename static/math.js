function toBetaDist(wins, games) {
  const x = 75; // Based on hero win rates, best fit variance to a beta(x, x) distribution.
  const a = x + wins;
  const b = x + games - wins;
  return [a, b];
}

// Returns the estimates of [mu-sigma, mu, mu+sigma]
// for a Beta(a, b) distribution.
function betaCI(a, b) {
  return ([.16, .5, .84]
    .map(i => jStat.beta.inv(i, a, b)));
}

// Returns the deciles for a Beta(a, b) distribution.
// That is, [r_1, ..., r_9] s.t. CDF(r_i) = 0.1 * i.
function betaDeciles(a, b) {
  return ([.1, .2, .3, .4, .5, .6, .7, .8, .9]
    .map(i => jStat.beta.inv(i, a, b)));
}

// http://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=9 .reverse()
function betaCssGradient(a, b) {
  // rescale to zoom in on [25%, 75%]
  const pcts = betaDeciles(a, b)
    .map(x => ((x * 2 - 0.5)))
    .map(toPctFixed(2));
  const colors = [
    "#1a9850",
    "#66bd63",
    "#a6d96a",
    "#d9ef8b",
    "#ffffbf",
    "#fee08b",
    "#fdae61",
    "#f46d43",
    "#d73027"
  ];

  let s = "background-position-y: center; " +
    "background-size: 100% 50%; " +
    "background-image: linear-gradient(to right";
  for (let i = 0; i < 9; i++) {
    s += `, ${colors[i]} ${pcts[i]}`;
  }
  return s + ")";
}

function toPctFixed(n) {
  return x => ((x * 100).toFixed(n) + '%');
}

// https://en.wikipedia.org/wiki/Binomial_distribution#Wilson_.28score.29_method.5B20.5D
function binomialWilsonScore(n, p, z) {
  return (p + z ** 2 / (2 * n) + z * Math.sqrt(p * (1 - p) / n + z ** 2 / (4 * n ** 2))) / (1 + z ** 2 / n);
}