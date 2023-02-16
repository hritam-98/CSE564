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

var xValue = "";
var yValue = "";


myFunction().then(function (value) {
  var selected_x = "";
  var selected_y = "";
  var count= "";
  //var count_y = "";
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
    //count1++;
    $(".x-text").text(this.value);
    count = this.value;
    // if (this.value == "X-Axis") {
    //   count = this.value;
    //   //$(".selected_x").text(xValue);                 add it in dropdown
    // } else if (this.value == "Y-Axis") {
    //   count = this.value;
    //   //$(".selected_y").text(yValue);                 add it in dropdown
    // }
    // if (xValue != "" && yValue != "") {
    //   if (numerical_list.includes(xValue) || numerical_list.includes(yValue)) {
    //     scatterPlot(xValue, yValue, data);
    //   } else {
    //     scatterPlot_categorical(xValue, yValue, data);
    //   }
    // }
  });
  //var xValue = "";
  //var yValue = "";
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

      
      if (count == 'X-Axis' ) {
        var selected_text = e.currentTarget.innerHTML;
        selected_x = selected_text;
        $(".selected_x").text(selected_text);
      }
      if (count == 'Y-Axis' ) {
        var selected_text = e.currentTarget.innerHTML;
        selected_y = selected_text;
        $(".selected_y").text(selected_y);
      }
      if (selected_x != "" && selected_y != '') {
        if (
          numerical_list.includes(selected_x) ||
          numerical_list.includes(selected_y)
        ) {
          scatterPlot(selected_x, selected_y, data);
        } else {
          scatterPlot_categorical(selected_x, selected_y, data);
        }
      }

      // if (count % 2 == 0) {
      //   first_text = e.currentTarget.innerHTML;
      //   //console.log(first_text)
      //   //$('.x-text').text(e.currentTarget.innerHTML)
      // } else {
      //   second_text = e.currentTarget.innerHTML;
      //   //console.log(second_text)
      //   //$('.selected_y').text(e.currentTarget.innerHTML)
      // }
      count++;
    });

  data = value;
});

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
    .style("font-family", "Serif")
    .style("font-size", 20)
    .style("font-weight", "bold")
    .text(
      "Scatter plot of attribute: '"
        .concat(xValue)
        .concat("' vs. attribute: '")
        .concat(yValue)
        .concat("'")
    );

  // X label
  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height - 5 + 150)
    .attr("text-anchor", "middle")
    .style("font-family", "Serif")
    .style("font-size", 20)
    .style("font-weight", "bold")
    .text(xValue);
  // Y label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(40," + height + ")rotate(-90)")
    .style("font-family", "Serif")
    .style("font-size", 20)
    .style("font-weight", "bold")
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
    .transition()
    .duration(1000)
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
    .style("font-family", "Serif")
    .style("font-size", 20)
    .style("padding", "7px")
    .style("background-color", "#03f79e")
    .style("font-weight", "bold")
    .text(
      "Scatter plot of attribute: '"
        .concat(xValue)
        .concat("' vs. attribute: '")
        .concat(yValue)
        .concat("'")
    );

  // X label
  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height - 5 + 150)
    .attr("text-anchor", "middle")
    .style("font-family", "Serif")
    .style("font-weight", "bold")
    .style("font-size", 20)
    .text(xValue);
  // Y label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(30," + height + ")rotate(-90)")
    .style("font-family", "Serif")
    .style("font-size", 20)
    .style("font-weight", "bold")
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
    .transition()
    .duration(1000)
    .attr("cx", function (d) {
      return xScale(d[0]) + Math.random() * 10 - 5;
    })
    .attr("cy", function (d) {
      return yScale(d[1]) + Math.random() * 10 - 5;
    })
    .attr("r", 2)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000");
}
