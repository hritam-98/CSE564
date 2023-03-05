function task2a_3(){  
    d3.json("/data1").then(function(data) {
    var scores = data.pcs;
    var loadings = data.loadings;
    var labels = data.labels;
    console.log(data)
    d3.select("#my_bar_chart").html("");
    var padding = {top:20,right:20,bottom:20,left:0};
    width = 1200 
    height = 800
    var x = []
    var y = []
    for(var i = 0;i<data.length;i++){
      x.push(data[i].x)
      y.push(data[i].y)
    }
  
    var plotsvg = d3.select("#my_bar_chart").attr("width",width).attr("height",height+100)
            .attr("transform", "translate(130," + padding.top + ")")
  
    var xScale = d3.scaleLinear()
                  .domain([-9,10])
                  .range([0,width-100])
  
    var yScale = d3.scaleLinear()
                  .domain([-7,7])
                  .range([height-100,0])
                  
      var colors = ["red","green","blue","yellow"];
  
    var color = d3.scaleOrdinal(colors);
  
    var biPlotxAxis = d3.axisBottom()
            .scale(xScale)
  
    var biPlotyAxis = d3.axisLeft()
             .scale(yScale)
  
  
             plotsvg.append("g")
                 .attr("class", "x axis")
                //  .transition().duration(1000)
                 .attr("transform", "translate(50," + (height-75) + ")")
                 .call(biPlotxAxis)
  
  
                 plotsvg.append("g")
          .attr("class","y axis")
          .call(biPlotyAxis)
          .attr("transform", "translate(50,25)")
  
  
          plotsvg.append("text").attr("text-anchor", "middle").transition().duration(1000).attr("transform", "translate("+ (20) +","+(height/2)+")rotate(-90)").style("font-weight", "bold").style("font-size", '14').text("PC 2");
          plotsvg.append("text").attr("text-anchor", "middle").transition().duration(1000).attr("transform", "translate("+ 600 +","+760+")").style("font-weight", "bold").style("font-size", '14').text("PC 1");
  
  
             plotsvg.selectAll(".dot")
       .data(scores)
       .enter()
       .append("circle")
       .transition().duration(1000)
       .attr("class","dot")
       .attr("r", 2.5)
       .attr("cx", function(d) { return xScale(d[0])+50})
         .attr("cy", function(d) { return yScale(d[1])+25 })
         .style("stroke","black")
         .style("fill", function(d, i) { return color(labels[i]);})
  
  
         var xScale1 = d3.scaleLinear()
                      .domain([-1,+1.34])
                      .range([0,width-100])
  
         var yScale1 = d3.scaleLinear()
                      .domain([-1,+1.4])
                      .range([height-100,0])
  
  
         var linexAxis = d3.axisTop()
                .scale(xScale1)
  
         var lineyAxis = d3.axisRight()
                 .scale(yScale1)
  
          clegend = d3.select("#clegend")
        //   clegend.append("circle").attr("cx",0).attr("cy",0).transition().duration(1000).attr("r", 3.5).style("fill", "teal")
        //   clegend.append("circle").attr("cx",1000).attr("cy",60).transition().duration(1000).attr("r", 3.5).style("fill", "#ea5545")
        //   clegend.append("circle").attr("cx",1000).attr("cy",80).transition().duration(1000).attr("r", 3.5).style("fill", "blue")
        //   clegend.append("circle").attr("cx",1000).attr("cy",80).transition().duration(1000).attr("r", 3.5).style("fill", "purple")
        //   clegend.append("text").attr("x", 1010).attr("y", 40).transition().duration(1000).text("Cluster-1").style("font-size", "14px").attr("alignment-baseline","middle")
        //   clegend.append("text").attr("x", 1010).attr("y", 60).transition().duration(1000).text("Cluster-2").style("font-size", "14px").attr("alignment-baseline","middle")
        //   clegend.append("text").attr("x", 1010).attr("y", 80).transition().duration(1000).text("Cluster-3").style("font-size", "14px").attr("alignment-baseline","middle")
        //   clegend.append("text").attr("x", 1010).attr("y", 100).transition().duration(1000).text("Cluster-4").style("font-size", "14px").attr("alignment-baseline","middle")

        var color = function(k){
            console.log(k)
            kk = ["red","green","blue","yellow"]
            return kk[k]
        }
    

            plotsvg.append("g")
            .attr("class", "x axis")
            // .transition().duration(1000)
            .attr("transform", "translate(50,25)")
            .call(linexAxis)

            plotsvg.append("g")
            .attr("class","y axis")
            // .transition().duration(1000)
            .call(lineyAxis)
            .attr("transform", "translate(1150,25)")
  
              plotsvg.append("text").attr("text-anchor", "middle").transition().duration(1000).attr("transform", "translate("+ 1190 +","+(350)+")rotate(-90)").style("font-weight", "bold").style("font-size", '14').text("Loadings on PC2");
              plotsvg.append("text").attr("text-anchor", "middle").transition().duration(1000).attr("transform", "translate("+ 590 +","+(8.5)+")").style("font-weight", "bold").style("font-size", '14').text("Loadings on PC1");
  
            //   console.log(data2);
              

               c=10
                d = 0
                label = d3.select("#label")
               attr = ["age",
               "overall",
               "height_cm",
               "weight_kg",
               "pace",
               "shooting",
               "passing",
               "dribbling",
               "defending",
               "physic",
               "attacking_crossing",
               "attacking_heading_accuracy",
               "attacking_short_passing",
               "skill_dribbling",
               "skill_curve",
               "power_shot_power",
               "power_jumping",
               "mentality_aggression",
               "mentality_interceptions",
               "mentality_vision",
               "mentality_penalties",
               "wage_eur"
               ]
              for(var i = 0;i<loadings.length;i++){
                plotsvg.append('line')
                 .style("stroke", "black")
                 .style("stroke-width", 2)
                 .attr("x1", xScale1(0)+50)
                 .attr("y1", yScale1(0)+25)
                 .style("fill","white")
                 .attr("x2", xScale1(loadings[i][0])+50)
                 .attr("y2", yScale1(loadings[i][1])+25)
                 plotsvg.append("text").attr("text-anchor", "middle").transition().duration(1000).attr("transform", "translate("+  (xScale1(loadings[i][0])+55) +","+(yScale1(loadings[i][1])+25+d)+")").text(i).style("font-weight", "bold").style("font-size", "10px").style("fill", "#110B11");
                //  label.append("text").attr("x", -10).attr("y", -240).transition().duration(1000).text(i+" -").style("font-size", "10px").attr("alignment-baseline","middle");
                //  label.append("text").attr("x", 80).attr("y", -240).transition().duration(1000).text(attr[i]).style("font-size", "10px").attr("alignment-baseline","middle");
                 label.append('br');
                 c+=13;
                 if (  i==5 ){d +=7}
                 else if ( i==6){d +=2}
                 else if (i==8 || i==2 || i==3){d =0}
              }
  
                // Add chart title
                d3.select("#plottitle").append("text")
                .attr("class", "chart-title")
                .attr("x", 400)
                .attr("y", -50)
                .style("text-anchor", "middle")
                .text("PCA based Biplot")
                // .style("font-family", "Serif")
                .style("font-size", 16)
                .style("font-weight", "bold");


            });

  
  }