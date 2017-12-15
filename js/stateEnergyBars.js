var margin = {top: 100, right: 80, bottom: 50, left: 100},
      width = 800 - margin.left - margin.right,
      height = 750 - margin.top - margin.bottom;


var stateEnergyBarsSvg = dimple.newSvg("#graph5",  width + margin.left + margin.right, height + margin.top + margin.bottom);

d3.tsv("data/stateYearEnergy.tsv", function (data) {
  var stateEnergyBarsChart = new dimple.chart(stateEnergyBarsSvg, data);
  var stateEnergyBarsChartX = stateEnergyBarsChart.addPctAxis("x", "C2010");
  var gs = graphScroll()
    .container(d3.select('#container5'))
    .graph(d3.selectAll('#graph5'))
    .sections(d3.selectAll('#sections5 > div'))
    .on('active', function(i){ 
      stateEnergyBarsChart.svg.selectAll('*').remove();
      stateEnergyBarsChart = new dimple.chart(stateEnergyBarsSvg, data);
      stateEnergyBarsChart.setBounds(75, 30, 480, 600);
      if (i == 1) {
        stateEnergyBarsChartX = stateEnergyBarsChart.addPctAxis("x", "C2011");
      } else if (i == 2) {
        stateEnergyBarsChartX = stateEnergyBarsChart.addPctAxis("x", "C2012");
      } else if (i == 3) {
        stateEnergyBarsChartX = stateEnergyBarsChart.addPctAxis("x", "C2013");
      } else if (i == 4) {
        stateEnergyBarsChartX = stateEnergyBarsChart.addPctAxis("x", "C2014");
      } else {
        stateEnergyBarsChartX = stateEnergyBarsChart.addPctAxis("x", "C2010");
      }
      
      var stateEnergyBarsChartY = stateEnergyBarsChart.addCategoryAxis("y", "State");
      var stateEnergyBarsSeries = stateEnergyBarsChart.addSeries("Energy", dimple.plot.bar);
      stateEnergyBarsSeries.addOrderRule(["FossFuel", "NatGas", "Coal", "Electricity", "Biomass", "LPG", "Hydro", "Geo"]);
      var stateEnergyBarsLegend = stateEnergyBarsChart.addLegend(680, 100, 60, 300, "right");
      stateEnergyBarsChart.draw(800);
      stateEnergyBarsChartY.shapes.selectAll("*").style("font-size", "10px");
      stateEnergyBarsChartY.titleShape[0][0].innerHTML = "State";
      stateEnergyBarsChartX.titleShape[0][0].innerHTML = 2010 + i + " Year " + "Energy Consumption";
    });



});
