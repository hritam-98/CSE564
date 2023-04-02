var mdsPcpButton = false
var dimensions = []
var state = undefined

var margin = {top: 50, right: 50, bottom: 50, left: 50};
var width = 1650 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;
var y = {};
var dragging = {};
var line = d3.line();
var background_lines,foreground_lines;
var tempDims;
const colormap=["yellow","blue","red"];

function setState(tempstate) {
    state = tempstate
}

function handleChange(e) {
    if(e.target.checked==true)
    {
        mdsPcpButton = true;
    }
    else{
        mdsPcpButton = false;
    }
}

function setDimensions(arr){
    dimensions = arr;
}

function clearBoard() {
    d3.select("#scatterplot_matrix").html("")
}

function create_dimensions(tempState) {
    let dimensionz =[];
    let tempObj={};
    Object.keys(tempState[0]).map(function(key,index){
        if(key!='color'){
            if(typeof tempState[0][key] ==="number")
            {
                tempObj={
                    name: key,
                    scale: d3.scaleLinear().range([height, 0]),
                    type: "number"
                };
            }
            else
            {
                tempObj={
                    name: key,
                    scale: d3.scaleBand().range([0, height]),
                    type: "string"
                };
            }
            dimensionz.push(tempObj);
        }
    });
    setDimensions(dimensionz);
    tempDims=dimensionz;
}

function create_dimensions_msdpcp(arr) {
    let dimensionz =[];
    let tempObj={};
    for(let i=0;i<arr.length;i++)
    {
        tempObj={
                name: arr[i],
                scale: d3.scaleLinear().range([height, 0]),
                type: "number"
            };
        dimensionz.push(tempObj);
    }
    setDimensions(dimensionz);
    tempDims=dimensionz;
};

function coordinate(d) {
    var v = dragging[d.name];
    return v == null ? x(d.name) : v;
}

function transition(g) {
    return g.transition().duration(500);
}


function path(d) {
    return line(dimensions.map(function(dimension) {
        var draggingV = dragging[dimension.name];
        var xpoint = draggingV == undefined ? x(dimension.name) : draggingV;
        let ypoint = dimension.type==="string" ? dimension.scale(d[dimension.name]) + dimension.scale.bandwidth()/2 : dimension.scale(d[dimension.name]);
        return [xpoint, ypoint];
    }));
}
        
function brushstart() {
        d3.event.sourceEvent.stopPropagation();
};

function brush(svg) {
    var actives = [];
    svg.selectAll(".brush")
        .filter(function (d) {
            return d3.brushSelection(this);
        })
        .each(function (key) {
            actives.push({
                dimension: key,
                extent: d3.brushSelection(this)
            });
        });
    if (actives.length === 0) {
        foreground_lines.style("display", null);
    } else {
        foreground_lines.style("display", function (d) {
            return actives.every(function (brushObj) {
                return brushObj.extent[0] <= brushObj.dimension.scale(d[brushObj.dimension.name]) && brushObj.dimension.scale(d[brushObj.dimension.name]) <= brushObj.extent[1];
            }) ? null : "none";
        });
    }
}


function draw() {

    if(state!=undefined){
        x = d3.scalePoint()
                .domain(dimensions.map(function(d) { return d.name; }))
                .range([0, width]);

        var svg = d3.select("#scatterplot_matrix")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        if(state!=undefined){
            background_lines = svg.append("g")
                            .attr("class", "background")
                            .selectAll("path")
                            .data(state)
                            .enter()
                            .append("path")
                            .attr("d", path);
        
            foreground_lines = svg.append("g")
                            .attr("class", "foreground")
                            .selectAll("path")
                            .data(state)
                            .enter().append("path")
                            .attr("d", path)
                            .style("stroke",function(d){return colormap[d['color']]});
        
            var g = svg.selectAll(".dimension")
                        .data(dimensions)
                        .enter().append("g")
                        .attr("class", "dimension")
                        .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; })
                        .call(d3.drag()
                        .on("start", function(d) {
                                dragging[d.name] = x(d.name);
                                background_lines.attr("visibility","hidden");
                                })
                        .on("drag", function(d) {
                            dragging[d.name] = Math.min(width, Math.max(0, d3.event.x));
                            foreground_lines.attr("d", path);
                            dimensions.sort(function(a, b) { return coordinate(a) - coordinate(b); });
                            x.domain(dimensions.map(function(d) { return d.name; }));
                            g.attr("transform", function(d) { return "translate(" + coordinate(d) + ")"; })
                        })
                        .on("end", function(d) {
                            delete dragging[d.name];
                            transition(d3.select(this)).attr("transform", "translate(" + x(d.name) + ")");
                            transition(foreground_lines).attr("d", path);
                            background_lines
                                .attr("d", path)
                                .transition()
                                .delay(500)
                                .duration(0)
                                .attr("visibility", null);
                        })
                    );
            
            g.append("g")
            .attr("class", "axis")
            .each(function(d) { 
                d3.select(this)
                .call(d3.axisLeft()
                .scale(d.scale));
             })
            .append("text")
            .style("text-anchor", "middle")
            .attr("class", "axis-label")
            .attr("y", -19)
            .attr("x", -500)
            .attr("transform", "rotate(-90)")
            .style("fill","black")
            .style("font-size",11)
            .text(function(d) { 
                if (d.name == 'attacking_crossing'){
                    return 'crossing';
                }else if (d.name == 'attacking_heading_accuracy') {
                    return 'heading_acc';
                } 
                else if (d.name == 'attacking_short_passing') {
                    return 'short_pass';
                }
                else if (d.name == 'power_shot_power') {
                    return 'shot_power';
                }
                else if (d.name == 'mentality_aggression') {
                    return 'aggression';
                }
                else if (d.name == 'mentality_interceptions') {
                    return 'intercept';
                }
                else if (d.name == 'mentality_vision') {
                    return 'vision';
                }
                else if (d.name == 'club_contract_valid_until') {
                    return 'validity_year';
                }
                else if (d.name == 'mentality_penalties') {
                    return 'penalty';
                }
                else if (d.name == 'nationality_rank') {
                    return 'rank_nation';
                }
                else{
                console.log(d.name);return d.name;} });
            
            g.append("g")
                .attr("class", "brush")
                .each(function(d)
                {
                    d3.select(this)
                    .call(d.scale.brush = d3.brushY().extent([[-10,0],[10,height]])
                    .on("start", brushstart)
                    .on("brush", function(d){brush(svg)})
                    .on("end", function(d){brush(svg)}));
                })
                .selectAll("rect")
                .attr("x", -8)
                .attr("width", 16);
        }
    }
}

function pcp(props){

    d3.json("/pcp").then(function(repos) {
        console.log("==================")
        console.log(repos)
        console.log("==================")
        // const allRepos = repos.data;
        let parsedResponse = JSON.parse(repos);
        console.log(parsedResponse)

        let tempState = parsedResponse;
        // var no_of_dimensions = Object.keys(parsedResponse[0]).length - 1;
        create_dimensions(parsedResponse);
            tempDims.forEach(function(dimension) {
                dimension.scale.domain(dimension.type === "number"
                    ? d3.extent(parsedResponse, function(d) { return +d[dimension.name]; })
                    : parsedResponse.map(function(d) { return d[dimension.name]; }).sort());
            });
        setState(tempState);
        clearBoard();
        draw();
    });

    clearBoard();
    draw();


plotcolorlegend = d3.select("#plotcolorlegend")

var color = function(k){
    console.log(k)
    kk = ["blue","yellow","red"]
    return kk[k]
}
  
  color_indices = [1,2,3]
  var plotcolorlegend = d3.select("#plotcolorlegend").append("span").append("svg").selectAll('.legend')
  .data(color_indices)
  .enter().append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) { return 'translate(' + (100) + ',' + (12+i * 20) + ')'; });
  plotcolorlegend.append('circle')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('r', 4)
  .attr('fill', function(d,i) {
  console.log(d);return color(i);
});

plotcolorlegend.append('text')
  .attr('x', 10)
  .attr('y', 3)
  .text(function(d) { return "Cluster " +  d; });
};

   