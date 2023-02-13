async function myFunction(){
    var data = d3.csv('./final_data.csv');
    return data;
}
var numerical_list = [
    'age',
    'overall',
    'wage_eur',
    'height_cm',
    'weight_kg',
    'pace', 
    'shooting',
    'passing', 
    'dribbling', 
    'defending', 
    'physic', 
    'attacking_crossing', 
    'attacking_heading_accuracy', 
    'attacking_short_passing', 
    'skill_dribbling', 
    'skill_curve', 
    'power_shot_power', 
    'power_jumping', 
    'mentality_aggression', 
    'mentality_interceptions', 
    'mentality_vision', 
    'mentality_penalties']
var categorical_list = [
    'league_level', 
    'nationality_name', 
    'club_contract_valid_until', 
    'work_rate']
myFunction().then(
    function (value) {
        var xValue = "";
        var yValue = "";

        data = value;
        //console.log(typeof (data))
        // for (var i = 0; i < categorical_list.length; i++) {
        //     $(".xAxis").append('<input type="radio" id="' + categorical_list[i] + '" name="xAxis" value="' + categorical_list[i] + '"><label for="' + categorical_list[i] + '">' + categorical_list[i] + '</label><br>');
        //     $(".yAxis").append('<input type="radio" id="' + categorical_list[i] + '" name="yAxis" value="' + categorical_list[i] + '"><label for="' + categorical_list[i] + '">' + categorical_list[i] + '</label><br>');
        // }
        for (var i = 0; i < numerical_list.length; i++) {
            $(".xAxis").append('<input type="radio" id="' + numerical_list[i] + '1" name="xAxis" value="' + numerical_list[i] + '"><label for="' + numerical_list[i] + '1">' + numerical_list[i] + '</label><br>');
            $(".yAxis").append('<input type="radio" id="' + numerical_list[i] + '2" name="yAxis" value="' + numerical_list[i] + '"><label for="' + numerical_list[i] + '2">' + numerical_list[i] + '</label><br>');
        }
        $('input[type=radio][name=xAxis]').change(function () {
            xValue = this.value;
            if (yValue != "") {
                scatterPlot(xValue, yValue, data);
            }
        });
        $('input[type=radio][name=yAxis]').change(function () {
            yValue = this.value;
            if (xValue != "") {
                scatterPlot(xValue, yValue, data);
            }
        });
    }
);

function scatterPlot(xValue, yValue, data) {
    //console.log(xValue, yValue);

    var xData = [];
    for (var i = 0; i < data.length; i++) {
        xData.push(data[i][xValue])
    }

    var yData = [];
    for (var i = 0; i < data.length; i++) {
        yData.push(data[i][yValue])
    }

    scatterData = [];
    for (var i = 0; i < xData.length; i++) {
        temp = [];
        temp.push(xData[i]);
        temp.push(yData[i]);
        scatterData.push(temp);
    }

    //console.log(scatterData)

    $("svg").children().remove();

    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin, //300
        height = svg.attr("height") - margin //200

  // Step 4 
  xrange = d3.max(xData, function(d) { return parseInt(d) });
  yrange = d3.max(yData, function(d) { return parseInt(d) });
  xrange1 = d3.min(xData, function(d) { return parseInt(d) });
  yrange1 = d3.min(yData, function(d) { return parseInt(d) });

  var xScale = d3.scaleLinear().domain([xrange1-5, xrange+5]).range([0, width]),
      yScale = d3.scaleLinear().domain([yrange1-5, yrange+5]).range([height, 0]);

  var g = svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

  // Step 5
  // Title
  svg.append('text')
      .attr('x', width / 2 + 100)
      .attr('y', 100)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 20)
      .text('Scatter Plot');

  // X label
  svg.append('text')
      .attr('x', width / 2 + 100)
      .attr('y', height - 15 + 150)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Helvetica')
      .style('font-size', 12)
      .text(xValue);
// Y label
svg.append('text')
.attr('text-anchor', 'middle')
.attr('transform', 'translate(60,' + height + ')rotate(-90)')
.style('font-family', 'Helvetica')
.style('font-size', 12)
.text(yValue);

// Step 6
g.append("g")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(xScale));

g.append("g")
.call(d3.axisLeft(yScale));


// Step 7
svg.append('g')
.selectAll("dot")
.data(scatterData)
.enter()
.append("circle")
.attr("cx", function (d) { return xScale(d[0]); })
.attr("cy", function (d) { return yScale(d[1]); })
.attr("r", 2)
.attr("transform", "translate(" + 100 + "," + 100 + ")")
.style("fill","#CC0000");

}