const sharedConfig = {
  view: { strokeWidth: 0 },
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
};

function showPlot(id, { vlSpec, tooltipOpts }, values) {
  if (!(values.length)) return;

  const config = { ...sharedConfig, ...vlSpec.config };
  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v2.json",
    width: 600,
    data: { values },
    ...vlSpec,
    config,
  };
  vega.embed(id, spec, { renderer: "svg", actions: false }, function (error, result) {
    if (error) {
      console.error(error);
      return;
    }
    vegaTooltip.vegaLite(result.view, spec, tooltipOpts);
  });
}
