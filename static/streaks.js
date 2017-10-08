function logSurvivalSpec(tickCount) {

  const wlColor = {
    field: "win",
    type: "nominal",
    scale: {
      domain: [true, false],
      range: ["#4575b4", "#d73027"]  // redyellowblue-8
    },
  };

  return {
    vlSpec: {
      height: 600,
      width: 570,
      config: {
        line: {
          strokeDash: [5, 5],
        },
      },
      layer: [
        {
          mark: "rule",
          encoding: {
            x: {
              field: "expectedStreak", type: "ordinal",
              axis: null,
            },
            y: {
              field: "expectedY", type: "quantitative",
              axis: null,
            },
            y2: {
              field: "expectedY2", type: "quantitative",
              axis: null,
            },
          },
        },
        {
          mark: "line",
          encoding: {
            x: {
              field: "streak",
              type: "ordinal",
              axis: null,
            },
            y: {
              field: "logSurvivalFraction",
              type: "quantitative",
            },
            color: wlColor,
          },
        },
        {
          mark: "circle",
          encoding: {
            x: {
              field: "streak",
              type: "ordinal",
              axis: { title: "Streak length [# Games]", grid: true },
            },
            y: {
              field: "logSurvivalFraction",
              type: "quantitative",
              axis: { title: "Log survival fraction", tickCount },
            },
            color: {
              ...wlColor,
              legend: { title: "", values: ["Win", "Loss"] },
            },
            size: {
              value: 100,
            },
          },
        },
      ],
    },
    tooltipOpts: {
      showAllFields: true, fields: [
        { field: "streak", title: "Streak length" },
      ]
    }
  };
}

const Streaks = Vue.component('ds-streaks', {
  template: `
  <div>
    <v-card light raised
      class="elevation-3" style="width: 780px;">
      <v-card-title primary-title>
        <h3 class="headline mb-0"  style="margin: auto;">Win/Loss streak survival curve</h3>
      </v-card-title>
      <div id="km"></div>
    </v-card>
  </div>
  `,
  watch: {
    needsRender: function () {
      showPlot("#km",
        logSurvivalSpec(this.logSurvivalData.tickCount),
        this.logSurvivalData.values);
    },
  },
  asyncComputed: {
    playerMatches: {
      async get() {
        if (!this.$route.name) return [];
        const pid = this.$route.params["player_id"];
        if (!pid) return [];

        let url = `https://api.opendota.com/api/players/${pid}/matches?significant=1`;
        const resp = await fetch(url);
        const origMatches = await resp.json();
        return origMatches.map(m => ({
          win: +(m.radiant_win === (m.player_slot < 128)),
        }));
      },
      default: []
    },
  },
  computed: {
    logSurvivalData() {
      // wins[i] counts the number of runs containing >= i wins
      const wins = [0, 0];
      const losses = [0, 0];
      let prev = null;
      let streak = 0;
      for (const m of this.playerMatches || []) {
        if (prev === m.win) {
          streak++;
        } else {
          wins[0]++;
          losses[0]++;
          prev = m.win;
          streak = 1;
        }
        const xs = m.win ? wins : losses;
        if (streak < xs.length) {
          xs[streak]++;
        } else {
          xs.push(1);
        }
      }

      const runs = wins[0];
      const values = [];
      wins.forEach((count, streak) => {
        values.push({ win: true, streak, count, logSurvivalFraction: Math.log2(count / runs) });
      });
      losses.forEach((count, streak) => {
        values.push({ win: false, streak, count, logSurvivalFraction: Math.log2(count / runs) });
      });

      // Overlay the 95% confidence intervals
      const alpha = 0.95;
      const z = jStat.normal.inv(alpha, 0, 1);
      const maxStreakLength = Math.max(wins.length, losses.length);
      for (let i = 0; i < maxStreakLength; i++) {
        const p = 2 ** -i;
        const lb = binomialWilsonScore(runs, p, -z);
        const ub = binomialWilsonScore(runs, p, z);
        values.push({
          expectedStreak: i,
          expectedY: Math.log2(lb),
          expectedY2: Math.log2(ub),
        });
      }

      const tickCount = Math.round(-1 * Math.min(
        wins[wins.length - 1] / runs,
        losses[losses.length - 1] / runs,
        binomialWilsonScore(runs, 2 ** (maxStreakLength - 1), -z)
      ));
      return { tickCount, values };
    },
    autocorrelationData() {
      const wl = (this.playerMatches || []).map(m => m.win);
      console.log(wl);
      const values = [];
      return {values};
    },
    needsRender() {
      this.logSurvivalData;
      this.autocorrelationData;
      return Date.now();
    },
  },
});
