function drawelbow(yaxis, pointx, pointy) {
    var xaxis = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    var x = d3.scaleBand().range([0, width]).padding(0.09);
    var y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 65 + ")");

    x.domain(xaxis);
    y.domain([d3.min(yaxis), d3.max(yaxis)]);

    combination = [];

    for(i = 0; i <= 14; i++)
    {
        combination.push([xaxis[i], yaxis[i]]);
    }
    console.log(combination);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width/2)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "arial")
        .attr("font-size", "20px")
        .attr("font-weight", "bolder")
        .text("Number of clusters");

    g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d){
            return  d;
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("x", -140)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "arial")
        .attr("font-size", "20px")
        .attr("font-weight", "bolder")
        .text("Average sum of squares");
    
    g.append('g')
         .selectAll("dot")
         .data(combination)
         .enter()
         .append("circle")
         .attr("cx", function (d) {
           return x(d[0])+ x.bandwidth()/2;
        })
         .attr("cy", function (d) {
           return y(d[1]);
        })
         .attr("r", 5)
         .style("fill", "#008234")

    g.append('g')
         .selectAll("dot")
         .data(combination)
         .enter()
         .append("circle")
         .attr("cx", function (d) {
           return x(pointx)+ x.bandwidth()/2;
        })
         .attr("cy", function (d) {
           return y(pointy);
        })
         .attr("r", 10)
         .style("fill", "#000000")

    svg.append('text')
        .attr('x', width / 1.5)
        .attr('y', 45)
        .attr('text-anchor', 'middle')
        .style("font-size", "28px")
        .attr("font-weight", "bolder")
        .attr("fill", "#360082")
        .style("text-decoration", "none")
        .text("Elbow plot of k-means clustering")

    var line = d3.line()
        .x(function(d){ return x(d[0])+ x.bandwidth()/2 })
        .y(function(d){ return y(d[1]);})

    g.append("path")
        .datum(combination)
        .attr("class", "line") 
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "rgb(65, 15, 80)")
        .style("stroke-width", "1.75");  

    svg.append('text')
        .attr('x', width / 2.05)
        .attr('y', 220)
        .attr('text-anchor', 'middle')
        .style("font-size", "18px")
        .attr("fill", "red")
        .attr("font-weight", "bolder")
        .text("Best value for number of clusters")
}