
export const drawOverallPercentileChart = function({ low, high, val }) {
  console.log('------------');
  console.log(low, high, val);
  let valueLabelWidth = 40; // space reserved for value labels (right)
  let barHeight = 20; // height of one bar
  let barLabelWidth = 10; // space reserved for bar labels
  let barLabelPadding = 5; // padding between bar and bar labels (left)
  let gridLabelHeight = 25; // space reserved for gridline labels
  let gridChartOffset = 20; // space between start of grid and first bar
  let maxBarWidth = 650; // width of the bar with the max value

  let d3 = window.d3;
  let data = [
    {
      'Name': 'Low-High',
      'Value': val
    },
  ];

  // accessor functions
  // let barLabel = function(d) { return d['Name']; };
  let barValue = function(d) { return parseFloat(d['Value']); };

  // scales
  let yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
  let y = function(d, i) {
    return yScale(i);
  };
  // let yText = function(d, i) {
  //   return y(d, i) + yScale.rangeBand() / 2;
  // };
  let x = d3.scale.linear().domain([0, 100]).range([0, maxBarWidth]);
  // let x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);

  // initialization
  d3.select('#chart-overall-percentile').selectAll("svg").remove();

  // svg container element
  let chart = d3.select('#chart-overall-percentile').append("svg")
    .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
    .attr('height', 2 * gridLabelHeight + gridChartOffset + data.length * barHeight);

  let gridContainer = chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ', 0)');
  // vertical grid lines
  gridContainer.selectAll("line").data(x.ticks(4)).enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", yScale.rangeExtent()[1] + 2 * gridChartOffset + 5)
    .attr("shape-rendering", "crispEdges")
    .style("stroke", "#aeaeae");

  // grid line labels
  gridContainer.selectAll("text").data(x.ticks(4)).enter().append("text")
    .attr("x", x)
    .attr("y", gridLabelHeight + 2 * gridChartOffset + data.length * barHeight)
    .attr("dy", 1)
    .attr("text-anchor", "middle")
    .text((data, index) => 20 * index + '%');

  // bar labels
  // let labelsContainer = chart.append('g')
  //   .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + gridChartOffset + ')');
  // labelsContainer.selectAll('text').data(data).enter().append('text')
  //   .attr('y', yText)
  //   .attr('stroke', 'none')
  //   .attr('fill', 'black')
  //   .attr("dy", ".35em") // vertical-align: middle
  //   .attr('text-anchor', 'end')
  //   .text(barLabel);


  // bars - value line
  let barsContainer = chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ',' + gridChartOffset + ')');
  barsContainer.selectAll("rect").data(data).enter().append("rect")
    .attr('y', y)
    .attr('height', yScale.rangeBand())
    .attr('width', function(d) { return x(barValue(d)); })
    .attr('stroke', 'steelblue')
    .attr('fill', 'steelblue');

  // bar value labels
  // barsContainer.selectAll("text").data(data).enter().append("text")
  //   .attr("x", function(d) { return x(barValue(d)); })
  //   .attr("y", yText)
  //   .attr("dx", 3) // padding-left
  //   .attr("dy", ".35em") // vertical-align: middle
  //   .attr("text-anchor", "start") // text-align: right
  //   .attr("fill", "black")
  //   .attr("stroke", "none")
  //   .text(function(d) { return d3.round(barValue(d), 2); });

  // start line
  barsContainer.append("line")
    .attr("y1", -gridChartOffset)
    .attr("y2", yScale.rangeExtent()[1] + gridChartOffset + 5)
    .attr("shape-rendering", "crispEdges")
    .style("stroke", "#aeaeae");

  // draw low value line
  barsContainer.append("line")
    .attr("x1", low / 100 * maxBarWidth)
    .attr("x2", maxBarWidth)
    .attr("y1", -gridChartOffset + barHeight / 2 + gridChartOffset)
    .attr("y2", -gridChartOffset + barHeight / 2 + gridChartOffset)
    .style("stroke", "#000");
  barsContainer.append("line")
    .attr("x1", low / 100 * maxBarWidth)
    .attr("x2", low / 100 * maxBarWidth)
    .attr("y1", -gridChartOffset + barHeight / 2 + gridChartOffset - 3)
    .attr("y2", -gridChartOffset + barHeight / 2 + gridChartOffset + 3)
    .style("stroke", "#000");
  barsContainer.append("line")
    .attr("x1", maxBarWidth - 1)
    .attr("x2", maxBarWidth - 1)
    .attr("y1", -gridChartOffset + barHeight / 2 + gridChartOffset - 3)
    .attr("y2", -gridChartOffset + barHeight / 2 + gridChartOffset + 3)
    .style("stroke", "#000");

  // draw bottom line
  chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ', ' + (yScale.rangeExtent()[1] + gridChartOffset + gridChartOffset) + ')')
    .append("line")
    .attr("x1", 0)
    .attr("x2", maxBarWidth)
    .attr("shape-rendering", "crispEdges")
    // .attr("y1", yScale.rangeExtent()[1] + gridChartOffset)
    // .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
    .style("stroke", "#aeaeae");
};
