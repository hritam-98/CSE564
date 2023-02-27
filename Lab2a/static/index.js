var PCA1 = diction['PCA1'];
var PCA2 = diction['PCA2'];
categories = ['PCA1', 'PCA2', 'PCA3', 'PCA4', 'PCA5', 'PCA6', 'PCA7', 'PCA8', 'PCA9', 'PCA10', 'PCA11', 'PCA12', 'PCA13', 'PCA14', 'PCA15', 'PCA16', 'PCA17', 'PCA18', 'PCA19', 'PCA20', 'PCA21'];

function fnScree() {
    document.getElementById("mysvg").innerHTML = "";
    drawscreeplot(pcareturn, categories, "Principal Components");
}

function fnbiplot() {
    document.getElementById("mysvg").innerHTML = "";
    drawbiplot(dotresult1, dotresult2, diction['PCA1'], diction['PCA2'], labels);
    // Change this if two plots are changed
    // drawbiplot(dotresult1, dotresult2, diction['PCA1'], diction['PCA2'], labels);
}

function fnscatterplot() {
    document.getElementById("mysvg").innerHTML = "";
    console.log(dt1)
    drawScatterPlotMatrix(dt1, dt2, dt3, dt4, "PCA1", "PCA2", labels);
}

function fnelbow() {
    document.getElementById("mysvg").innerHTML = "";
    drawelbow(avg, xx, yy);
}

function fnkmeans() {
    document.getElementById("mysvg").innerHTML = "";
    drawkmeans(a1, b1, aa1, bb1, labels);
}

var age = [];
var overall = [];
var height_cm = [];
var weight_kg = [];
var pace = [];
var shooting = [];
var passing = [];
var dribbling = [];
var defending = [];
var physic = [];
var attacking_crossing = [];
var attacking_heading_accuracy = [];
var attacking_short_passing = [];
var skill_dribbling = [];
var skill_curve = [];
var power_shot_power = [];
var power_jumping = [];
var mentality_aggression = [];
var mentality_interceptions = [];
var mentality_vision = [];
var mentality_penalties = [];
var wage_eur = [];

scatterDict = {
    'age': age,
    "overall": overall,
    "height_cm": height_cm,
    "weight_kg": weight_kg,
    "pace": pace,
    "shooting": shooting,
    "passing": passing,
    "dribbling": dribbling,
    "defending": defending,
    "physic": physic,
    "attacking_crossing": attacking_crossing,
    "attacking_heading_accuracy": attacking_heading_accuracy,
    "attacking_short_passing": attacking_short_passing,
    "skill_dribbling": skill_dribbling,
    "skill_curve": skill_curve,
    "power_shot_power": power_shot_power,
    "power_jumping": power_jumping,
    "mentality_aggression": mentality_aggression,
    "Interception": mentality_interceptions,
    "mentality_vision": mentality_vision,
    "mentality_penalties": mentality_penalties
};
console.log(scatterDict)
//console.log(scatterplotmatrix)
console.log(scatterplotmatrix)
var dt1 = scatterDict[scatterplotmatrix[0]];
var dt2 = scatterDict[scatterplotmatrix[1]];
var dt3 = scatterDict[scatterplotmatrix[2]];
var dt4 = scatterDict[scatterplotmatrix[3]];

function dot_product(vector1, vector2) {
    var dot_result = 0;
    for (var i = 0; i < 21; i++) {
        dot_result += vector1[i] * vector2[i];
    }
    return dot_result;
}

arr = [];

d3.csv("../static/data/final_data.csv", function(csvdata) {
    //console.log(csvdata)
    csvdata.map(function(d) {
        age.push(+d['age']);
        overall.push(+d['overall']);
        height_cm.push(+d['height_cm']);
        weight_kg.push(+d['weight_kg']);
        pace.push(+d['pace']);
        shooting.push(+d['shooting']);
        passing.push(+d['passing']);
        dribbling.push(+d['dribbling']);
        defending.push(+d['defending']);
        physic.push(+d['physic']);
        attacking_crossing.push(+d['attacking_crossing']);
        attacking_heading_accuracy.push(+d['attacking_heading_accuracy']);
        attacking_short_passing.push(+d['attacking_short_passing']);
        skill_dribbling.push(+d['skill_dribbling']);
        skill_curve.push(+d['skill_curve']);
        power_shot_power.push(+d['power_shot_power']);
        power_jumping.push(+d['power_jumping']);
        mentality_aggression.push(+d['mentality_aggression']);
        mentality_interceptions.push(+d['mentality_interceptions']);
        mentality_vision.push(+d['mentality_vision']);
        mentality_penalties.push(+d['mentality_penalties']);


        temp = [];
        temp.push(+d["age"]);
        temp.push(+d["overall"]);
        temp.push(+d["height_cm"]);
        temp.push(+d["weight_kg"]);
        temp.push(+d["pace"]);
        temp.push(+d["shooting"]);
        temp.push(+d["passing"]);
        temp.push(+d["dribbling"]);
        temp.push(+d["defending"]);
        temp.push(+d["physic"]);
        temp.push(+d["attacking_crossing"]);
        temp.push(+d["attacking_heading_accuracy"]);
        temp.push(+d["attacking_short_passing"]);
        temp.push(+d["skill_dribbling"]);
        temp.push(+d["skill_curve"]);
        temp.push(+d["power_shot_power"]);
        temp.push(+d["power_jumping"]);
        temp.push(+d["mentality_aggression"]);
        temp.push(+d["mentality_interceptions"]);
        temp.push(+d["mentality_vision"]);
        temp.push(+d["mentality_penalties"]);

        arr.push(temp);
        //console.log(temp)
    });
    //console.log(arr)
    dotresult1 = [];
    dotresult2 = [];
    for (var i = 0; i < arr.length; i++) {
        dotresult1.push(dot_product(diction1['PCA1'], arr[i]));
        dotresult2.push(dot_product(diction1['PCA2'], arr[i]));
    }
    // drawscreeplot(data, categories, "Principal Components");
    // drawbiplot(dotresult1, dotresult2, PCA1,PCA2, labels);
    // drawScatterPlotMatrix(dt1, dt2, dt3, dt4, "PCA1", "PCA2", labels);
    // drawelbow(avg, xx, yy);
    drawkmeans(a1, b1, aa1, bb1,labels);
});