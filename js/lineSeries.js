var margin = {top: 100, right: 80, bottom: 100, left: 100},
      width = 800 - margin.left - margin.right,
      height = 650 - margin.top - margin.bottom;


var lsSvg = dimple.newSvg("#graph2",  width + margin.left + margin.right, height + margin.top + margin.bottom);

d3.tsv("data/lineSeriesTotal.tsv", function (data) {
  var lsChart = new dimple.chart(lsSvg, data);

  lsChart.setBounds(60, 30, 680, 330);
  var lsX = lsChart.addCategoryAxis("x", "Year");
  var lsY = lsChart.addMeasureAxis("y", "Consumption");
  lsChart.data = data;

  lsSvg.selectAll("title_text")
  .data(["Click legend to","show/hide energies"])
  .enter()
  .append("text")
    .attr("x", 499)
    .attr("y", function (d, i) { return 90 + i * 14; })
    .style("font-family", "sans-serif")
    .style("font-size", "10px")
    .style("color", "Black")
    .text(function (d) { return d; });


  var gs = graphScroll()
    .container(d3.select('#container2'))
    .graph(d3.selectAll('#graph2'))
    .sections(d3.selectAll('#sections2 > div'))
    .on('active', function(i){
      lsChart.svg.selectAll('.dimple-legend').remove();

      lsChart.series.forEach(function(series){
          series.shapes.remove();
      });

      if (i == 1) {
        lsChart.data = dimple.filterData(data, "Type", ["Primary"]);
        
      } else if (i == 2) {
        
        var primaryEnergy = dimple.filterData(data, "Type", ["Primary"]);
        lsChart.data = dimple.filterData(primaryEnergy, "SubType", ["NonRenewable"]);

      } else if (i == 3) {

        var primaryEnergy = dimple.filterData(data, "Type", ["Primary"]);        
        lsChart.data = dimple.filterData(primaryEnergy, "SubType", ["Renewable"]);
        

      } else if (i == 4) {

        lsChart.data = dimple.filterData(data, "Type", ["Secondary"]);

      } else {
        
        lsChart.data = data;
        
      }
      
      var lsLines = lsChart.addSeries("Energy", dimple.plot.line);
      
      var lsLegend = lsChart.addLegend(60, 10, 500, 20, "right");
      lsChart.draw(200);

      lsY.titleShape[0][0].innerHTML = "Consumption (billion BTU)";

      lsChart.legends = [];
      var curData = lsChart.data;
      var filterValues = dimple.getUniqueValues(curData, "Energy");

      lsLegend.shapes.selectAll("rect")
        // Add a click event to each rectangle
        .on("click", function (e) {
          // This indicates whether the item is already visible or not
          var hide = false;
          var newFilters = [];
          // If the filters contain the clicked shape hide it
          filterValues.forEach(function (f) {
            if (f === e.aggField.slice(-1)[0]) {
              hide = true;
            } else {
              newFilters.push(f);
            }
          });
          // Hide the shape or show it
          if (hide) {
            d3.select(this).style("opacity", 0.2);
          } else {
            newFilters.push(e.aggField.slice(-1)[0]);
            d3.select(this).style("opacity", 0.8);
          }
          // Update the filters
          filterValues = newFilters;
          // Filter the data
          lsChart.series.forEach(function(series){
              series.shapes.remove();
          });
          
          lsChart.data = dimple.filterData(curData, "Energy", filterValues);
          lsLines = lsChart.addSeries("Energy", dimple.plot.line);
          
          // Passing a duration parameter makes the chart animate. Without
          // it there is no transition
          lsChart.draw(200);

          lsY.titleShape[0][0].innerHTML = "Consumption (billion BTU)";
        });
    });
});