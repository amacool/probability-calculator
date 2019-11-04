import "./style.css";

export const drawOverallPercentileChart = function({ low, high, val }) {
  let valueLabelWidth = 40; // space reserved for value labels (right)
  let barHeight = 20; // height of one bar
  let barLabelWidth = 10; // space reserved for bar labels
  let gridLabelHeight = 25; // space reserved for gridline labels
  let gridChartOffset = 20; // space between start of grid and first bar
  let maxBarWidth = 650; // width of the bar with the max value
  let verticalLineHeight = 60;

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
  let yScale = d3.scaleOrdinal().domain(d3.range(0, data.length)).range([0, data.length * barHeight]);
  let y = function(d, i) {
    return yScale(i);
  };
  let x = d3.scaleLinear().domain([0, 100]).range([0, maxBarWidth]);
  // let x = d3.scale.linear().domain([0, d3.max(data, barValue)]).range([0, maxBarWidth]);

  // initialization
  d3.select('#chart-overall-percentile-bar').selectAll("svg").remove();

  // svg container element
  let chart = d3.select('#chart-overall-percentile-bar').append("svg")
    .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
    .attr('height', 2 * gridLabelHeight + gridChartOffset + data.length * barHeight);

  let gridContainer = chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ', 0)');
  // vertical grid lines
  gridContainer.selectAll("line").data(x.ticks(4)).enter().append("line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", verticalLineHeight)
    .attr("shape-rendering", "crispEdges")
    .style("stroke", "#aeaeae");

  // grid line labels
  gridContainer.selectAll("text").data(x.ticks(4)).enter().append("text")
    .attr("x", x)
    .attr("y", gridLabelHeight + 2 * gridChartOffset + data.length * barHeight)
    .attr("dy", 1)
    .attr("text-anchor", "middle")
    .text((data, index) => 20 * index + '%');

  // bars - value line
  let barsContainer = chart.append('g')
    .attr('transform', 'translate(' + barLabelWidth + ',' + gridChartOffset + ')');
  barsContainer.selectAll("rect").data(data).enter().append("rect")
    .attr('y', y)
    .attr('height', barHeight)
    .attr('width', function(d) { return x(barValue(d)); })
    .attr('stroke', 'steelblue')
    .attr('fill', 'steelblue');

  // start line
  barsContainer.append("line")
    .attr("y1", 0)
    .attr("y2", verticalLineHeight - gridChartOffset)
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
    .attr('transform', 'translate(' + barLabelWidth + ', ' + (verticalLineHeight - 5) + ')')
    .append("line")
    .attr("x1", 0)
    .attr("x2", maxBarWidth)
    .attr("shape-rendering", "crispEdges")
    .style("stroke", "#aeaeae");
};

export const drawOverallRawScoreChart = function({ rawScore, percentileRank, maxScore, historicalAvgScore }) {
  console.log('------------');
  console.log(rawScore, percentileRank, maxScore, historicalAvgScore);
  let valueLabelWidth = 40; // space reserved for value labels (right)
  let barHeight = 20; // height of one bar
  let barLabelWidth = 10; // space reserved for bar labels
  let barLabelPadding = 5; // padding between bar and bar labels (left)
  let gridLabelHeight = 25; // space reserved for gridline labels
  let gridChartOffset = 20; // space between start of grid and first bar
  let maxBarWidth = 650; // width of the bar with the max value

  let d3 = window.d3;
  // 2. Use the margin convention practice
  let margin = { top: 50, right: 50, bottom: 50, left: 50 }
    , width = 650   // Use the window's width
    , height = 300; // Use the window's height

  // The number of datapoints
  let n = 50;

  // 5. X scale will use the index of our data
  let xScale = d3.scaleLinear()
    .domain([1, maxScore])   // input
    .range([0, width]); // output

  // 6. Y scale will use the randomly generate number
  let yScale = d3.scaleLinear()
    .domain([0, 100])       // input
    .range([height, 0]);    // output

  // 7. d3's line generator
  let line = d3.line()
    .x(function(d, i) { return xScale(i) * 0.1 + 1; })  // set the x values for the line generator
    .y(function(d) { return yScale(d.y); })   // set the y values for the line generator
    .curve(d3.curveMonotoneX);                // apply smoothing to the line

  // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
  let dataset = [...Array(50)].map((item, index) => ({
    x: 0.1 * index,
    y: 0
  }));
  let historicalIndex = parseInt(Math.max(historicalAvgScore, 1) / 0.1) - 10;
  dataset[historicalIndex].y = 50;
  let rawScoreIndex = parseInt(Math.max(1, rawScore) / 0.1) - 10;
  dataset[rawScoreIndex].y = percentileRank;
  let offset = historicalIndex - rawScoreIndex;

  // 1. Add the SVG to the page and employ #2
  let svg = d3.select('#chart-overall-percentile-bar').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // 3. Call the x axis in a group tag
  // svg.append("g")
  //   .attr("class", "x axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .style("font", "16px")
  //   .call(
  //     d3.axisBottom(xScale)
  //       .ticks(5)
  //   );
  let bottomAxis = svg.append("g")
    .append("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", height + 1)
    .attr("y2", height + 1)
    .attr("shape-rendering", "crispEdges")
    .style("stroke", "#aeaeae");
  for (let i = 0; i < 5; i ++) {
    svg.append("text")
      .attr("x", i * width / 5)
      .attr("y", height + 15)
      .attr("dy", 1)
      .attr("text-anchor", "middle")
      .text(i + 1)
  }

  // 4. Call the y axis in a group tag
  // svg.append("g")
  //   .attr("class", "y axis")
  //   .call(
  //     d3.axisLeft(yScale)
  //       .ticks(6)
  //       .tickFormat((d) => d + '%')
  //   );
  for (let i = 0; i < 5; i ++) {
    svg.append("g")
      .append("text")
      .attr("x", -30)
      .attr("y", height / 5 * i + 1 + 5)
      .attr("dy", 1)
      .attr("text-anchor", "middle")
      .text((100 - i * 20) + '%');
    svg.append("g")
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height / 5 * i + 1)
      .attr("y2", height / 5 * i + 1)
      .attr("shape-rendering", "crispEdges")
      .style("stroke", "#aeaeae");
  }

  // 9. Append the path, bind the data, and call the line generator
  svg.append("path")
    .datum(dataset) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .attr("d", line); // 11. Calls the line generator

  // 12. Appends a circle for each datapoint
  svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle") // Uses the enter().append() method
    .attr("class", function(d, i) {
      if (d.x === rawScore && d.y === percentileRank) {
        return "dot";
      }
      return "hidden-dot";
    }) // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5);
    // .on("mouseover", function(a, b, c) {
    //   console.log(a);
    //   this.attr('class', 'focus')
    // });
};
