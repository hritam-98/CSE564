function task2a_2(data, color_indices) {

    console.log(color_indices)
    color_indices.map(function(d) { console.log(d) })
    // plot(data)
    d3.select("#title").html("")
    d3.select("#scatterplot_matrix").html("")
    d3.select("#kiki").html("")

    drawScatterPlotMatrix(data)
    d3.select("#title")
        .append("span")
        .attr('class', 'header101')
        .html("<br>Scatterplot Matrix<br>")
        width = 200;

        var color = function(k){
            console.log(k)
            kk = ['red','green','blue','yellow']
            // console.log(kk[k])
            return kk[k]
        }
        var legend = d3.select("#kiki").append("span").append("svg").selectAll('.legend')
            .data(color_indices)
            .enter().append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) { return 'translate(' + (120) + ',' + (20+i * 20) + ')'; });
        legend.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 5)
            .attr('fill', function(d) {
        console.log(d);return color(d);
        });
        legend.append('text')
            .attr('x', 10)
            .attr('y', 3)
            .text(function(d) { return "Cluster " +  d; });

}



function drawScatterPlotMatrix(data){
  
    // d3.select("#scatterplot_matrix").remove();
  
    var width = 1000,
        size = 180,
        padding = 20;
  
    var x = d3.scale.linear()
        .range([padding / 2, size - padding / 2]);
  
    var y = d3.scale.linear()
        .range([size - padding / 2, padding / 2]);
  

  
        var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(6);

    var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(6);

  
        var color = function(k){
        // console.log(k)
        kk = ['red','green','blue','yellow']
        // console.log(kk[k])
        return kk[k]
    }
        var domainByTrait = {},
        traits = d3.keys(data[0]).filter(function(d) { return d !== "cluster"; }),
        n = traits.length;


    traits.forEach(function(trait) {
        domainByTrait[trait] = d3.extent(data, function(d) {
            return d[trait];
        });
    });
    console.log(domainByTrait)

    xAxis.tickSize(size * n);
    yAxis.tickSize(-size * n); 
    
    var svg = d3.select("#scatterplot_matrix").append("svg")
        .attr("id","cleansheet")
        .style("margin-top","10")
        .attr("width", size * n + padding)
        .attr("height", size * n + padding)
      .append("g")
        .attr("transform", "translate(" + padding + "," + padding / 2 + ")")
        .style("font", "10px sans-serif")
        .style("font-weight","bold")
  
    svg.selectAll(".x.axis")
        .data(traits)
      .enter().append("g")
        .attr("class", "x axis")
        .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
        .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); })
  
    svg.selectAll(".y.axis")
        .data(traits)
      .enter().append("g")
        .attr("class", "y axis")
        .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
        .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); })
    
    svg.selectAll(".axis line")
        .style("stroke","#ddd");
  
    svg.selectAll(".axis path")
        .style("display","None");
    
        
    var cell = svg.selectAll(".cell")
        .data(cross(traits, traits))
      .enter().append("g")
        .attr("class", "cell")
        .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
        .each(plot);
      
  
    cell.filter(function(d) { return d.i === d.j; }).append("text")
        .attr("x", padding)
        .attr("y", padding)
        .attr("dy", ".71em")
        .text(function(d) { return d.x; })
        .style("size","100")



    function plot(p){
      var cell = d3.select(this);
  
      x.domain(domainByTrait[p.x]);
      y.domain(domainByTrait[p.y]);
  
      cell.append("rect")
          .attr("class", "frame")
          .attr("x", padding / 2)
          .attr("y", padding / 2)
          .attr("width", size - padding)
          .attr("height", size - padding)
          .style("fill","white")
          .style("stroke","black")
          .style("font-weight","bold")
          .style("text-transform","capitalize")
  
      cell.selectAll("circle")
          .data(data)
        .enter().append("circle")
          .attr("cx", function(d) { return x(d[p.x]); })
          .attr("cy", function(d) { return y(d[p.y]); })
          .attr("r", 1.85)
          .style("fill", function(d) {
                            return color(d.cluster);
                        })
        //   .style("stroke", "black")


    }
  }
  
  function cross(a, b) {
    var c = [], n = a.length, m = b.length, i, j;
    for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
    return c;
  }