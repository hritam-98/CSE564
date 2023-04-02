function mds() {


    d3.json("/mds_data").then(function(data) {
    clusters = data['clusters']
    data = data['mds']
    
    var colors = ["blue","yellow","red"];
  
    var color = d3.scaleOrdinal(colors);


    var xData = data.map(function(value,index) { console.log(value);return value[0]; });
    console.log(clusters)
    var yData = data.map(function(value,index) { return value[1]; });
    var margin = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        },
        width = 700 - margin.left - margin.right // Use the window's width
        ,
        height = 700 - margin.top - margin.bottom; // Use the window's height

    const accessToRef = d3.select("#draw_plot")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + (50) + ")");

var xAxis= d3.scaleLinear()
.domain([d3.min(xData, function(d) { console.log(d);return 1.2*d }), d3.max(xData, function(d) { return 1.2*d })])
.range([ 0, width]);

accessToRef.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(xAxis))
.call(g => g.append("text")
.style("font-size", "18px")
.attr("x", width/2)
.attr("y", -margin.top+80)
);

var yAxis = d3.scaleLinear()
.domain([d3.min(yData, function(d) { return 1.2*d }), d3.max(yData, function(d) { return 1.2*d })])
.range([ height, 0]);
h = d3.min(yData, function(d) { console.log(d);return 1.2*d })
u = d3.max(yData, function(d) { return 1.2*d })
console.log(h, u)
accessToRef.append("g")
.call(d3.axisLeft(yAxis))
.call(g => g.append("text")
.style("font-size", "18px")
.attr("x", -height/2+100)
.attr("y", -margin.left+20)
// .attr("fill", "red")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
);

accessToRef.append("text").attr("text-anchor", "middle").attr("transform", "translate("+ (-30) +","+(height/2)+")rotate(-90)").style("font-weight", "bold").style("font-size", '14').text("Dimension 2");
accessToRef.append("text").attr("text-anchor", "middle").attr("transform", "translate("+ 350 +","+640+")").style("font-weight", "bold").style("font-size", '14').text("Dimension 1");
  
accessToRef.append('g')
.selectAll("dot")
.data(xData)
.enter()
.append("circle")
.attr("cx", function (d,i) { return xAxis(d)  })
.transition().duration(1000)
.attr("cy", function (d,i) { return yAxis(yData[i]) } )
.attr("r", 4)
.style("stroke", "black")
.style("fill", function(d, i) { return color(clusters[i]);})
// .style("fill", function (d) { return colormap[state.color[d]]})   ;


  //   // Add chart title
  accessToRef.append("text")
    .attr("class", "chart-title")
    .attr("x", 350)
    .attr("y", -margin.top/2)
    .style("text-anchor", "middle")
    .text("MDS Plot")
    .style("font-family", "Serif")
    .style("font-size", 20)
    .style("font-weight", "bold");
    

    plotcolorlegend = d3.select("#plotcolorlegend")

    var color = function(k){
      console.log(k)
      kk = ['blue','yellow','red']
      return kk[k]
  }
  color_indices = [0,1,2]
  var plotcolorlegend = d3.select("#plotcolorlegend").append("span").append("svg").selectAll('.legend')
  .data(color_indices)
  .enter().append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) { return 'translate(' + (50) + ',' + (12 +i * 20) + ')'; });
  plotcolorlegend.append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 4)
  .attr('stroke', 'black')
  .attr('fill', function(d,i) {
console.log(d);return color(i);
});
plotcolorlegend.append('text')
  .attr('x', 10)
  .attr('y', 3)
  .text(function(d) { return "Cluster " +  d; });

});
}