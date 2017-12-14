var margin = {top: 150, right: 80, bottom: 100, left: 100},
      width = 700 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

var parallelDimensions = [
  {
    name: "Year",
    scale: d3.scale.ordinal().rangePoints([0, height]),
    type: String
  },
  {
    name: "Consumption",
    scale: d3.scale.linear().range([height, 0]),
    type: Number
  },
  {
    name: "Population",
    scale: d3.scale.linear().range([height, 0]),
    type: Number
  },
  {
    name: "GDP",
    scale: d3.scale.sqrt().range([height, 0]),
    type: Number
  }
];

var parallelX = d3.scale.ordinal()
    .domain(parallelDimensions.map(function(d) { return d.name; }))
    .rangePoints([0, width]);

var parallelLine = d3.svg.line()
    .defined(function(d) { return !isNaN(d[1]); });

var parallelYAxis = d3.svg.axis()
    .orient("left");

var parallelSvg = d3.select("#graph5").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parallelDimension = parallelSvg.selectAll(".dimension")
    .data(parallelDimensions)
  .enter().append("g")
    .attr("class", "dimension")
    .attr("transform", function(d) { return "translate(" + parallelX(d.name) + ")"; });

d3.tsv("data/parallel_data.tsv", function(error, data) {
  if (error) throw error;

  parallelDimensions.forEach(function(dimension) {
    dimension.scale.domain(dimension.type === Number
        ? d3.extent(data, function(d) { return +d[dimension.name]; })
        : data.map(function(d) { return d[dimension.name]; }).sort());
  });

  parallelSvg.append("g")
      .attr("id", "parallelBackground")
      .selectAll("path")
      .data(data)
      .enter().append("path")
      .attr("d", draw);

  parallelSvg.append("g")
      .attr("id", "parallelForeground")
      .selectAll("path")
      .data(data)
      .enter().append("path")
      .attr("d", draw);

  parallelDimension.append("g")
      //.attr("class", "axis")
      .attr("id", "parallelAxis")
      .each(function(d) { d3.select(this).call(parallelYAxis.scale(d.scale)); })
      .append("text")
      //.attr("class", "title")
      .attr("id", "parallelTitle")
      .attr("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d.name; });

  // Rebind the axis data to simplify mouseover.
  parallelSvg.select("#parallelAxis").selectAll("text:not(#parallelTitle)")
      //.attr("class", "label")
      .attr("id", "parallelLabel")
      .data(data, function(d) { return d.name || d; });

  var projection = parallelSvg.selectAll("#parallelBackground path,#parallelForeground path")
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  function mouseover(d) {
    parallelSvg.classed("active", true);
    projection.classed("inactive", function(p) { return p !== d; });
    projection.filter(function(p) { return p === d; }).each(moveToFront);
  }

  function mouseout(d) {
    parallelSvg.classed("active", false);
    projection.classed("inactive", false);
  }

  function moveToFront() {
    this.parentNode.appendChild(this);
  }
  var gs = graphScroll()
    .container(d3.select('#container5'))
    .graph(d3.selectAll('#graph5'))
    .sections(d3.selectAll('#sections5 > div'))
    .on('active', function(i){ 
      console.log(i + 'th section active') 
  });
});

function draw(d) {
  return parallelLine(parallelDimensions.map(function(dimension) {
    return [parallelX(dimension.name), dimension.scale(d[dimension.name])];
  }));
}
