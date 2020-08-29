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
    
    var cFu = otuCount.toString().split(",");
    var colonies = cFu.slice(0, 10, ",");
   
    console.log(colonies)
       
    //Horizontal bar chart  
    var trace1 = {
      x: parseInt(colonies),
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
      x: parseInt(colonies),
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
  });
    //Gauge chart

    // var traceGauge = {
    //   type: 'pie',
    //   showlegend: false,
    //   hole: 0.4,
    //   rotation: 90,
    //   values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
    //   text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    //   direction: 'clockwise',
    //   textinfo: 'text',
    //   textposition: 'inside',
    //   marker: {
    //     colors: ['','','','','','','','','','white'],
    //     labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
    //     hoverinfo: 'label'
    //   }
    // };

  //   var wfreq = []
  //   var other = []
  //   firstMetadata.forEach((data) => {

  //     // Iterate through each key and value
  //     Object.entries(recipe).forEach(([key, value]) => {
    
  //       // Use the key to determine which array to push the value to
  //       if (key === "wfreq") {
  //         wfreq.push(value);
  //       }
  //       else {
  //         other.push(value);
  //       };
  //     });

  //   console.log(wfreq);
  //   var degrees = 50, radius = .9
  //   var radians = degrees * Math.PI / 180
  //   var x = -1 * radius * Math.cos(radians) * wfreq
  //   var y = radius * Math.sin(radians)
    
  //   var gaugeLayout = {
  //     shapes: [{
  //       type: 'line',
  //       x0: 0.5,
  //       y0: 0.5,
  //       x1: 0.6,
  //       y1: 0.6,
  //       line: {
  //         color: 'black',
  //         width: 3
  //       }
  //     }],
  //     title: 'Chart',
  //     xaxis: {visible: false, range: [-1, 1]},
  //     yaxis: {visible: false, range: [-1, 1]}
  //   }
    
  //   var dataGauge = [traceGauge]
    
  //   Plotly.plot('gauge', dataGauge, gaugeLayout)
  
  // });
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

    

      if (parseInt(option) === metadata[j].id) {
        var newMetadata = Object.entries(metadata[j]);

      };

      if (option === samples[j].id) {
        var newSamples = Object.values(samples[j]);
        
      };
      
    };

    console.log(newSamples);
    console.log(newMetadata);
  

   
    var Id = newSamples.map(function(subject) {
         return subject;
    });

    console.log(Id);
      
    var microbes = Id.toString().split(",");
    console.log(microbes)
    var bbmicrobes = microbes.slice(0, 10);
    console.log(bbmicrobes);
               
            
            
    var otuCount = newSamples.map(function(counts) {
         return counts;
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

    d3.select("ul").text(" ");
        
    for (i = 0; i < newMetadata.length; i++) {

      

      d3.select("ul").append("li").text(newMetadata[i]);
    };
    
    
        
    // //Bubble chart
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

init();



