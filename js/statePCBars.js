var margin = {top: 50, right: 80, bottom: 50, left: 100},
      width = 800 - margin.left - margin.right,
      height = 750 - margin.top - margin.bottom;


var barsSvg = dimple.newSvg("#graph4",  width + margin.left + margin.right, height + margin.top + margin.bottom);

d3.tsv("data/stateYearMetric.tsv", function (data) {
  var barsChart = new dimple.chart(barsSvg, data);
  var barsChartX = barsChart.addMeasureAxis("x", "Total2010");

  var gs = graphScroll()
    .container(d3.select('#container4'))
    .graph(d3.selectAll('#graph4'))
    .sections(d3.selectAll('#sections4 > div'))
    .on('active', function(i){ 
      barsChart.svg.selectAll('*').remove();
      barsChart = new dimple.chart(barsSvg, data);
      barsChart.setBounds(75, 30, 480, 600);
      if (i == 1) {
        barsChartX = barsChart.addMeasureAxis("x", "Total2011");
      } else if (i == 2) {
        barsChartX = barsChart.addMeasureAxis("x", "Total2012");
      } else if (i == 3) {
        barsChartX = barsChart.addMeasureAxis("x", "Total2013");
      } else if (i == 4) {
        barsChartX = barsChart.addMeasureAxis("x", "Total2014");
      } else {
        barsChartX = barsChart.addMeasureAxis("x", "Total2010");
      }
      
      var barsChartY = barsChart.addCategoryAxis("y", ["State", "Metric"]);
      var barsSeries = barsChart.addSeries("Metric", dimple.plot.bar);

      var barsLegend = barsChart.addLegend(60, 10, 510, 20, "right");
      
      barsSeries.addOrderRule(["Production", "Consumption"]);
      barsChart.draw(800);
      barsChartY.shapes.selectAll("*").style("font-size", "10px");
      barsChartY.titleShape[0][0].innerHTML = "State";
      barsChartX.titleShape[0][0].innerHTML = 2010 + i + " Year " + "Consumption V.S. Production (billion BTU)";
    });


});
