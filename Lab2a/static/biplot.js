function drawbiplot(data1, data2, PCA1, PCA2, color) {
    console.log(color)
    var data = []
    flag = 0;
    var colors = ["#088204", "#a30e07","#041982"]
  
     for (i = 0; i < data1.length; i++) {
      data.push([data1[i], data2[i]]);
     }
  
     PCAtotal=[]
     for (i = 0; i < PCA1.length; i++) {
      PCAtotal.push([PCA1[i], PCA2[i]]);
     }
  
     var svg = d3.select("svg"),
         margin = 200,
         width = svg.attr("width") - margin,
         height = svg.attr("height") - margin;
  
     var x = d3.scaleLinear().domain([d3.min(data1), d3.max(data1)]).range([0, width]);
  
     var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 65 + ")");    
      g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
  
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
           .text("Principal component 1");
  
     var y = d3.scaleLinear().domain([d3.min(data2), d3.max(data2)]).range([height, 0]);
      g.append("g").call(d3.axisLeft(y))
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 25)
       .attr("x", -140)
       .attr("dy", "-5.1em")
       .attr("text-anchor", "middle")
       .attr("fill", "black")
       .attr("font-family", "arial")
       .attr("font-size", "20px")
       .attr("font-weight", "bolder")
       .text("Principal component 2");
  
      g.append('g')
       .attr("id", "col") 
       .selectAll("dot")
       .data(data)
       .enter()
       .append("circle")
       .on("click", onClick)
       .transition()
       .ease(d3.easeLinear)
       .duration(100)
       .delay(function (d, i) {
         return i * 2.5;
      })
       .attr("cx", function (d) {
         return x(d[0]);
      })
       .attr("cy", function (d) {
         return y(d[1]);
      })
       .attr("r", 2.5)
       .style("fill", "#008234")
  
      svg.append('text')
          .attr('x', width / 1.5)
          .attr('y', 45)
          .attr('text-anchor', 'middle')
          .style("font-size", "28px")
          .attr("font-weight", "bolder")
          .attr("fill", "#360082")
          .style("text-decoration", "none")
          .text("PCA-based biplot")   
  
      g.append("svg:defs").append("svg:marker")
        .attr("id", "arrow")
        .attr("refX", 6)
        .attr("refY", 6)
        .attr("markerWidth", 30)
        .attr("markerHeight", 30)
        .attr("markerUnits","userSpaceOnUse")
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 12 6 0 12 3 6")
        .style("fill", "black");
  
      // g.selectAll('.line')
      //         .data(PCAtotal)
      //         .enter()
      //         .append('line')
      //             .style("stroke", "black")
      //             .style("stroke-width", 1.75)
      //             .attr("x1", function(d,i) { return x(0)})
      //             .attr("y1", function(d,i) { return y(0)})
      //             .attr("x2", function(d,i) { return  x(d[0]*700)})
      //             .attr("y2", function(d,i) { return y(d[1]*700) })
      //             .attr('marker-end', 'url(#arrow)');
  
      function onClick() {
        document.getElementById("col").remove();
        g.append('g')
         .attr("id", "col") 
         .selectAll("dot")
         .data(data)
         .enter()
         .append("circle")
         .on("click", onClick)
         .attr("cx", function (d) {
           return x(d[0]);
        })
         .attr("cy", function (d) {
           return y(d[1]);
        })
         .attr("r", 5)
         .style("fill", function (d,i){
          if(flag==0){
            return colors[color[i]]
          }
          else{
            return "#008234"
          }
         })
  
         if(flag==0){
            flag=1
            }
          else{
            flag=0
            }
  
        // g.selectAll('.line')
        //       .data(PCAtotal)
        //       .enter()
        //       .append('line')
        //           .style("stroke", "black")
        //           .style("stroke-width", 1.75)
        //           .attr("x1", function(d,i) { return x(0)})
        //           .attr("y1", function(d,i) { return y(0)})
        //           .attr("x2", function(d,i) { return  x(d[0]*700)})
        //           .attr("y2", function(d,i) { return y(d[1]*700) })
        //           .attr('marker-end', 'url(#arrow)');
      }
      }