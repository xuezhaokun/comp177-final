var margin = {top: 300, right: 80, bottom: 200, left: 100},
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;


var lollipopSvg = dimple.newSvg("#graph3",  width + margin.left + margin.right, height + margin.top + margin.bottom);

d3.tsv("data/usDivision.tsv", function (data) {
  data = dimple.filterData(data, "Metric", ["Consumption"]);
  var lollipopChart = new dimple.chart(lollipopSvg, data);
  lollipopChart.setBounds(60, 30, 500, 330)
  var lollipopChartx = lollipopChart.addCategoryAxis("x", "Year");
 
  var lollipopChartY = lollipopChart.addMeasureAxis("y", "Total Consumption");
  lollipopChart.addMeasureAxis("p", "Total Consumption");
  var lollipopChartpies = lollipopChart.addSeries("Division", dimple.plot.pie);
  lollipopChartpies.radius = 35;
  lollipopChart.addLegend(350, 200, 360, 60, "left");
  lollipopChart.draw();

  lollipopChartY.titleShape[0][0].innerHTML = "Consumption (billion BTU)";
  var gs = graphScroll()
    .container(d3.select('#container3'))
    .graph(d3.selectAll('#graph3'))
    .sections(d3.selectAll('#sections3 > div'))
    .on('active', function(i){ 
  });
});