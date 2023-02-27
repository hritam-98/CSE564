function drawkmeans(PCA1, PCA2, cx,cy, color) {
  
    data = []
    flag = 0;
    var colors = ["#041982", "#088204", "#a30e07"]
  
    PCAtotal=[]
    for (i = 0; i < PCA1.length; i++) {
    PCAtotal.push([PCA1[i], PCA2[i]]);
    }
  
    centertotal=[]
    for (i = 0; i < cx.length; i++) {
    centertotal.push([cx[i], cy[i]]);
    }
  
     var svg = d3.select("svg"),
         margin = 200,
         width = svg.attr("width") - margin,
         height = svg.attr("height") - margin;
  
     var x = d3.scaleLinear().domain([d3.min(PCA1), d3.max(PCA1)]).range([0, width]);
  
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
           .text("Principal Component 1");
  
     var y = d3.scaleLinear().domain([d3.min(PCA2), d3.max(PCA2)]).range([height, 0]);
      g.append("g").call(d3.axisLeft(y))
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 60)
       .attr("x", -140)
       .attr("dy", "-5.1em")
       .attr("text-anchor", "middle")
       .attr("fill", "black")
       .attr("font-family", "arial")
       .attr("font-size", "20px")
       .attr("font-weight", "bolder")
       .text("Principal Component 2");
  
      g.append('g')
       .attr("id", "col") 
       .selectAll("dot")
       .data(PCAtotal)
       .enter()
       .append("circle")
       .transition()
       .ease(d3.easeLinear)
       .duration(40)
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
       .style("fill",  function (d,i){
            return colors[color[i]]  
          })
  
      g.append('g')
       .attr("id", "centre") 
       .selectAll("dot")
       .data(centertotal)
       .enter()
       .append("circle")
       .transition()
       .ease(d3.easeLinear)
       .duration(40)
       .delay(function (d, i) {
         return i * 2.5;
      })
       .attr("cx", function (d) {
         return x(d[0]);
      })
       .attr("cy", function (d) {
         return y(d[1]);
      })
       .attr("r", 7)
       .style("fill", "yellow")
  
  
      svg.append('text')
          .attr('x', width / 1.5)
          .attr('y', 45)
          .attr('text-anchor', 'middle')
          .style("font-size", "28px")
          .attr("font-weight", "bolder")
          .attr("fill", "#360082")
          .style("text-decoration", "none")
          .text("K-means clustering plot")   
      }
      