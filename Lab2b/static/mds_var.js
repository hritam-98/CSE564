var key_array_for_pcp = []

function mds_var() {
    console.log("kkkkkk")

    d3.json("/mds_var").then(function(data) {
    console.log("kkkkkk")

    // clusters = data['clusters']
    variables = data['variables']

    data = data['mds']
    console.log(variables)
    var colors = ["blue","yellow","red"];
  
    var color = d3.scaleOrdinal(colors);


    var xData = data.map(function(value,index) { console.log(value);return value[0]; });
    // console.log(clusters)
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
.style("font-size", "20px")
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
.on("click", onclick)

.transition().duration(1000)
.attr("cy", function (d,i) { if (i == 4) {return yAxis(yData[i]+0.009)};return yAxis(yData[i]) } )
.attr("r", 5)
.style("stroke", "black")
.attr('fill', "yellow")

function onclick(d, i) {
  d3.select(this)
       .transition()
       .duration('50')
       .style("fill","blue");
  key_array_for_pcp.push(variables[i]);
  // props.updateStatePCP(key_array_for_pcp);
};

// .style("fill", function(d, i) { return color(clusters[i]);})
// .style("fill", function (d) { return colormap[state.color[d]]})   ;


  //   // Add chart title
  accessToRef.append("text")
    .attr("class", "chart-title")
    .attr("x", 350)
    .attr("y", -margin.top/2)
    .style("text-anchor", "middle")
    .text("MDS Variable Plot")
    .style("padding", '5px')
    .style('background-color', 'cyan')
    .style("font-family", "Serif")
    .style("font-size", 20)
    .style("font-weight", "bold");
    
    accessToRef.append('g')
    .selectAll("text")
    .data(xData)
    .enter()
    .append("text")
    .style("font-size", "8px") 
    .style("font-weight", "bold")
    .attr("x", function (d, i) { if (i == 4 || i ==7){return xAxis(d)+10+5}else{return xAxis(d)+10}})
    .attr("y", function (d, i) { return yAxis(yData[i])+4 })
    .attr("fill", "black")
    .text(function(d,i){ console.log(i);return i+1});


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
  for(var i = 0;i<variables.length;i++){

    //  plotsvg.append("text").attr("text-anchor", "middle").attr("transform", "translate("+  (xScale1(loadings[i][0])+55) +","+(yScale1(loadings[i][1])+25+d)+")").text(i+1).style("font-weight", "bold").style("font-size", "10px").style("fill", "#110B11");
     label.append("text").attr("x", -10).attr("y", 40+c).text(i+1+" -").style("font-size", "15px").attr("alignment-baseline","middle");
     label.append("text").attr("x", 80).attr("y", 40+c).text(attr[i]).style("font-size", "15px").attr("alignment-baseline","middle");
     label.append('br');
     c+=13;
     if (  i==5 ){d +=7}
     else if ( i==6){d +=2}
     else if (i==8 || i==2 || i==3){d =0}
  }


});
}