function scatterWithHistograms(x, x_title, y, y_title, facet, facet_title) {
  const emptyAxis = { title: "", labels: false, domain: false, ticks: false };
  const scatterSize = 530;

  return {
    vlSpec: {
    height: 600,
    hconcat: [
      {
        height: scatterSize,
        width: 40,
        mark: "line",
        description: "y-axis dash plot",
        encoding: {
          y: {
            ...y,
            axis: { ...emptyAxis, title: y_title, grid: true }
          },
          x: {
            aggregate: "count",
            type: "quantitative",
            sort: "descending",
            stack: "none",
            axis: emptyAxis
          },
          color: facet,
        }
      },
      {
        vconcat: [
          {
              width: scatterSize,
              height: scatterSize,
              mark: "point",
              encoding: {
                y: {
                  ...y,
                  axis: { title: "", grid: true }
                },
                x: {
                  ...x,
                  axis: { title: "", grid: true }
                },
                color: {
                  ...facet,
                  aggregate: "mean",
                  legend: { title: facet_title + " %", format: ".0p" }
                },
                size: {
                  aggregate: "count",
                  type: "quantitative",
                  legend: { title: "# Games" }
                }
              },
          },
          {
            height: 40,
            width: scatterSize,
            mark: "line",
            description: "x-axis dash plot",
            encoding: {
              x: {
                ...x,
                axis: { ...emptyAxis, title: x_title, grid: true }
              },
              y: {
                aggregate: "count",
                type: "quantitative",
                sort: "descending",
                stack: "none",
                axis: emptyAxis
              },
              color: facet,
            }
          }
        ]
      }
    ],
  },
  tooltipOpts: {
    showAllFields: true, fields: [
      { field: "ka", title: "Kills + Assists" },
      { field: "d", title: "Deaths" },
      { field: "duration_minutes_bin", title: "Duration [Minutes]" },
      // https://github.com/vega/vega-tooltip/issues/129
      { field: "count_*", aggregate: "count", title: "# Games" },
      { ...facet, aggregate: "mean", format: ".0p", title: facet_title + " %" },
    ]
  }
};
}

// Facet must be a binary variable, for aggregate: "mean" to make sense as a %.
const winFacet = {
  field: "win", type: "quantitative",
  scale: { scheme: "redyellowblue", extent: [0, 1] },
};

const kaD = scatterWithHistograms(
  { field: "d", type: "quantitative" }, "Deaths",
  { field: "ka", type: "quantitative" }, "Kills + Assists",
  winFacet, "Win");

const kaDuration = scatterWithHistograms(
  { field: "duration_minutes_bin", type: "nominal" }, "Duration [Minutes]",
  { field: "ka", type: "quantitative" }, "Kills + Assists",
  winFacet, "Win");

const Matches =
  Vue.component('ds-matches', {
    template: `
<div>
  <v-card light raised
        class="elevation-3" style="width: 780px;">
    <v-card-title primary-title>
        <h3 class="headline mb-0"  style="margin: auto;">Kills + Assists vs. Deaths</h3>
    </v-card-title>
    <div id="ka_d"></div>
  </v-card>

  <v-card light raised
        class="elevation-3" style="width: 780px;">
    <v-card-title primary-title>
        <h3 class="headline mb-0"  style="margin: auto;">Kills + Assists vs. Game duration</h3>
    </v-card-title>
      <div id="ka_duration"></div>
  </v-card>
</div>
`,
    watch: {
      playerMatches: function (ms) {
        this.showPlot("#ka_d", kaD, ms);
        this.showPlot("#ka_duration", kaDuration, ms);
      }
    },
    methods: {
      showPlot: function (id, {vlSpec, tooltipOpts}, ms) {
        if (!(ms.length)) return;

        const sharedSpec = {
          $schema: "https://vega.github.io/schema/vega-lite/v2.json",
          width: 600,
          data: { values: ms },
          config: {
            axisY: { titlePadding: -20 },
            axisX: { titlePadding: 10 },
            cell: { strokeWidth: 0 },
            range: {
              heatmap: {
                scheme: "greenblue"
              }
            },
            axis: {
              labelFontSize: 14,
              titleFontSize: 16,
              gridWidth: 0.5
            },
            legend: {
              labelFontSize: 14,
              titleFontSize: 16
            }
          },
        };

        const spec = { ...sharedSpec, ...vlSpec };
        vega.embed(id, spec, { renderer: "svg", actions: false }, function (error, result) {
          if (error) {
            console.error(error);
            return;
          }
          vegaTooltip.vegaLite(result.view, spec, tooltipOpts);
        });
      },
    },

    asyncComputed: {
      playerMatches: {
        async get() {
          if (!this.$route.name) return [];
          const pid = this.$route.params["player_id"];
          if (!pid) return [];
          const resp = await fetch(`https://api.opendota.com/api/players/${pid}/matches?significant=1`);
          const origMatches = await resp.json();
          const ms = origMatches.map(m => ({
            ...m,
            win: +(m.radiant_win === (m.player_slot < 128)),
            duration_minutes: Math.floor(m.duration / 60),

            ka: m.kills + m.assists,
            d: m.deaths,
            ka_d: (m.kills + m.assists) / (m.deaths || 1),
          }));

          return ms.map(m => ({
            ...m,
            duration_minutes_bin: m.duration_minutes >= 90 ? "[90, inf)" :
              `[${10 * Math.floor(m.duration_minutes / 10)}, ${10 * (1 + Math.floor(m.duration_minutes / 10))})`
          }));
        },
        default: []
      },
    }
  });
