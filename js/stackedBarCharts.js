var stackedData = [[{name: "Coal", x: 2010, y: 20828382},
                                    {name: "Coal",x: 2011, y: 19663856},
                                    {name: "Coal",x: 2012, y: 17380923},
                                    {name: "Coal",x: 2013, y: 18038771},
                                    {name: "Coal",x: 2014, y: 17996577}],

            [{name: "FossFuel",x: 2010, y: 80891321},
                                    {name: "FossFuel",x: 2011, y: 79487114},
                                    {name: "FossFuel",x: 2012, y: 77530807},
                                    {name: "FossFuel",x: 2013, y: 79551830},
                                    {name: "FossFuel",x: 2014, y: 80425776}],

            [{name: "Biomass",x: 2010, y: 4235786},
                                    {name: "Biomass",x: 2011, y: 4290667},
                                    {name: "Biomass",x: 2012, y: 4249844},
                                    {name: "Biomass",x: 2013, y: 4464695},
                                    {name: "Biomass",x: 2014, y: 4611638}],

            [{name: "Electricity",x: 2010, y: 12811519},
                                    {name: "Electricity",x: 2011, y: 12794475},
                                    {name: "Electricity",x: 2012, y: 12606145},
                                    {name: "Electricity",x: 2013, y: 12709249},
                                    {name: "Electricity",x: 2014, y: 12845157}],

            [{name: "Geo Thermal",x: 2010, y: 207979},
                                    {name: "Geo Thermal",x: 2011, y: 212311},
                                    {name: "Geo Thermal",x: 2012, y: 211592},
                                    {name: "Geo Thermal",x: 2013, y: 214006},
                                    {name: "Geo Thermal",x: 2014, y: 214490}],

            [{name: "Hydro",x: 2010, y: 2538541},
                                    {name: "Hydro",x: 2011, y: 3102852},
                                    {name: "Hydro",x: 2012, y: 2628702},
                                    {name: "Hydro",x: 2013, y: 2562382},
                                    {name: "Hydro",x: 2014, y: 2466577}],

            [{name: "NatGas",x: 2010, y: 24633507},
                                    {name: "NatGas",x: 2011, y: 25014983},
                                    {name: "NatGas",x: 2012, y: 26138351},
                                    {name: "NatGas",x: 2013, y: 26858134},
                                    {name: "NatGas",x: 2014, y: 27513198}],

            [{name: "LPG",x: 2010, y: 2820984},
                                    {name: "LPG",x: 2011, y: 2838955},
                                    {name: "LPG",x: 2012, y: 2911810},
                                    {name: "LPG",x: 2013, y: 3166737},
                                    {name: "LPG",x: 2014, y: 3090053}]
            ];
var stackedN = 8, // number of layers
    stackedM = 5, // number of samples per layer
    stackedStack = d3.layout.stack(),
    stackedLayers = stackedStack(stackedData),
    stakcedYGroupMax = d3.max(stackedLayers, function(layer) { return d3.max(layer, function(d) { return d.y; }); }),
    stakcedYStackMax = d3.max(stackedLayers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

var stackedSeriesNames = ["Coal", "FossFuel", "Biomass", "Electricity", "Geo", "Hydro",
                    "NatGas", "LPG"];


var margin = {top: 150, right: 100, bottom: 100, left: 100},
      width = 800 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom,
      stackedPaddingBetweenLegendSeries = 5,
      stackedLegendSeriesBoxX = 0,
      stackedLegendSeriesBoxY = 0,
      stackedLegendSeriesBoxWidth = 15,
      stackedLegendSeriesBoxHeight = 15,
      stackedLegendSeriesHeight = stackedLegendSeriesBoxHeight + stackedPaddingBetweenLegendSeries,
      stackedLegendSeriesLabelX = -5,
      stackedLegendSeriesLabelY = stackedLegendSeriesBoxHeight / 2,
      stackedLegendMargin = 20,
      stackedLegendX = width - stackedLegendSeriesBoxWidth - stackedLegendMargin,
      stackedLegendY = stackedLegendMargin;

var stackedX = d3.scale.ordinal()
    .domain([2010, 2011, 2012, 2013, 2014])
    .rangeRoundBands([0, width], .08);

var stackedY = d3.scale.linear()
    .domain([0, stakcedYStackMax])
    .range([height, 0]);


var stackedColors = ["#fbc287", "#9bc0da", "#fdf195", "#c1e68e", "#d6efd2", "#a5dcd2","#fa9790", "#c997c8"];
var stackedXAxis = d3.svg.axis()
    .scale(stackedX)
    .tickSize(1)
    .tickPadding(6)
    .orient("bottom");

var stackedYAxis = d3.svg.axis()
    .tickSize(1)
    .tickPadding(6)
    .scale(stackedY)
    .orient("left");

var stackedSvg = d3.select("#graph1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var stackedLayer = stackedSvg.selectAll(".layer")
    .data(stackedLayers)
    .enter().append("g")
    .attr("class", "layer")
    .style("fill", function(d, i) { return stackedColors[i]; });

var stackedRect = stackedLayer.selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("x", function(d) { return stackedX(d.x); })
    .attr("y", height)
    .attr("width", stackedX.rangeBand())
    .attr("height", 0)
    .on("mouseover", function() { stackedBarsTooltip.style("display", null); })
    .on("mouseout", function() { stackedBarsTooltip.style("display", "none"); })
    .on("mousemove", function(d) {
      var xPosition = d3.mouse(this)[0] - 15;
      var yPosition = d3.mouse(this)[1] - 25;
       stackedBarsTooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
       stackedBarsTooltip.select("text").text(d.name + ", " + d.y); 
     });

stackedRect.transition()
    .delay(function(d, i) { return i * 10; })
    .attr("y", function(d) { return stackedY(d.y0 + d.y); })
    .attr("height", function(d) { return stackedY(d.y0) - stackedY(d.y0 + d.y); });

stackedSvg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(stackedXAxis);

stackedSvg.append("g")
    .attr("class", "y axis")
    .call(stackedYAxis);




// Draw legend
var stackedBarsLegend = stackedSvg.selectAll(".legend")
  .data(stackedColors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
stackedBarsLegend.append("rect")
  .attr("x", width - 30)
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", function(d, i) {return stackedColors.slice()[i];});
 
stackedBarsLegend.append("text")
  .attr("x", width-15)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .style("font-size", "10px")
  .text(function(d, i) { 
    switch (i) {
      case 0: return "Coal";
      case 1: return "Foss Fuel";
      case 2: return "Biomass";
      case 3: return "Electricity";
      case 4: return "Geo Thermal";
      case 5: return "Hydro";
      case 6: return "NatGas";
      case 7: return "LPG";
    }
  });

// Prep the tooltip bits, initial display is hidden
var stackedBarsTooltip = stackedSvg.append("g")
  .attr("class", "tooltip")
  .style("display", "none");
    
stackedBarsTooltip.append("rect")
  .attr("width", 150)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

stackedBarsTooltip.append("text")
  .attr("x", 80)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");

// var stackedSeriesClass = function (stackedSeriesName) { return "series-" + stackedSeriesName.toLowerCase(); };
// var stackedLegendSeriesClass = function (d) { return "clickable " + stackedSeriesClass(d); };
// var stackedLegendSeries = stackedSvg.append("g")
//     .attr("class", "legend")
//     .attr("transform", "translate(" + stackedLegendX + "," + stackedLegendY + ")")
//     .selectAll("g").data(stackedSeriesNames.reverse())
//         .enter().append("g")
//             .attr("class", stackedLegendSeriesClass)
//             .attr("transform", function (d, i) { return "translate(0," + (i * stackedLegendSeriesHeight) + ")"; });
//             //.on("click", toggleSeries);

// stackedLegendSeries.append("rect")
//     .attr("class", "series-box")
//     .attr("x", stackedLegendSeriesBoxX)
//     .attr("y", stackedLegendSeriesBoxY)
//     .attr("width", stackedLegendSeriesBoxWidth)
//     .attr("height", stackedLegendSeriesBoxHeight);

// stackedLegendSeries.append("text")
//     .attr("class", "series-label")
//     .attr("x", stackedLegendSeriesLabelX)
//     .attr("y", stackedLegendSeriesLabelY)
//     .text(String);






var timeout = setTimeout(function() {
  d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
}, 2000);


function change() {
  clearTimeout(timeout);
  if (this.value === "grouped") transitionGrouped();
  else transitionStacked();
}

function transitionGrouped() {
  stackedY.domain([0, stakcedYStackMax]);

  stackedRect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("x", function(d, i, j) { return stackedX(d.x) + stackedX.rangeBand() / stackedN * j; })
      .attr("width", stackedX.rangeBand() / stackedN)
      .transition()
      .attr("y", function(d) { return stackedY(d.y); })
      .attr("height", function(d) { return stackedY(d.y0) - stackedY(d.y0 + d.y); });
      //.attr("height", function(d) { return height - stackedY(d.y); });
}

function transitionStacked() {
  stackedY.domain([0, stakcedYStackMax]);

  stackedRect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("y", function(d) { return stackedY(d.y0 + d.y); })
      .attr("height", function(d) { return stackedY(d.y0) - stackedY(d.y0 + d.y); })
      .transition()
      .attr("x", function(d) { return stackedX(d.x); })
      .attr("width", stackedX.rangeBand());
}
 

  var gs = graphScroll()
    .container(d3.select('#container1'))
    .graph(d3.selectAll('#graph1'))
    .sections(d3.selectAll('#sections1 > div'))
    .on('active', function(i){ 
      if (i == 0) {
            transitionGrouped();
      } else {
            transitionStacked();
      }
});