function task2a(){
    console.log("kk")
   // Define the margin, width, and height of the chart
   var margin = {top: 50, right: 50, bottom: 80, left: 50};
   var width = 800 - margin.left - margin.right;
   var height = 500 - margin.top - margin.bottom;

   // Create the SVG element
   var svg = d3.select("#my_bar_chart")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   // Load the data from the Flask server
   d3.json("/data").then(function(data) {
     var components = data.components;
     var lineData = data.lineData;
    console.log(components)
     // Define the scales for the x and y axes
     var xScale = d3.scaleLinear()
       .domain([0.5, components.length])
       .range([0, width]);

     var yScale = d3.scaleLinear()
       .domain([0, d3.max(components, function(d) { return d.CumulativeVariance; })+0.000001])
       .range([height, 0]);

     // Draw the x and y axes
     svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(xScale));

     svg.append("g")
       .call(d3.axisLeft(yScale))
       .attr("class", "y axis")


     // Draw the PCA bars
     svg.selectAll("rect")
       .data(components)
       .enter()
       .append("rect")
       .attr("class", "rectbar")
       .attr("x", function(d) { return xScale(d.Component) - 10; })
       .attr("y", function(d) { return yScale(d.Variance); })
       .on("mouseover", onMouseOver) //Add listener for the mouseover event
       .on("mouseout", onMouseOut)   //Add listener for the mouseout event
       .on("click", onclick)   //Add listener for the mouseout event
       .transition().duration(1000)
       .attr("width", 20)
       .attr("height", function(d) { return height - yScale(d.Variance); })
       .style("fill", "red")
       .style("opacity", 1.0)

       function onMouseOver(d) {
        var varianceText = (d.Variance * 100).toFixed(2) + "%";
        d3.select(this)
        .attr("fill", "yellow")
          .style("opacity", 0.5)
          .append("title")
          .attr('class', 'd3-tip')
          .text(varianceText);
      }

      function onMouseOut(d) {
        d3.select(this)
          .style("opacity", 1.0)
          .attr("fill", 'red')
          .select("title")
          .remove();
      }

      function onclick(d) {
        console.log(d.Component);;


        // console.log(d.x);
        d3.select("#di1")
        .html('')
        d3.select("#di")
        .html(`<br>Current dimensionality: ${d.Component} <br>`)
        d3.event.stopPropagation();
        var datax = d.Component


        d3.json("data3", {
          method: 'POST',
          body: JSON.stringify({data: datax}),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(function(data) {
          // handle the response data
          console.log(data)
          console.log(data)
          var attrs = Object.keys(data).filter(function(d) { return d});
          x = attrs[0]
          // console.log(Object.keys(data[x]))

          var pcs = Object.keys(data[x]).filter(function(d) { return d});
          // create the header row
          var header = d3.select("#di1").append("thead").append("tr");
          header.selectAll("th")
            .data(["ATTRIBUTES"].concat(pcs))
            .enter()
            .append("th")
            .text(function(d) { return d; });

          // create the body rows
          var tbody = d3.select("#di1").append("tbody");
          for (var i = 0; i < attrs.length; i++) {
            var row = tbody.append("tr");
            var attr = attrs[i];
            row.append("td").text(attrs[i]);
            for (var j = 0; j < datax; j++) {
    
              row.append("td").text(data[attr]["PC" + (j+1)].toFixed(14));
            }
            var squared_sum = data[attr]["SQUARED SUM"].toFixed(16);
            row.append("td").text(squared_sum);
          }


          d3.json("scatterplotmatrixdata", {
            method: 'POST',
            body: JSON.stringify({data: attrs}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(function(data) {
          console.log(data)
          var color_indices = data.color_indices
          var data = data.data
          task2a_2(data, color_indices)
        })
      })

       }


    // Calculate cumulative variance explained
    var cumulativeVariance = 0;
    var cumulativeData = lineData.map(function(d) {
    cumulativeVariance += d.y;
    return { x: d.x, y: d.y };
    });

    console.log(cumulativeData)
    // Draw the line chart

    // Draw the line chart
    // Create the x-axis scale
    var xScale1 = d3.scaleLinear()
    .domain([0.5, components.length])
    .range([0, width]);


    //     // 6. Y scale will use the randomly generate number
    var yScale1 = d3.scaleLinear()
    .domain([0, 1]) // input
    .range([height, 0]); // output


    // Draw the line chart
    var lineFunction = d3.line()
    .x(function(d) { console.log(d.x);return xScale1(d.x); })
    .y(function(d) { return yScale1(d.y); });

    svg.append("path")
    .transition().duration(1000)
    .attr("d", lineFunction(cumulativeData))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");

    // Draw the circle dots on the line chart
    svg.selectAll("circle")
    .data(cumulativeData)
    .enter()
    .append("circle")
    .attr("class","dot twoa")
    .attr("id",function(d) { if (d.x == 3) return "dii"; })
    .on("mouseover", onMouseOver1) //Add listener for the mouseover event
    .on("mouseout", onMouseOut1)   //Add listener for the mouseout event
    .on("click", onClick1)
    .transition().duration(1000)
    .attr("cx", function(d) { return xScale1(d.x); })
    .attr("cy", function(d) { return yScale1(d.y); })
    .attr("r", 3)
    //   .style("fill", "#4e79a7")
    .style("opacity", 1.0)

    var circle = d3.select("#dii");

    // Modify the fill or stroke property to change its color
    circle.style("fill", "red")
    
    // console.log(d.x)

      function onMouseOver1(d) {
          var varianceText = (d.y * 100).toFixed(2) + "%";
          d3.select(this)
          .attr("r",5.5)
          // .style("opacity", 0.7)
          .append("title")
          // .attr("class","dot_hover")
          .text(varianceText);
      }

      function onMouseOut1(d) {
        d3.select(this)
        .attr("r",4)
        // .remove("class","dot_hover")
        .style("opacity", 1.0)
        .select("title")
        .remove();
      }

      function onClick1(d) {
          console.log(d.x);
          d3.select("#di1")
          .html('')
          d3.select("#di")
          .html(`<br>Current dimensionality index di is: ${d.x} <br>`)
          d3.event.stopPropagation();
    
          var datax = d.x
          d3.json("data3", {
            method: 'POST',
            body: JSON.stringify({data: datax}),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          }).then(function(data) {
            // handle the response data
            console.log(data)
            console.log(data)
            var attrs = Object.keys(data).filter(function(d) { return d});
            x = attrs[0]
            // console.log(Object.keys(data[x]))
  
            var pcs = Object.keys(data[x]).filter(function(d) { return d});
            // create the header row
            var header = d3.select("#di1").append("thead").append("tr");
            header.selectAll("th")
              .data(["ATTRIBUTES"].concat(pcs))
              .enter()
              .append("th")
              .text(function(d) { return d; });
  
            // create the body rows
            var tbody = d3.select("#di1").append("tbody");
            for (var i = 0; i < attrs.length; i++) {
              var row = tbody.append("tr");
              var attr = attrs[i];
              row.append("td").text(attrs[i]);
              for (var j = 0; j < datax; j++) {
      
                row.append("td").text(data[attr]["PC" + (j+1)].toFixed(14));
              }
              var squared_sum = data[attr]["SQUARED SUM"].toFixed(16);
              row.append("td").text(squared_sum);
            }


            d3.json("scatterplotmatrixdata", {
              method: 'POST',
              body: JSON.stringify({data: attrs}),
              headers: {
                'Content-type': 'application/json; charset=UTF-8'
              }
            }).then(function(data) {
            console.log(data)
            var color_indices = data.color_indices
            var data = data.data
            task2a_2(data, color_indices)
          })
        })
      }

    // Add x-axis label
    svg.append("text")
    .attr("class", "axis-label")
    .attr("x", width/2)
    .attr("y", height + margin.top -20)
    .style("text-anchor", "middle")
    .text("Number of Principle Component")
    // .style("font-family", "Serif")
    .style("font-size", 12)
    .style("font-weight", "bold");

    // Add y-axis label
    svg.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height/2)
    .attr("y", -margin.left + 20)
    .style("text-anchor", "middle")
    // .style("font-family", "Serif")
    .style("font-size", 12)
    .style("font-weight", "bold")
    .text("Explained Variance");

    // Add chart title
    svg.append("text")
    .attr("class", "chart-title")
    .attr("x", width/2)
    .attr("y", -margin.top/2)
    .style("text-anchor", "middle")
    .text("PCA Analysis using Scree Plot")
    // .style("font-family", "Serif")
    .style("font-size", 15)
    .style("font-weight", "bold");



    var intrinsicDim=10;
    for(x in lineData) {
        if(lineData[x].y>0.65){
            //console.log(x)
            intrinsicDim=x;
            break;
        }
    }
    intrinsicDim=+intrinsicDim;
    var intrinsicDimPlusOne=intrinsicDim+1;
    intrinsicDimPlusOne=+intrinsicDimPlusOne;

    // svg.append("line")
    // .attr("x1",xScale(intrinsicDimPlusOne))
    // .attr("y1",yScale(lineData[intrinsicDim].y))
    // .attr("x2",xScale(intrinsicDimPlusOne))
    // .attr("y2",height)
    // .style("stroke-width", 1)
    // .style("stroke", "black")
    // .style("fill", "none");

    // svg.append("line")
    // .attr("x1",0)
    // .attr("y1",yScale(lineData[intrinsicDim].y))
    // .attr("x2",xScale(intrinsicDimPlusOne))
    // .attr("y2",yScale(lineData[intrinsicDim].y))
    // .style("stroke-width", 1)
    // .style("stroke", "black")
    // .style("fill", "none");

    svg.append("text")
        .attr("y", yScale(lineData[intrinsicDim].y)+20)
        .attr("x", xScale(intrinsicDimPlusOne)/2+150)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("About 70% data variance "+intrinsicDimPlusOne+" attributes");
    });
}