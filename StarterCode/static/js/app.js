//Read json file using d3
d3.json("data/samples.json").then(function(data) {
    console.log(data);

    let names = [];
    let metadata = [];
    let samples = [];

    Object.entries(data).forEach(([key, value]) => {
        if (key === "names") {
            names.push(value);
        };
        if (key === "metadata")  {
            metadata.push(value);
        };
        if (key === "samples") {
            samples.push(value);
        };
        
    }); 
    console.log(names);
    console.log(metadata);
    console.log(samples.id)

 
        
    // var sortedSamples = samples.sort((a, b) => b.sample_values - a.sample_values);

    // console.log(sortedSamples)
    
    // var slicedSamples = sample_values.slice(0, 10).reverse();
    
    // console.log(slicedSamples);
});    




// var slicedSamples = samples.slice(0, 10);

// console.log(slicedSamples);
// // var otuID = sample.otu_ids
// // var otuCounts
