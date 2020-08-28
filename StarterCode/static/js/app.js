function init(){

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
      
    var microbes = Id.toString().split(",");
    var bbmicrobes = microbes.slice(0, 10, ",");
    console.log(bbmicrobes);
               
            
            
    var otuCount = firstDataset.map(function(samples) {
        return samples.sample_values;
    }); 
    
    var colonies = otuCount.slice(0, 10);              
    console.log(colonies);
    
       
    //Horizontal bar chart  
    var trace1 = {
      x: colonies,
      y: bbmicrobes,
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

    firstMetadata.forEach((data) => {
        Object.entries(data).forEach(([key, value]) => {
          d3.select("ul").append("li").text(`${key} ${value}`);
        });
    });
        
    //Bubble chart
    var trace2 = {
      x: colonies,
      y: bbmicrobes,
      mode: 'markers',
      marker: {
        size: [40, 60, 80, 100]
      }
    };
    
    var data = [trace2];
    
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);

    //Gauge chart
  });
};

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
  var dropdownMenu = d3.selectAll("#selDataset").node()
  
  var option = dropdownMenu.value;
  console.log(option)
  
  d3.json("data/samples.json").then(function(data) {
    console.log(data);

    var names = Object.values(data.names);
    var metadata = Object.values(data.metadata);
    var samples = Object.values(data.samples);

    console.log(names);
    console.log(metadata);
    console.log(samples);
    
   
    for (var j = 0; j < samples.length; j++) {

    //   // if (option === data.names[0]) {
    //   //   var newNames = Object.values(data.names[0]);
    //   // }

      if (parseInt(option) === metadata[j].id) {
        var newMetadata = Object.values(metadata[j]);

      };

      if (option === samples[j].id) {
        var newSamples = Object.values(samples[j]);
        
      };
      
    };

    console.log(newSamples);
    console.log(newMetadata);
    // console.log(newSamples);

    // function initialSubject(subject) {
    //   return subject.id === "940";
    // };  

    
    // var firstDataset = samples.filter(initialSubject);
    // console.log(firstDataset)

    // var Id = firstDataset.map(function(samples) {
    //     return samples.otu_ids;
    // });

    // console.log(Id);
      
    // var microbes = Id.toString().split(",");
    // var bbmicrobes = microbes.slice(0, 10, ",");
    // console.log(bbmicrobes);
               
            
            
    // var otuCount = firstDataset.map(function(samples) {
    //     return samples.sample_values;
    // }); 
    
    // var colonies = otuCount.slice(0, 10);              
    // console.log(colonies);
    
       
    // //Horizontal bar chart  
    // var trace1 = {
    //   x: colonies,
    //   y: bbmicrobes,
    //   type: "bar",
    //   name: "BellyBotton Biodiversity",
    //   orientation: "h"
    // };
            
    //           // Create the data array for the plot
    // var data = [trace1];
            
    //           // Define the plot layout
    // var layout = {
    //     title: "BellyBotton Biodiversity",
    //     xaxis: { title: "Count" },
    //     yaxis: { title: "Otu ID" }
    // };
            
    //           // Plot the chart to a div tag with id "plot"
    // Plotly.newPlot("bar", data, layout);
        
    // function initialMetadata(data) {
    //   return data.id === 940;
    // };

    // var firstMetadata = metadata.filter(initialMetadata);
    // console.log(firstMetadata)

    // firstMetadata.forEach((data) => {
    //     Object.entries(data).forEach(([key, value]) => {
    //       d3.select("ul").append("li").text(`${key} ${value}`);
    //     });
    // });
        
    // //Bubble chart
    // var trace2 = {
    //   x: colonies,
    //   y: bbmicrobes,
    //   mode: 'markers',
    //   marker: {
    //     size: [40, 60, 80, 100]
    //   }
    // };
    
    // var data = [trace2];
    
    // var layout = {
    //   title: 'Marker Size',
    //   showlegend: false,
    //   height: 600,
    //   width: 600
    // };
    
    // Plotly.newPlot('bubble', data, layout);

    //Gauge chart
  });
}

init()



