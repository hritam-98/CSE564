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
myFunction().then(function (value) {
  data = value;
  hv = ["Horizontal", "Vertical"];
  for (var i = 0; i < hv.length; i++) {
    $(".orientation_axis").append(
      '<input type="radio" id="' +
        hv[i] +
        '1" name="xAxis" value="' +
        hv[i] +
        '"><label for="' +
        hv[i] +
        '1">' +
        hv[i] +
        "</label><br>"
    );
    //$(".axis").append('<input type="radio" id="' + numerical_list[i] + '2" name="yAxis" value="' + numerical_list[i] + '"><label for="' + numerical_list[i] + '2">' + numerical_list[i] + '</label><br>');
  }
  var dropdownItems = document.querySelectorAll('.dropdown-content a');

for (var i = 0; i < dropdownItems.length; i++) {
  dropdownItems[i].addEventListener('click', function() {
    var dropdown = this.parentNode.parentNode;
    dropdown.classList.remove('show');
  });
}
  for (var i = 0; i < categorical_list.length; i++) {
    const node = document.createElement("a");
    const textnode = document.createTextNode(categorical_list[i]);
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
  }
  for (var i = 0; i < numerical_list.length; i++) {
    const node = document.createElement("a");
    const textnode = document.createTextNode(numerical_list[i]);
    node.appendChild(textnode);
    document.getElementById("myList").appendChild(node);
  }
  
  $("#myList")
    .children()
    .click(function (e) {
      //console.log()
      $("svg").children().remove();
      $("input[type=radio][name = xAxis]").prop("checked", false);
      $(".radio-option").text(e.currentTarget.innerHTML);
      var numerical = false;
      var categorical = false;

      for (var k = 0; k <= categorical_list.length; k++) {
        if (e.currentTarget.innerHTML == categorical_list[k]) {
          categorical = true;
          break;
        }
      }
      for (var k = 0; k <= numerical_list.length; k++) {
        if (e.currentTarget.innerHTML == numerical_list[k]) {
          numerical = true;
          break;
        }
      }
      //var axis = 1
      $("input[type=radio][name = xAxis]").change(function () {
        orientation_val = this.value;
        console.log(orientation_val);
        if (categorical) {
          if (orientation_val == "Vertical") {
            drawBarChart(e.currentTarget.innerHTML, data);
          } else if (orientation_val == "Horizontal") {
            drawBarChart_horizontal(e.currentTarget.innerHTML, data);
          }
        }
        if (numerical) {
          if (orientation_val == "Vertical") {
            drawHistogram(e.currentTarget.innerHTML);
          } else if (orientation_val == "Horizontal") {
            drawHistogram_horizontal(e.currentTarget.innerHTML);
          }
        }
        // if (yValue != "") {
        //     scatterPlot(xValue, yValue, data);
        // }
      });
    });
});

// $('input[type=radio][name=xAxis]').change(function () {
//     xValue = this.value;
//     if (yValue != "") {
//         scatterPlot(xValue, yValue, data);
//     }
// });
function drawBarChart(value, data) {
  $("svg").children().remove();
  //document.getElementById("bar").innerHTML="";
  //console.log(value)
  barData = [];
  for (var i = 0; i < data.length; i++) {
    barData.push(data[i][value]);
  }
  count = countFrequency(barData);
  //console.log(count);
  final_data = count[1];
  label = count[0];

  var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  var xScale = d3.scaleBand().range([0, width]).padding(0.5),
    yScale = d3.scaleLinear().range([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

  xScale.domain(final_data);
  yScale.domain([0, 500]);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3.axisBottom(xScale).tickFormat(function (d) {
        return label[final_data.indexOf(d)];
      })
    );

  g.append("g").call(
    d3
      .axisLeft(yScale)
      .tickFormat(function (d) {
        return d;
      })
      .ticks(4)
  );

  g.selectAll(".bar")
    .data(final_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("id", "bar")
    //.on("mouseover", onMouseOver) //Add listener for the mouseover event
    //.on("mouseout", onMouseOut)   //Add listener for the mouseout event
    .attr("x", function (d) {
      return xScale(d);
    })
    .attr("y", function (d) {
      return yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .transition()
    .duration(1000)
    .attr("height", function (d) {
      return height - yScale(d);
    })
    .attr("count", function (d) {
      return d;
    });

  $("rect").hover(
    function () {
      $(".text-class").css("visibility", "visible");
      $("#count").text($(this).attr("count"));
    },
    function () {
      $(".text-class").css("visibility", "hidden");
      $("#count").text("");
    }
  );

  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", 100)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("Bar Plot");
  // X label
  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height - 15 + 150)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text(value);

  // Y label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(60," + height + ")rotate(-90)")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("count");

  //mouseout event handler function
  function onMouseOut(d, i) {
    // use the text label class to remove label on mouseout
    d3.select(this).attr("class", "bar");
    d3.select(this)
      .transition() // adds animation
      .duration(400);

    d3.selectAll(".val").remove();
  }
}
function drawBarChart_horizontal(value, data) {
  $("svg").children().remove();
  //document.getElementById("bar").innerHTML="";
  //console.log(value)
  barData = [];
  for (var i = 0; i < data.length; i++) {
    barData.push(data[i][value]);
  }
  count = countFrequency(barData);
  final_data = count[1];
  //console.log(final_data)
  label = count[0];

  var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  var xScale = d3.scaleLinear().range([0, width]),
    yScale = d3.scaleBand().range([height, 0]).padding(0.1);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");
  var asd = parseInt(Math.max(final_data) + 20);
  console.log(typeof asd);
  xScale.domain([0, 500]);
  yScale.domain(final_data);

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  g.append("g").call(
    d3
      .axisLeft(yScale)
      .tickFormat(function (d) {
        return label[final_data.indexOf(d)];
      })
      .ticks(4)
  );

  g.selectAll(".bar")
    .data(final_data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("id", "bar")
    .attr("x", xScale(0))
    .attr("y", function (d) {
      return yScale(d);
    })
    .transition()
    .duration(1000)
    .attr("width", function (d) {
      return xScale(d);
    })
    .attr("height", yScale.bandwidth())
    .attr("count", function (d) {
      return d;
    });

  $("rect").hover(
    function () {
      $(".text-class").css("visibility", "visible");
      $("#count").text($(this).attr("count"));
    },
    function () {
      $(".text-class").css("visibility", "hidden");
      $("#count").text("");
    }
  );

  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", 100)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("Bar Plot");

  // X label
  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height - 15 + 150)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("count");

  // Y label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(20," + height + ")rotate(-90)")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text(value);
}

function drawHistogram(value) {
  $("svg").children().remove();
  console.log(value);
  var barData = [];
  for (var i = 0; i < data.length; i++) {
    barData.push(data[i][value]);
  }
  console.log(barData);
  var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

  // X axis: scale and draw:
  var x = d3
    .scaleLinear()
    .range([0, width])
    .domain([
        d3.min(barData, function(d){
            return parseInt(d)- 5;
        }),
      d3.max(barData, function (d) {
        return parseInt(d) + 5;
      }),
    ]); // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3
    .histogram()
    .value(function (d) {
      return d;
    }) // I need to give the vector of value
    .domain(x.domain()) // then the domain of the graphic
    .thresholds(x.ticks(50)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins1 = histogram(barData);

  // Y axis: scale and draw:
  var y = d3.scaleLinear().range([height, 0]);
  y.domain([
    0,
    d3.max(bins1, function (d) {
      return d.length + 10;
    }),
  ]); // d3.hist has to be called before the Y axis obviously

  g.append("g").call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  g.selectAll(".bar")
    .data(bins1)
    .enter()
    .append("rect")
    .attr("id", "bar")
    //.on("mouseover", onMouseOver) //Add listener for the mouseover event
    //.on("mouseout", onMouseOut) //Add listener for the mouseout event
    .attr("x", 1)
    .attr("transform", function (d) {
      return "translate(" + x(d.x0) + "," + y(d.length) + ")";
    })
    .attr("width", function (d) {
      return x(d.x1) - x(d.x0);
    })
    .transition()
    .duration(1000)
    .attr("height", function (d) {
      return height - y(d.length) - 1;
    })
    
    .style("fill", "#69b3a2").attr("count", function (d) {
        return d.length;
      });
  
    $("rect").hover(
      function () {
        $(".text-class").css("visibility", "visible");
        $("#count").text($(this).attr("count"));
      },
      function () {
        $(".text-class").css("visibility", "hidden");
        $("#count").text("");
      }
    );
  

  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", 100)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("Histogram Plot");
  // X label
  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height - 15 + 150)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text(value);

  // Y label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(60," + height + ")rotate(-90)")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("count");

  function onMouseOver(d, i) {
    console.log(d.length);
    d3.select(this).attr("class", "highlight");
    d3.select(this)
    svg
      .append("text")
      .attr("class", "val")
      .attr("y", function () {
        return y(d.length) - 3;
      })
      .attr("x", function () {
        return x(d.x0);
      })
      .text(function () {
        return [d.length]; // Value of the text
      });
  }

  //mouseout event handler function
  function onMouseOut(d, i) {
    // use the text label class to remove label on mouseout
    d3.select(this).attr("class", "bar");
    d3.select(this)
      .transition() // adds animation
      .duration(400);

    d3.selectAll(".val").remove();
  }
}
function drawHistogram_horizontal(value) {
  $("svg").children().remove();
  //console.log(value)
  var barData = [];
  for (var i = 0; i < data.length; i++) {
    barData.push(data[i][value]);
  }
  console.log(barData);
  var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

  var y = d3.scaleLinear().range([height, 0]);
  y.domain([
    d3.min(barData, function(d){
        return parseInt(d)- 5;
    }),
    d3.max(barData, function (d) {
      return parseInt(d) + 5;
    }),
  ]); // d3.hist has to be called before the Y axis obviously
  g.append("g").call(d3.axisLeft(y));

  var histogram = d3
    .histogram()
    .value(function (d) {
      return d;
    }) // I need to give the vector of value
    .domain(y.domain()) // then the domain of the graphic
    .thresholds(y.ticks(50)); // then the numbers of bins
  // set the parameters for the histogram
  // And apply this function to data to get the bins
  var bins = histogram(barData);
  // X axis: scale and draw:

  //d3.max(barData, function(d) { return parseInt(d)+5 })
  // Y axis: scale and draw:

  var x = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(bins, function (d) {
        return d.length + 10;
      }),
    ]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]);
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  // append the bar rectangles to the svg element
  g.selectAll(".bar")
    .data(bins)
    .enter()
    .append("rect")
    .attr("id", "bar")
    .attr("x", 1)
    .attr("y", 1)
    .attr("transform", function (d) {
      return "translate(0," + y(d.x1) + ")";
    })
    .transition()
    .duration(1000)
    .attr("width", function (d) {
      return x(d.length);
    })
    .attr("height", function (d) {
      return y(d.x0) - y(d.x1) - 1;
    })
    .style("fill", "#69b3a2").attr("count", function (d) {
        return d.length;
      });
  
    $("rect").hover(
      function () {
        $(".text-class").css("visibility", "visible");
        $("#count").text($(this).attr("count"));
      },
      function () {
        $(".text-class").css("visibility", "hidden");
        $("#count").text("");
      }
    );
  

  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", 100)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("Histogram Plot");
  // X label
  svg
    .append("text")
    .attr("x", width / 2 + 100)
    .attr("y", height - 15 + 150)
    .attr("text-anchor", "middle")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text("count");

  // Y label
  svg
    .append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(40," + height + ")rotate(-90)")
    .style("font-family", "Times New Roman")
    .style("font-size", 20)
    .text(value);
}

function countFrequency(array) {
  let a = [],
    b = [],
    arr = [...array], // clone array so we don't change the original when using .sort()
    prev;

  arr.sort();
  for (let element of arr) {
    if (element !== prev) {
      a.push(element);
      b.push(1);
    } else ++b[b.length - 1];
    prev = element;
  }

  return [a, b];
}
