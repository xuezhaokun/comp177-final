var margin = {top: 100, right: 80, bottom: 100, left: 100},
      width = 800 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;

var lineBarSvg = dimple.newSvg("#graph7",  width + margin.left + margin.right, height + margin.top + margin.bottom);

d3.tsv("data/lineBar.tsv", function (lineBarData) {
      var lineBarChart = new dimple.chart(lineBarSvg, lineBarData);
      lineBarChart.setBounds(60,20,680,330);

      // Add your x axis - nothing unusual here
      var lineBarX = lineBarChart.addCategoryAxis("x", "Year");
      // First y axis is the combination axis for revenue and profit
      var lineBarY1 = lineBarChart.addMeasureAxis("y", "GDP");
      // Second is the units only
      var lineBarY2 = lineBarChart.addMeasureAxis("y", "Consumption");

      var bars = lineBarChart.addSeries("Energy Consumption", dimple.plot.bar, [lineBarX,lineBarY2]);
      // Use a simple line by metric for the other measures
      var lines = lineBarChart.addSeries("Metric", dimple.plot.line, [lineBarX,lineBarY1]);

      lines.lineMarkers = true;
      bars.barGap = 0.5;
      lineBarChart.assignColor("Energy Consumption", "black", "black", 0.15);

      lineBarChart.addLegend(60, 5, 680, 10, "right", lines);

      lineBarChart.draw();

      lineBarY1.tickFormat = ",d";
      var gs = graphScroll()
          .container(d3.select('#container7'))
          .graph(d3.selectAll('#graph7'))
          .sections(d3.selectAll('#sections7 > div'))
          .on('active', function(i){ 
            console.log(i + 'th section active') 
      });
});