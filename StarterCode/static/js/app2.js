//Read json file using d3
d3.json("data/samples.json").then(function(data) {
    console.log(data);
    var trace1 = {
        x: data.otu_ids,
        y: data.sample_values,
        type: "bar",
        name: "BellyBotton Biodiversity",
       
      };
    
      // Create the data array for the plot
      var data = [trace1];
    
      // Define the plot layout
      var layout = {
        title: "BellyBotton Biodiversity",
        xaxis: { title: "Count" },
        yaxis: { title: "Otu ID" }
      };
    
      // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", data, layout);
});


    // let names = [];
    // let metadata = [];
    // let samples = [];

    // Object.entries(data).forEach(([key, value]) => {
    //     if (key === "names") {
    //         names.push(value);
    //     };
    //     if (key === "metadata")  {
    //         metadata.push(value);
    //     };
    //     if (key === "samples") {
    //         samples.push(value);
    //     };
        
    // }); 
    // console.log(names);
    // console.log(metadata);
    // console.log(samples.id)

 
        
    // var sortedSamples = samples.sort((a, b) => b.sample_values - a.sample_values);

    // console.log(sortedSamples)
    
    // var slicedSamples = sample_values.slice(0, 10).reverse();
    
    // console.log(slicedSamples);
   




// var slicedSamples = samples.slice(0, 10);

// console.log(slicedSamples);
// // var otuID = sample.otu_ids
// // var otuCounts
