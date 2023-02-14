async function myFunction() {
  var data = d3.csv("./final_data.csv");
  return data;
}
var numerical_list = [
  "age",
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
  "wage_eur",
];
var categorical_list = [
  "league_level",
  "nationality_rank",
  "club_contract_valid_until",
  "work_rate",
];
var count = 0;
var count1 = 0;
var xValue = "";
var yValue = "";
myFunction().then(function (value) {
  var xValue = "";
  var yValue = "";
  for (var i = 0; i < categorical_list.length; i++) {
    const node = document.createElement("a");
    const textnode = document.createTextNode(categorical_list[i]);
    node.appendChild(textnode);
    document.getElementById("scatterList").appendChild(node);
  }
  for (var i = 0; i < numerical_list.length; i++) {
    const node = document.createElement("a");
    const textnode = document.createTextNode(numerical_list[i]);
    node.appendChild(textnode);
    document.getElementById("scatterList").appendChild(node);
  }
 

  $("#scatterList")
    .children()
    .click(function (e) {
      //console.log(e.currentTarget.innerHTML)
      $("input[type=radio][name = xAxis]").prop("checked", false);
      $(".x-text").text(e.currentTarget.innerHTML);
      text = e.currentTarget.innerHTML;
      if (count % 2 == 0) {
        first_text = e.currentTarget.innerHTML;
        //console.log(first_text)
        //$('.x-text').text(e.currentTarget.innerHTML)
      } else {
        second_text = e.currentTarget.innerHTML;
        //console.log(second_text)
        //$('.selected_y').text(e.currentTarget.innerHTML)
      }
      count++;
    });
  data = value;
  //console.log(typeof (data))
  // for (var i = 0; i < categorical_list.length; i++) {
  //     $(".xAxis").append('<input type="radio" id="' + categorical_list[i] + '" name="xAxis" value="' + categorical_list[i] + '"><label for="' + categorical_list[i] + '">' + categorical_list[i] + '</label><br>');
  //     $(".yAxis").append('<input type="radio" id="' + categorical_list[i] + '" name="yAxis" value="' + categorical_list[i] + '"><label for="' + categorical_list[i] + '">' + categorical_list[i] + '</label><br>');
  // }
  thisList = ["X-Axis", "Y-Axis"];
  for (var i = 0; i < thisList.length; i++) {
    $(".xAxis").append(
      '<input type="radio" id="' +
        thisList[i] +
        '1" name="xAxis" value="' +
        thisList[i] +
        '"><label for="' +
        thisList[i] +
        '1">' +
        thisList[i] +
        "</label><br>"
    );
    //$(".yAxis").append('<input type="radio" id="' + thisList[i] + '2" name="yAxis" value="' + thisList[i] + '"><label for="' + thisList[i] + '2">' + thisList[i] + '</label><br>');
  }
  $("input[type=radio][name=xAxis]").change(function () {
    //xValue = this.value;
    //console.log(xValue)
    count1++;
    if (this.value == "x-axis") {
      xValue = text;
      $(".selected_x").text(xValue);
    } else {
      yValue = text;
      $(".selected_y").text(yValue);
    }
    if (xValue != "" && yValue != "") {
      if (numerical_list.includes(xValue) && numerical_list.includes(yValue)) {
        scatterPlot(xValue, yValue, data);
      } else {
        scatterPlot_categorical(xValue, yValue, data);
      }
    }
  });

  // $('input[type=radio][name=yAxis]').change(function () {
  //     yValue = this.value;
  //     //$('.selected_y').text(second_text)
  //     if (xValue != "") {
  //         scatterPlot(xValue, yValue, data);
  //     }
  // });
});



// function scatterPlot_categorical(data, xdata, ydata) {
//   $("svg").children().remove();

//   var margin = { top: 40, right: 30, bottom: 70, left: 90 },
//     width = 700 - margin.left - margin.right,
//     height = 800 - margin.top - margin.bottom;

//   xd = [];
//   yd = [];
//   data.map(function (d) {
//     return xd.push(d[xdata]);
//   });
//   data.map(function (d) {
//     return yd.push(d[ydata]);
//   });
//   console.log(xd);
//   console.log(yd);

//   // Set up the canvas
//   var svg = d3
//     .select("#scatter_simple")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//   // Scales
//   var xScale = d3.scaleBand().domain(xd).range([0, width]);

//   var yScale = d3.scaleBand().domain(yd).range([height, 0]);

//   // Axes
//   var xAxis = d3.axisBottom(xScale);

//   var yAxis = d3.axisLeft(yScale);

//   svg
//     .append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call((g) =>
//       g
//         .append("text")
//         .attr("x", 0)
//         .attr("y", width + 30)
//         .attr("fill", "currentColor")
//         .attr("text-anchor", "end")
//         .text(xdata.concat("  V"))
//     )
//     .call(xAxis)
//     .attr("text-anchor", "end")
//     .selectAll("text")
//     .attr("transform", "translate(-10,10)rotate(-90)")
//     .style("text-anchor", "end");

//   svg
//     .append("g")
//     // .attr("transform", "translate(50, 0)")
//     .call((g) =>
//       g
//         .append("text")
//         .attr("x", -50)
//         .attr("y", -2)
//         .attr("fill", "currentColor")
//         .attr("text-anchor", "start")
//         .text(ydata.concat(" ^"))
//     )
//     //   .call(yAxis)
//     .call(yAxis);

//   // Plotting the data
//   svg
//     .selectAll("circle")
//     .data(data)
//     .enter()
//     .append("circle")
//     .attr("class", "dot")
//     .attr("cx", function (d, i) {
//       // return xScale(xd[i]) ;
//       return xScale(xd[i]) + Math.random() * 10 - 5;
//     })
//     .attr("cy", function (d, i) {
//       return yScale(yd[i]) + Math.random() * 10 - 5;
//     })
//     .attr("r", 3);
// }

function scatterPlot(xValue, yValue, data) {
  console.log(xValue, yValue);

  var xData = [];
  for (var i = 0; i < data.length; i++) {
    xData.push(data[i][xValue]);
  }

  var yData = [];
  for (var i = 0; i < data.length; i++) {
    yData.push(data[i][yValue]);
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
    height = svg.attr("height") - margin; //200

  // Step 4
  xrange = d3.max(xData, function (d) {
    return parseInt(d);
  });
  yrange = d3.max(yData, function (d) {
    return parseInt(d);
  });
  xrange1 = d3.min(xData, function (d) {
    return parseInt(d);
  });
  yrange1 = d3.min(yData, function (d) {
    return parseInt(d);
  });

  var xScale = d3
      .scaleLinear()
      .domain([xrange1 - 5, xrange + 5])
      .range([0, width]),
    yScale = d3
      .scaleLinear()
      .domain([yrange1 - 5, yrange + 5])
      .range([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

  // Step 5
  // Title
  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("Scatter Plot");

  // X label
  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height - 15 + 150)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text(xValue);
  // Y label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(40," + height + ")rotate(-90)")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text(yValue);

  // Step 6
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  g.append("g").call(d3.axisLeft(yScale));

  // Step 7
  svg
    .append("g")
    .selectAll("dot")
    .data(scatterData)
    .enter()
    .append("circle")
    .transition().duration(1000)
    .attr("cx", function (d) {
      return xScale(d[0]);
    })
    .attr("cy", function (d) {
      return yScale(d[1]);
    })
    .attr("r", 2)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000");
}

function scatterPlot_categorical(xValue, yValue, data) {
    console.log(xValue, yValue);
  
    var xData = [];
    for (var i = 0; i < data.length; i++) {
      xData.push(data[i][xValue]);
    }
  
    var yData = [];
    for (var i = 0; i < data.length; i++) {
      yData.push(data[i][yValue]);
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
      height = svg.attr("height") - margin; //200
  
    // Step 4
    xrange = d3.max(xData, function (d) {
      return parseInt(d);
    });
    yrange = d3.max(yData, function (d) {
      return parseInt(d);
    });
    xrange1 = d3.min(xData, function (d) {
      return parseInt(d);
    });
    yrange1 = d3.min(yData, function (d) {
      return parseInt(d);
    });
  
    var xScale = d3
        .scaleLinear()
        .domain([xrange1 - 1, xrange + 1])
        .range([0, width]),
      yScale = d3
        .scaleLinear()
        .domain([yrange1 - 1, yrange + 1])
        .range([height, 0]);
  
    var g = svg
      .append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");
  
    // Step 5
    // Title
    svg
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", 50)
      .attr("text-anchor", "middle")
      .style("font-family", "Times New Roman")
      .style("font-size", 20)
      .style("padding", "7px")
      .style("background-color", "#03f79e")
      .text("Scatter Plot");
  
    // X label
    svg
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", height - 15 + 150)
      .attr("text-anchor", "middle")
      .style("font-family", "Times New Roman")
      .style("font-size", 20)
      .text(xValue);
    // Y label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(30," + height + ")rotate(-90)")
      .style("font-family", "Times New Roman")
      .style("font-size", 20)
      .text(yValue);
  
    // Step 6
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));
  
    g.append("g").call(d3.axisLeft(yScale));
  
    // Step 7
    svg
      .append("g")
      .selectAll("dot")
      .data(scatterData)
      .enter()
      .append("circle")
      .transition().duration(1000)
      .attr("cx", function (d) {
        return xScale(d[0])+Math.random()*10-5;
      })
      .attr("cy", function (d) {
        return yScale(d[1])+Math.random()*10-5;
      })
      .attr("r", 2)
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .style("fill", "#CC0000");
  }
