import "./style.css";

export const drawOverallPercentileChart = function({ low, high, val, target }) {
  let barHeight = 20; // height of one bar
  let barLabelWidth = 10; // space reserved for bar labels
  let gridLabelHeight = 25; // space reserved for gridline labels
  let gridChartOffset = 20; // space between start of grid and first bar
  let maxBarWidth = 670; // width of the bar with the max value
  let barWidth = 700;
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
  d3.select(`#${target}`).selectAll("svg").remove();

  // svg container element
  let chart = d3.select(`#${target}`).append("svg")
    .attr('width', barWidth)
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

export const drawOverallRawScoreChart = function({
  rawScore,
  percentileRank,
  maxScore,
  historicalAvgScore,
  target
}) {
  // prepare data set
  let dataset = [...Array((maxScore - 1) / 0.1 + 1)].map((item, index) => ({
    x: parseFloat((0.1 * index).toFixed(1)),
    y: 0
  }));
  let historicalIndex = parseInt(Math.max(1, historicalAvgScore.toFixed(1)) / 0.1) - 10;
  dataset[historicalIndex].y = 50;
  let rawScoreIndex = parseInt(Math.max(1, rawScore.toFixed(1)) / 0.1) - 10;
  dataset[rawScoreIndex].y = percentileRank;
  let offset = historicalIndex - rawScoreIndex;

  let d3 = window.d3;
  // 2. Use the margin convention practice
  let margin = { top: 25, right: 25, bottom: 25, left: 25 }
    , width = 620
    , height = 150;
  let chartWidth = 650;
  let chartHeight = 200;

  // The number of datapoints
  let n = 40;
  let countY = 5;

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
    .x(function(d, i) {
      return xScale(d.x + 1);
    })
    .y(function(d) {
      return yScale(d.y);
    })
    .curve(d3.curveMonotoneX);

  // 1. Add the SVG to the page and employ #2
  d3.select(`#${target}`).selectAll("svg").remove();
  let svg = d3.select(`#${target}`).append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom)
    .attr("viewBox", `-40 0 ${chartWidth + margin.left + margin.right} ${chartHeight + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // 3. Call the x axis in a group tag
  svg.append("g")
    .append("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", height + 1)
    .attr("y2", height + 1)
    .attr("shape-rendering", "crispEdges")
    .style("stroke", "#aeaeae");
  for (let i = 0; i < countY; i ++) {
    svg.append("text")
      .attr("x", i * width / (countY - 1))
      .attr("y", height + 22)
      .attr("dy", 1)
      .attr("text-anchor", "middle")
      .text(i + 1)
  }

  // 4. Call the y axis in a group tag
  for (let i = 0; i <= countY; i ++) {
    svg.append("g")
      .append("text")
      .attr("x", -20)
      .attr("y", height / countY * i + 6)
      .attr("dy", 1)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text((100 - i * 20) + '%');
    i < countY && svg.append("g")
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height / countY * i + 1)
      .attr("y2", height / countY * i + 1)
      .attr("shape-rendering", "crispEdges")
      .style("stroke", "#aeaeae");
  }
  svg.append("g")
    .append("text")
    .attr("x", -135)
    .attr("y", -50)
    .attr("dy", 1)
    .attr("text-anchor", "left")
    .attr("font-size", "13")
    .attr("transform", "rotate(-90)")
    .text("Percentile Rank");

  // draw historical items
  svg.append("g")
    .append("line")
    .attr("x1", historicalIndex * width / n)
    .attr("x2", historicalIndex * width / n)
    .attr("y1", 0)
    .attr("y2", height)
    .attr("shape-rendering", "crispEdges")
    .style("stroke-dasharray", ("15, 7"))
    .style("stroke", "#aeaeae");
  svg.append("g")
    .append("text")
    .attr("x", historicalIndex * width / n - 20)
    .attr("y", height + 40)
    .attr("dy", 1)
    .attr("text-anchor", "left")
    .attr("font-size", "14px")
    .style("fill", "#aeaeae")
    .text(historicalAvgScore + ' - Historical Average');

  // add chart title
  svg.append("g")
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + 45)
    .attr("dy", 1)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .style("fill", "#000")
    .text('SUPR-Q Raw Score');

  // 9. Append the path, bind the data, and call the line generator
  svg.append("path")
    .datum(dataset)         // 10. Binds data to the line
    .attr("class", "line")  // Assign a class for styling
    .attr("d", line);       // 11. Calls the line generator

  // 12. Appends a circle for each datapoint
  svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle")
    .attr("class", function(d, i) {
      if (d.x === parseFloat(rawScore.toFixed(1)) - 1 && d.y === parseFloat(percentileRank.toFixed(1))) {
        return "dot";
      }
      return "hidden-dot";
    }) // Assign a class for styling
    .attr("cx", function(d) {
      return xScale(d.x + 1);
    })
    .attr("cy", function(d) {
      return yScale(d.y);
    })
    .attr("r", 5);
    // .on("mouseover", function(a, b, c) {
    //   console.log(a);
    //   this.attr('class', 'focus')
    // });
};

export const drawBarChart = function({ attrs, maxVal, target, countY }) {
  let labels = Object.keys(attrs);
  let vals = Object.values(attrs);
  vals = vals.map(item => parseFloat(item.mean.replace('%', '')));
  let d3 = window.d3;
  let margin = { top: 25, right: 25, bottom: 25, left: 25 }
    , width = 370
    , height = 190;
  let chartWidth = 400;
  let chartHeight = 220;
  let barWidth = 34;

  // 1. Add the SVG to the page and employ #2
  d3.select(`#${target}`).selectAll("svg").remove();
  let svg = d3.select(`#${target}`).append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", chartHeight + margin.top + margin.bottom)
    .attr("viewBox", `-40 0 ${chartWidth + margin.left + margin.right} ${chartHeight + margin.top + margin.bottom}`)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // 3. Call the x axis in a group tag
  svg.append("g")
    .append("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", height + 1)
    .attr("y2", height + 1)
    .attr("shape-rendering", "crispEdges")
    .style("stroke", "#aeaeae");
  svg.append("g")
    .append("line")
    .attr("x1", 0)
    .attr("x2", 0)
    .attr("y1", 0)
    .attr("y2", height + 1)
    .attr("shape-rendering", "crispEdges")
    .style("stroke", "#aeaeae");

  // 4. Call the y axis in a group tag
  for (let i = 0; i <= countY; i ++) {
    svg.append("g")
      .append("text")
      .attr("x", -20)
      .attr("y", height / countY * i + 6)
      .attr("dy", 1)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text(maxVal === 100 ? (100 - i * 20) + '%' : maxVal - i);
    i < countY && svg.append("g")
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height / countY * i + 1)
      .attr("y2", height / countY * i + 1)
      .attr("shape-rendering", "crispEdges")
      .style("stroke", "#aeaeae");
  }

  // draw bars
  for (let i = 0; i < countY; i ++) {
    svg.append("text")
      .attr("x", i * width/countY + width/countY/2)
      .attr("y", height + 22)
      .attr("dy", 1)
      .attr("font-size", "13px")
      .attr("text-anchor", "middle")
      .text(labels[i]);

    svg.append("rect")
      .attr('x', i * width/countY + width/countY/2 - barWidth/2)
      .attr('y', height * (100 - vals[i]) / 100 + 1)
      .attr('height', height * (vals[i]) / 100)
      .attr('width', barWidth)
      .attr('stroke', 'none')
      .attr('fill', i === 0 ? 'steelblue' : '#a6bfe8');
  }
};
