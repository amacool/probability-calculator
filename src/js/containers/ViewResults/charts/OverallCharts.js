import "./style.css";

export const drawOverallPercentileChart = function({ low, high, val, target, width }) {
  let barHeight = 20; // height of one bar
  let barLabelWidth = 10; // space reserved for bar labels
  let gridLabelHeight = 25; // space reserved for gridline labels
  let gridChartOffset = 20; // space between start of grid and first bar
  let maxBarWidth = width - 30; // width of the bar with the max value
  let barWidth = width;
  let verticalLineHeight = 60;

  let d3 = window.d3;
  let data = [
    {
      'Name': 'Low-High',
      'Value': val
    },
  ];

  let barValue = function(d) { return parseFloat(d['Value']); };

  // scales
  let yScale = d3.scaleOrdinal().domain(d3.range(0, data.length)).range([0, data.length * barHeight]);
  let y = function(d, i) {
    return yScale(i);
  };
  let x = d3.scaleLinear().domain([0, 100]).range([0, maxBarWidth]);

  // initialization
  d3.select(`#${target}`).selectAll("svg").remove();

  // svg container element
  let chart = d3.select(`#${target}`).append("svg")
    .attr('id', `${target}-svg`)
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
  target,
  widthT,
  heightT
}) {
  if (!historicalAvgScore) {
    return;
  }
  let d3 = window.d3;
  let margin = { top: 25, right: 25, bottom: 25, left: 25 }
    , width = widthT - 30
    , height = heightT - 50;
  let chartWidth = widthT;
  let chartHeight = heightT;

  // prepare data set
  let dataset = [...Array((maxScore - 1) / 0.1 + 1)].map((item, index) => ({
    x: parseFloat((0.1 * index).toFixed(1)),
    y: 0
  }));
  let historicalIndex = parseInt(((Math.max(1, historicalAvgScore.toFixed(1)) / 0.1).toFixed(1) - 10).toFixed(1));
  dataset[historicalIndex].y = 50;
  let rawScoreIndex = rawScore ? parseInt(((Math.max(1, rawScore.toFixed(1)) / 0.1).toFixed(1) - 10).toFixed(1)) : null;
  if (rawScoreIndex !== null) {
    dataset[rawScoreIndex].y = percentileRank;
  }
  let lineDataSet = [
    { x: 0,   y: 0 },
    { x: 0.5, y: 0 },
    { x: 1,   y: 0 },
    { x: 1.2, y: 0 },
    { x: 1.4, y: 0 },
    { x: 1.6, y: 0 },
    { x: 1.8, y: 0 },
    { x: 2,   y: 0 },
    { x: 2.2, y: 0.01 * 100 },
    { x: 2.4, y: 0.06 * 100 },
    { x: 2.5, y: 0.09 * 100 },
    { x: 2.6, y: 0.14 * 100 },
    { x: 2.7, y: 0.21 * 100 },
    { x: 2.8, y: 0.3 * 100 },
    { x: 2.9, y: 0.42 * 100 },
    { x: 3,   y: 0.56 * 100 },
    { x: 3.1, y: 0.7 * 100 },
    { x: 3.2, y: 0.83 * 100 },
    { x: 3.3, y: 0.92 * 100 },
    { x: 3.4, y: 0.98 * 100 },
    { x: 3.5, y: 100 },
    { x: 3.6, y: 100 },
    { x: 3.8, y: 100 },
    { x: 4,   y: 100 },
  ];
  let historicalIndexOnLine = lineDataSet.findIndex((item, index) => item.x <= historicalAvgScore-1 && lineDataSet[index+1].x > historicalAvgScore-1);
  lineDataSet[historicalIndexOnLine] = { x: historicalAvgScore - 1, y: 50 };

  // The number of datapoints
  let countY = 5;

  // 5. X scale will use the index of our data
  let xScale = d3.scaleLinear()
    .domain([1, maxScore])
    .range([0, width]);

  // 6. Y scale will use the randomly generate number
  let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

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
    .attr('id', `${target}-svg`)
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
    .attr("x", -115)
    .attr("y", -50)
    .attr("dy", 1)
    .attr("text-anchor", "left")
    .attr("font-size", "13")
    .attr("transform", "rotate(-90)")
    .text("Percentile Rank");

  // draw historical items
  svg.append("g")
    .append("line")
    .attr("x1", (historicalAvgScore - 1)/(maxScore - 1) * width)
    .attr("x2", (historicalAvgScore - 1)/(maxScore - 1) * width)
    .attr("y1", 0)
    .attr("y2", height)
    .attr("shape-rendering", "crispEdges")
    .style("stroke-dasharray", ("15, 7"))
    .style("stroke", "#aeaeae");
  svg.append("g")
    .append("text")
    .attr("x", (historicalAvgScore - 1)/(maxScore - 1) * width - 20)
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
    .datum(lineDataSet)
    .attr("fill", "none")
    .attr("stroke", "#000000")
    .attr("stroke-width", "1px")
    .attr("d", line);

  // 12. Appends a circle for each datapoint
  svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle")
    .attr("display", function(d, i) {
      if (percentileRank && d.x === parseFloat(rawScore.toFixed(1)) - 1 && d.y === parseFloat(percentileRank.toFixed(1))) {
        return "block";
      }
      return "none";
    })
    .attr("fill", "#4f81bd")
    .attr("cx", function(d) {
      return xScale(d.x + 1);
    })
    .attr("cy", function(d) {
      return yScale(d.y);
    })
    .attr("r", 5);
};

export const drawBarChart = function({ attrs, maxVal, target, countY, showLabel, widthT, heightT, barWidth, pacingY }) {
  let labels = Object.keys(attrs);
  let vals = Object.values(attrs);
  let lows = vals.map(item => parseFloat(item.low.replace('%', '')));
  let highs = vals.map(item => parseFloat(item.high.replace('%', '')));
  vals = vals.map(item => item.mean ? parseFloat(item.mean.replace('%', '')) : 0);
  let countX = labels.length;
  let d3 = window.d3;
  let margin = { top: 25, right: 25, bottom: 25, left: 25 }
    , width = widthT - 30
    , height = heightT - 30;
  let chartWidth = widthT;
  let chartHeight = heightT;

  // 1. Add the SVG to the page and employ #2
  d3.select(`#${target}`).selectAll("svg").remove();
  let svg = d3.select(`#${target}`).append("svg")
    .attr('id', `${target}-svg`)
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
      .text(maxVal === 100 ? (100 - i * 20) + '%' : maxVal - i*pacingY);
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
  for (let i = 0; i < countX; i ++) {
    showLabel && svg.append("text")
      .attr("x", i * width/countX + width/countX/2)
      .attr("y", height + 22)
      .attr("dy", 1)
      .attr("font-size", "13px")
      .attr("text-anchor", "middle")
      .text(labels[i]);

    svg.append("rect")
      .attr('x', i * width/countX + width/countX/2 - barWidth/2)
      .attr('y', height * (maxVal - vals[i]) / maxVal + 1)
      .attr('height', height * (vals[i]) / maxVal)
      .attr('width', barWidth)
      .attr('stroke', 'none')
      .attr('fill', i === 0 ? 'steelblue' : '#a6bfe8');

    svg.append("g")
      .append("line")
      .attr("x1", i * width/countX + width/countX/2)
      .attr("x2", i * width/countX + width/countX/2)
      .attr("y1", (maxVal - lows[i]) / maxVal * height)
      .attr("y2", (maxVal - highs[i]) / maxVal * height)
      .attr("shape-rendering", "crispEdges")
      .style("stroke", "#7b7b7b");
  }
};

export const drawSusEquivalentChart = function({
  susScore,
  rawScore,
  percentileRank,
  maxScore,
  historicalAvgScore,
  target,
  widthT,
  heightT
}) {
  if (!historicalAvgScore) {
    return;
  }
  // Use the margin convention practice
  let d3 = window.d3;
  let margin = { top: 25, right: 25, bottom: 25, left: 25 }
    , width = widthT - 30
    , height = heightT - 50;
  let chartWidth = widthT;
  let chartHeight = heightT;

  // prepare data set
  // let lineDataSet = [
  //   { x: 0, y: 43.6 },
  //   { x: 0, y: 48 },
  //   { x: 0.01, y: 52.4 },
  //   { x: 0.02, y: 56.8 },
  //   { x: 0.06, y: 61.2 },
  //   { x: 0.09, y: 63.4 },
  //   { x: 0.14, y: 65.6 },
  //   { x: 0.21, y: 67.8 },
  //   { x: 0.3, y: 70 },
  //   { x: 0.42, y: 72.2 },
  //   { x: 0.56, y: 74.4 },
  //   { x: 0.7, y: 76.6 },
  //   { x: 0.83, y: 78.8 },
  //   { x: 0.92, y: 81 },
  //   { x: 0.98, y: 83.2 },
  //   { x: 1, y: 85.4 },
  //   { x: 1, y: 87.6 },
  // ];
  let lineDataSet = [
    { x: 0, y: 8.4 },
    { x: 6.97867454413359E-06, y: 19.4 },
    { x: 0.0000745197874256753, y: 30.4 },
    { x: 0.000195810715979849, y: 34.8 },
    { x: 0.000518379993496576, y: 39.2 },
    { x: 0.0013776334429918, y: 43.6 },
    { x: 0.00365594847896622, y: 48 },
    { x: 0.00961402489273588, y: 52.4 },
    { x: 0.0247717566215404, y: 56.8 },
    { x: 0.061510628, y: 61.2 },
    { x: 0.0949011071611745, y: 63.4 },
    { x: 0.143626599903107, y: 65.6 },
    { x: 0.212186779682727, y: 67.8 },
    { x: 0.304220563002966, y: 70 },
    { x: 0.420429418328786, y: 72.2 },
    { x: 0.55583589384775, y: 74.4 },
    { x: 0.697636747317795, y: 76.6 },
    { x: 0.826207640907988, y: 78.8 },
    { x: 0.921807231960859, y: 81 },
    { x: 0.97553493283422, y: 83.2 },
    { x: 0.995628199741097, y: 85.4 },
    { x: 0.999687795850716, y: 87.6 },
    { x: 0.999999998207485, y: 92 },
    { x: 1, y: 96.4 }
  ];
  let dotPos = 0;
  let dotIndex = 0;
  for (let i = 0; i < lineDataSet.length - 1; i ++) {
    if (lineDataSet[i].y <= susScore && lineDataSet[i + 1].y > susScore) {
      dotPos = { x: (lineDataSet[i].x + lineDataSet[i + 1].x)/2, y: susScore };
      dotIndex = i;
      break;
    }
  }
  lineDataSet = [...lineDataSet.slice(0, dotIndex + 1), dotPos, ...lineDataSet.slice(dotIndex + 1)];
  let yMin = (lineDataSet[0].y / 10).toFixed(0) * 10;
  let yMax = (lineDataSet[lineDataSet.length - 1].y / 10).toFixed(0) * 10;

  // 5. X scale will use the index of our data
  let xScale = d3.scaleLinear()
    .domain([0, maxScore])
    .range([0, width]);

  // 6. Y scale will use the randomly generate number
  let yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);

  // 7. d3's line generator
  let line = d3.line()
    .x(function(d, i) {
      return xScale(d.x*100);
    })
    .y(function(d) {
      return yScale((d.y - yMin)*(100/(yMax - yMin)));
    })
    .curve(d3.curveMonotoneX);

  // 1. Add the SVG to the page and employ #2
  d3.select(`#${target}`).selectAll("svg").remove();
  let svg = d3.select(`#${target}`).append("svg")
    .attr('id', `${target}-svg`)
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

  for (let i = 0; i < 6; i ++) {
    svg.append("text")
      .attr("x", i * width / (6 - 1))
      .attr("y", height + 22)
      .attr("dy", 1)
      .attr("font-size", "13px")
      .attr("text-anchor", "middle")
      .text(i*20 + '%')
  }

  // 4. Call the y axis in a group tag
  for (let i = 0; i <= 5; i ++) {
    svg.append("g")
      .append("text")
      .attr("x", -20)
      .attr("y", height / 5 * i + 5)
      .attr("dy", 1)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text(yMax - i*(yMax - yMin)/5);
    i < 5 && svg.append("g")
      .append("line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height / 5 * i + 1)
      .attr("y2", height / 5 * i + 1)
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
    .text("SUS Equivalent Score");

  // add chart title
  svg.append("g")
    .append("text")
    .attr("x", width / 2)
    .attr("y", height + 45)
    .attr("dy", 1)
    .attr("text-anchor", "middle")
    .attr("font-size", "14px")
    .style("fill", "#000")
    .text('SUPR-Q Raw Score for Usability');

  svg.append("path")
    .datum(lineDataSet)
    .attr("fill", "none")
    .attr("stroke", "#000000")
    .attr("stroke-width", "1px")
    .attr("d", line);

  svg.append("circle")
    .attr("fill", "#4f81bd")
    .attr("cx", dotPos.x * width)
    .attr("cy", (yMax - dotPos.y)*(100/(yMax - yMin))/100*height)
    .attr("r", 5);
};
