function drawscreeplot(data, categories, axisname) {
    console.log("Inside Scree Plot")
    ncat = categories.length;

    var svg = d3.select("svg"),
        margin = 200,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    var x = d3.scaleBand().range([0, width]).padding(0.09);
    var y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g").attr("transform", "translate(" + 100 + "," + 65 + ")");

    x.domain(categories);
    y.domain([0, 1]);

    combination = [];

    for (i = 0; i < data.length; i++) {
        var x1 = data[i];
        var x2 = categories[i];
        if (i > 0) {
            x1 += combination[i - 1][0];
        }
        combination.push([x1, x2]);
    }

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .append("text")
        .attr("y", height - 250)
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-family", "arial")
        .attr("font-size", "20px")
        .attr("font-weight", "bolder")
        .text(axisname);

    g.append("g")
        .call(d3.axisLeft(y).tickFormat(function(d) {
            return d;
        }).ticks(10))
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
        .text("Variance explained");

    g.selectAll(".bar")
        .data(categories)
        .enter().append("rect")
        .attr("class", "bar")
        .on("mouseover", mouseIn)
        .on("mouseout", mouseOut)
        .on("click", onClick)
        .attr("x", function(d) { return x(d); })
        .attr("y", height)
        .attr("height", 0)
        .attr("width", x.bandwidth())
        .transition()
        .ease(d3.easeLinear)
        .duration(450)
        .delay(function(d, i) {
            return i * 50;
        })
        .attr("y", function(d, i) { return y(data[i]); })
        .attr("height", function(d, i) { return height - y(data[i]); });

    g.append('g')
        .selectAll("dot")
        .data(combination)
        .enter()
        .append("circle")
        .transition()
        .ease(d3.easeLinear)
        .duration(40)
        .delay(function(d, i) {
            return i * 2.5;
        })
        .attr("cx", function(d) {
            return x(d[1]) + x.bandwidth() / 2;
        })
        .attr("cy", function(d) {
            return y(d[0]);
        })
        .attr("r", 5)
        .style("fill", "#008275")

    var line = d3.line()
        .x(function(d) { return x(d[1]) + x.bandwidth() / 2; })
        .y(function(d) { return y(d[0]); })

    g.append("path")
        .datum(combination)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "rgb(65, 15, 80)")
        .style("stroke-width", "1.75");

    svg.append('text')
        .attr('x', width / 1.5)
        .attr('y', 45)
        .attr('text-anchor', 'middle')
        .style("font-size", "28px")
        .attr("fill", "#360082")
        .attr("font-weight", "bolder")
        .style("text-decoration", "none")
        .text("Scree plot")

    function mouseIn(d, i) {
        d3.select(this).attr('class', 'highlight');
        d3.select(this)
            .transition()
            .duration(180)

        g.append("text")
            .attr('class', 'val')
            .attr('x', function() {
                return x(d) + 15;
            })
            .attr('y', function() {
                return y(data[i]) - 20;
            })
            .style("font-size", "19px")
            .style("fill", "#824a00")
            .attr("font-weight", "bolder")
            .text(function() {
                return [+data[i]];
            });
    }

    function mouseOut(d, i) {
        d3.select(this).attr('class', 'bar');
        d3.select(this)
            .transition()
            .duration(180)
        d3.selectAll('.val')
            .remove()
    }

    function onClick(d, i) {
        document.getElementById("di").innerHTML = i + 1;

    }
}