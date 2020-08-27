function init(){
  var dropdownMenu = d3.selectAll("#selDataset").node()
  // var dropdownMenuID = dropdownMenu.id;
  var option = dropdownMenu.value;

  d3.json("data/samples.json").then(function(data) {
    console.log(data);

    var names = Object.values(data.names);
    var metadata = Object.values(data.metadata);
    var samples = Object.values(data.samples);

    console.log(names);
    console.log(metadata);
    console.log(samples);

    names.forEach((name) => {
      d3.selectAll("select")
      .append("option").text(name).property("value", name)
    });

    function initialSubject(subject) {
      return subject.id === "940";
    };  

    
    var firstDataset = samples.filter(initialSubject);
    console.log(firstDataset)

    var Id = firstDataset.map(function(samples) {
        return samples.otu_ids;
    });
    
    console.log(Id);        
            
    var otuCount = firstDataset.map(function(samples) {
        return samples.sample_values;
    });  
                  
    console.log(otuCount);
        
    

    var otuIDs = Id.slice(0, 10);
    console.log(otuIDs);   
    
           
    var microbes = otuCount.slice(0, 10);     
    console.log(microbes);
      
      
    var trace1 = {
      x: microbes,
      y: otuIDs,
      type: "bar",
      name: "BellyBotton Biodiversity",
      orientation: "h"
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
        
    function initialMetadata(data) {
      return data.id === 940;
    };

    var firstMetadata = metadata.filter(initialMetadata);
    console.log(firstMetadata)

    var li1 = d3.select("ul").append("li").text(`ID: ${firstMetadata.id}`);
    var li2 = d3.select("ul").append("li").text(`Ethnicity: ${firstMetadata.ethnicity}`);   
    var li3 = d3.select("ul").append("li").text(`Gender: ${firstMetadata.gender}`);
    var li4 = d3.select("ul").append("li").text(`Age: ${firstMetadata.age}`);
    var li5 = d3.select("ul").append("li").text(`Location: ${firstMetadata.location}`);
    var li6 = d3.select("ul").append("li").text(`Location: ${firstMetadata.bbtype}`);
    var li7 = d3.select("ul").append("li").text(`Location: ${firstMetadata.wfreq}`);
    
  });
};

init()
//   //Read json file using d3
//   d3.json("data/samples.json").then(function(data) {
//       console.log(data);

//       var names = Object.values(data.names);
//       var metadata = Object.values(data.metadata);
//       var samples = Object.values(data.samples);

      
//       console.log(names);
//       console.log(metadata);
//       console.log(samples);

//       var filteredSamples = samples.filter(samples => samples.id === "940")
//       console.log (filteredSamples);
        
//       var otuId = samples.map(function(samples) {
//         return samples.otu_ids;
//       });

      
//       console.log(otuId);

            
//       var otuCount = samples.map(function(samples) {
//           return samples.sample_values;
//       });
  
//       console.log(otuCount);
      
      
//       var sampleValue = []
//       var otu_Ids =[]

      
//       for (var i = 0; i < otuId.length; i++) {
//           var sliced = otuId[i].slice(0, 10);
//           otu_Ids.push(sliced);
//       };
      
      
//       console.log(otuIds);

//       for (var i = 0; i < otuCount.length; i++) {
    
//           var slice = otuCount[i].slice(0, 10);
//           sampleValue.push(slice);
//       };
      
      
//       console.log(sampleValue);


//       var trace1 = {
//           x: sampleValue[0],
//           y: otuIds[0],
//           type: "bar",
//           name: "BellyBotton Biodiversity",
//           orientation: "h"
        
//       };
      
//         // Create the data array for the plot
//       var data = [trace1];
      
//         // Define the plot layout
//       var layout = {
//           title: "BellyBotton Biodiversity",
//           xaxis: { title: "Count" },
//           yaxis: { title: "Otu ID" }
//       };
      
//         // Plot the chart to a div tag with id "plot"
//       Plotly.newPlot("bar", data, layout);
  
        
      

//       var li1 = d3.select("ul").append("li").text(`ID: ${metadata[0].id}`);
//       var li2 = d3.select("ul").append("li").text(`Ethnicity: ${metadata[0].ethnicity}`);   
//       var li3 = d3.select("ul").append("li").text(`Gender: ${metadata[0].gender}`);
//       var li4 = d3.select("ul").append("li").text(`Age: ${metadata[0].age}`);
//       var li5 = d3.select("ul").append("li").text(`Location: ${metadata[0].location}`);

//       console.log(li1, li2, li3, li4, li5);
//   });
// // };

// function getData() {
//     //Read json file using d3
//     d3.json("data/samples.json").then(function(data) {
//       console.log(data);

//           var dropdownMenu = d3.selectAll("#seDataset").node()
//           var dropdownMenuID = dropdownMenu.id;
//           var option = dropdownMenu.value;

//           console.log(dropdownMenuID);
//           console.log(option)
//     });
    
// //       var names = Object.values(data.names);
// //       var metadata = Object.values(data.metadata);
// //       var samples = Object.values(data.samples);

      
// //       console.log(names);
// //       console.log(metadata);
// //       console.log(samples);
  
        
// //       var otuId = samples.map(function(samples) {
// //         return samples.otu_ids;
// //       });

      
// //       console.log(otuId);

            
// //       var otuCount = samples.map(function(samples) {
// //           return samples.sample_values;
// //       });
  
// //       console.log(otuCount);
      
      
// //       var sampleValue = []
// //       var otu_Ids =[]

      
// //       for (var i = 0; i < otuId.length; i++) {
// //           var sliced = otuId[i].slice(0, 10);
// //           otu_Ids.push(sliced);
// //       };
      
      
// //       console.log(otuIds);

// //       for (var i = 0; i < otuCount.length; i++) {
    
// //           var slice = otuCount[i].slice(0, 10);
// //           sampleValue.push(slice);
// //       };
      
      
// //       console.log(sampleValue);


// //       var trace1 = {
// //           x: sampleValue[0],
// //           y: otuIds[0],
// //           type: "bar",
// //           name: "BellyBotton Biodiversity",
// //           orientation: "h"
        
// //       };
      
// //         // Create the data array for the plot
// //       var data = [trace1];
      
// //         // Define the plot layout
// //       var layout = {
// //           title: "BellyBotton Biodiversity",
// //           xaxis: { title: "Count" },
// //           yaxis: { title: "Otu ID" }
// //       };
      
// //         // Plot the chart to a div tag with id "plot"
// //       Plotly.newPlot("bar", data, layout);
  
        
      

// //       var li1 = d3.select("ul").append("li").text(`ID: ${metadata[0].id}`);
// //       var li2 = d3.select("ul").append("li").text(`Ethnicity: ${metadata[0].ethnicity}`);   
// //       var li3 = d3.select("ul").append("li").text(`Gender: ${metadata[0].gender}`);
// //       var li4 = d3.select("ul").append("li").text(`Age: ${metadata[0].age}`);
// //       var li5 = d3.select("ul").append("li").text(`Location: ${metadata[0].location}`);
// // }; 
// // init()

