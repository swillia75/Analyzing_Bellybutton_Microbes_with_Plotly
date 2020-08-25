//Read json file using d3
d3.json("data/samples.json").then(function(data) {
    console.log(data);

    var names = [];
    var metadata = [];
    var samples = [];

    Object.entries(data).forEach(([key, value]) => {
        if (key === "names"){
            names.push(value);
        };
        if (key === "metadata"){
            metadata.push(value);
        };
        if (key === "samples"){
            samples.push(value);
        };
              
});    

console.log(names);
console.log(metadata);
console.log(samples);});

var sortedSamples = samples.sort(function compareFunction(a, b){
    return b.samples_value - a.samples_value
});

console.log(sortdSamples)

var slicedSamples = sortedSamples.slice(0, 10);

console.log(slicedSamples);
// var otuID = sample.otu_ids
// var otuCounts
