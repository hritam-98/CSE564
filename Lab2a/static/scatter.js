function drawScatterPlotMatrix(data1, data2,data3,data4, attribute1,attribute2,color) {
    flag = 0;
    var colors = ["#088204", "#a30e07","#041982"]  
       var svg = d3.select("svg"),
           margin = 205,
           width = svg.attr("width") - 200,
           height = svg.attr("height") - margin;
    
      datadict = {0:data1, 1:data2, 2:data3, 3:data4};
      for (var i=0; i < 4; i++)
      {
        var yaxis = datadict[i];
    
        for (var j=0; j < 4; j++)
        { 
          var xaxis = datadict[j];
    
        var data = []
        console.log(data1)
        for (c = 0; c < data1.length; c++) 
        {
         data.push([xaxis[c], yaxis[c]]);
        }
        var heightx = height/4;
        var widthx = width/4;
        var x = d3.scaleLinear().domain([d3.min(xaxis), d3.max(xaxis)]).range([0, widthx]);
    
       var g = svg.append("g").attr("transform", "translate(" + (10+100+j*widthx + j*25) + "," + (15+65+i*heightx + i*35) + ")")
          .attr("class","formatmatrix");   
    
        g.append("g").attr("transform", "translate(0," + heightx + ")").call(d3.axisBottom(x));
    
        g.append("g")
             .attr("transform", "translate(0," + heightx + ")")
             .call(d3.axisBottom(x))
    
            // Add Y axis
       var y = d3.scaleLinear().domain([d3.min(yaxis), d3.max(yaxis)]).range([heightx, 0]);
        g.append("g").call(d3.axisLeft(y))
    
        svg.append('text')
            .attr('x', width / 1.5)
            .attr('y', 45)
            .attr('text-anchor', 'middle')
            .style("font-size", "28px")
            .attr("font-weight", "bolder")
            .style("text-decoration", "underline")
            .text("Scatterplot matrix") 
    
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
         .attr("r", 1)
         .style("fill", "#008234")
        }
    
    }
      function onClick() {
      var svg = d3.select("svg"),
           margin = 205,
           width = svg.attr("width") - 200,
           height = svg.attr("height") - margin;
    
      datadict = {0:data1, 1:data2, 2:data3, 3:data4};
      for (var i=0; i <4; i++)
      {
        var yaxis = datadict[i];
    
        for (var j=0; j <4; j++)
        { 
          var xaxis = datadict[j];
    
        data = []
        for (c = 0; c < data1.length; c++) 
        {
         data.push([xaxis[c], yaxis[c]]);
        }
        heightx = height/4;
        widthx = width/4;
        var x = d3.scaleLinear().domain([d3.min(xaxis), d3.max(xaxis)]).range([0, widthx]);
    
       var g = svg.append("g").attr("transform", "translate(" + (10+100+j*widthx + j*25) + "," + (15+65+i*heightx + i*35) + ")")
          .attr("class","formatmatrix");       
    
        g.append("g").attr("transform", "translate(0," + heightx + ")").call(d3.axisBottom(x));
    
        g.append("g")
             .attr("transform", "translate(0," + heightx + ")")
             .call(d3.axisBottom(x))
             .append("text")
             .attr("y", heightx - 250)
             .attr("x", widthx/2)
             .attr("text-anchor", "middle")
             .attr("fill", "black")
             .attr("font-family", "arial")
             .attr("font-size", "20px")
             .attr("font-weight", "bolder")
             .text(attribute1);
    
            // Add Y axis
       var y = d3.scaleLinear().domain([d3.min(yaxis), d3.max(yaxis)]).range([heightx, 0]);
        g.append("g").call(d3.axisLeft(y))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 50)
         .attr("x", -140)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "middle")
         .attr("fill", "black")
         .attr("font-family", "arial")
         .attr("font-size", "20px")
         .attr("font-weight", "bolder")
         .text(attribute2);
    
        svg.append('text')
            .attr('x', width / 1.5)
            .attr('y', 45)
            .attr('text-anchor', 'middle')
            .style("font-size", "28px")
            .attr("font-weight", "bolder")
            .style("text-decoration", "underline")
            .text("Scatterplot matrix") 
    
            // Add dots
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
         .attr("r", 1)
         .style("fill", function (d,i){
            if(flag==0){
              return colors[color[i]]
            }
            else{
              return "#008234"
            }
        })
      
          }
      }
      if(flag==0){
        flag=1
        }
      else{
        flag=0
        }
    }
    }
    