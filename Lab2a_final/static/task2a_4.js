
function task2a_4(){

    d3.json("/task2a4d").then(function(data) {
            var margin = { top: 20, right: 20, bottom: 30, left: 130 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;
        
            var svg = d3.select("#my_bar_chart").append("svg")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .attr("preserveAspectRatio", "xMidYMid meet")
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
            var x = d3.scaleLinear()
                .domain([1, 10])
                .range([0, width]);
        
            var y = d3.scaleLinear()
                .domain([0, d3.max(data.wcss)+1])
                .range([height, 0]);
        

                var data1 = data.k.map(function(d,i) {
                            return { k: d, v: data.wcss[i] };
                            });

                var line1 = d3.line()
                .x(function(d, i) { return x(d.k); })
                .y(function(d,i) { console.log(d.v); return y(d.v); })
                .curve(d3.curveLinear);

            svg.append("path")
            .transition().duration(1000)
            .attr("d", line1(data1))
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .attr("fill", "none");

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .style("font-size", "12px");
        
            svg.append("g")
                .call(d3.axisLeft(y))
                .selectAll("text")
                .style("font-size", "12px");;
        

            // Add tooltip
            var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
        
            svg.selectAll(".dot")
                .data(data.wcss)
                .enter().append("circle")
                .attr("class", "dot twoa")
                
                .on("mouseover", onMouseOver) //Add listener for the mouseover event
                .on("mouseout", onMouseOut)   //Add listener for the mouseout event
                .transition().duration(1000)
                .attr("id",  function(d, i) { if (data.k[i] == 4) return "dii"; })
                .attr("cx", function(d, i) { return x(data.k[i]); })
                .attr("cy", function(d) { return y(d); })
                .attr("r", 4)
                .style("fill", function(d, i) { if (data.k[i] == 4) {return "green";} else {return "red";} })
                var circle = d3.select("#dii");
                console.log(circle)
                
        function onMouseOver(d, i){
        d3.select(this)
        .attr("r",5.5)
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html("k=" + data.k[i] + "<br/>" + "WCSS=" + d)
            .style("left", (d3.event.pageX + 15) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        }

        function onMouseOut(d) {
                d3.select(this)
                .attr("r",4)
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
        }
        svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left+65)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Within-Cluster Sum of Square(WCSS)")
        .style("font-size", 16)
        .style("font-weight", "bold");  ;

    svg.append("text")
        .attr("class", "label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 0)
        .style("text-anchor", "middle")
        .text("Number of clusters (k)")
        .style("font-size", 16)
        .style("font-weight", "bold");  ;
        
        
        
   // Add chart title
   svg.append("text")
   .attr("class", "chart-title")
   .attr("x", width/2)
   .attr("y", -margin.top/2)
   .style("text-anchor", "middle")
   .text("Elbow method to find the best K value for K means clustering")
//    .style("font-family", "Serif")
   .style("font-size", 17)
   .style("font-weight", "bold");  
      
   svg.append("text")
   .attr("y", width/2-250)
   .attr("x", -margin.top/2+400)
   .attr("dy", "1em")
   .style("text-anchor", "middle")
   .text("Best number of clusters = 4");

    // svg.append("line")
    // .transition().duration(1000)
    // .attr("x1",0)
    // .attr("y1",230)
    // .attr("x2",500)
    // .attr("y2", 235)
    // .style("stroke-width", 1)
    // .style("stroke", "black")
    // .style("fill", "none");
 
    svg.append("line")
    .transition().duration(1000)
    .attr("x1",270)
    .attr("y1",80)
    .attr("x2",270)
    .attr("y2", 450)
    .style("stroke-width", 1)
    .style("stroke", "black")
    .style("fill", "none");

    // svg.append("text")
    // .attr("y", 232)
    // .attr("x", 200)
    // .attr("dy", "1em")
    // .style("text-anchor", "middle")
    // .text("K = 4 is the best K value");
});

}