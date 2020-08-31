//create function for initial page
function init(){

  //Read data from json file
  d3.json("data/samples.json").then(function(data) {
    console.log(data);

    //Create arrays from json object
    var names = Object.values(data.names);
    var metadata = Object.values(data.metadata);
    var samples = Object.values(data.samples);

    console.log(names);
    console.log(metadata);
    console.log(samples);

    //Loop through names array and add names to dropdown menu
    names.forEach((name) => {
      d3.selectAll("select")
      .append("option").text(name).property("value", name)
    });

    //FIlter samples and metadata arrays for first subject - "940"
    function initialSubject(subject) {
      return subject.id === "940";
    };  

    var firstDataset = samples.filter(initialSubject);
    console.log(firstDataset)


    //creating array of otu_ids for plots
    var Id = firstDataset.map(function(samples) {
        return samples.otu_ids;
    });

    console.log(Id);
      
    //Convert Id array to strings and slice the first 10 otu_ids for plots
    var microbes = Id.toString().split(",");
    var bbmicrobes = microbes.slice(0, 10, ",");
    console.log(bbmicrobes);
               
            
    // creating array of sample_values        
    var otuCount = firstDataset.map(function(samples) {
        return samples.sample_values;
    }); 
    
    //Slicing the first 10 sample_vaues
    var colonies = otuCount.slice(0, 10);
    console.log(colonies);
   
    // console.log(colonies)
       
    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
      //Use sample_values as the values for the bar chart.
      //Use otu_ids as the labels for the bar chart.

    //Use otu_labels as the hovertext for the chart.
    var otuLabel = firstDataset.map(function(samples) {
      return samples.otu_labels;
    });

    var labels= otuLabels.slice(0,10);
    console.log(labels)
    //Create trace for horizontal bar chart
        
    var trace1 = {
      x: colonies,
      y: bbmicrobes,
      hovertext: labels
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
            
    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);

    //Create function to filter first subject metadata for panel    
    function initialMetadata(data) {
      return data.id === 940;
    };

    var firstMetadata = metadata.filter(initialMetadata);
    console.log(firstMetadata)

    //Loop through firstMetadata to use object.entries to append key,value pairs to sample_metadata
    firstMetadata.forEach((data) => {
        Object.entries(data).forEach(([key, value]) => {
          d3.select("ul").append("li").text(`${key} ${value}`);
        });
    });
        
    //Create a bubble chart that displays each sample.
      //Use otu_ids for the x values.
      //Use sample_values for the y values.
      //Use sample_values for the marker size.
      //Use otu_ids for the marker colors.
      //Use otu_labels for the text values.

    // creating array of otu_labels        
    
  

    //Create trace for bubble chart
    var trace2 = {
      x: microbes,
      y: otuCount,
      mode: 'markers',
      text: otuLabel,
      marker: {
        size: otuCount,
        color: microbes,

      };
    };
    
    //Create data array for bubble plot
    var bubbledata = [trace2];
    
    //Create layout for bubble plot
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    //Plot the chart to a div tag with id "bubble"
    Plotly.newPlot('bubble', bubbledata, layout);
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

//On click dropdown menu call function optionChanged
d3.selectAll("#selDataset").on("change", optionChanged);

//Create function to be called by dropdown click
function optionChanged() {
  var dropdownMenu = d3.selectAll("#selDataset").node();

  //Assign value of the dropdown option to a variable
  var option = dropdownMenu.value;
  console.log(option)

  //Read data from json file
  d3.json("data/samples.json").then(function(data) {
    console.log(data);

    //create arrays from json object
    var names = Object.values(data.names);
    var metadata = Object.values(data.metadata);
    var samples = Object.values(data.samples);

    console.log(names);
    console.log(metadata);
    console.log(samples);

    //Initialize empty arrays for sample_values, otu_ids, and otu_labels
    var selectValues = [] 
    var selectotuID = []  
    var selectLabels = []  

    //Loop through samples array and look for sample.id === option
    for (var j = 0; j < samples.length; j++) {

      if (option === samples[j].id) {

        // When option === sample.id, sample_values, otu_ids, 
        //and otu_labels are pushed to the empty arrays
        selectValues.push(samples[j].sample_values);
        selectotuID.push(samples[j].otu_ids);
        selectLabels.push(samples[j].otu_labels)
        
      };
      
    };

    console.log(selectValues);
    console.log(selectotuID);
    console.log(selectLabels);


    //Clear sample-metadata to add current metadata
    var clearMetadata = d3.select('#sample-metadata');
    
    clearMetadata.html("")

    //Create array for current metadata
    var currentMetadata = []


    //Loop through metadata object to metadata.id === option
    for (var i = 0; i < metadata.length; j++) {

      if (parseInt(option) === metadata[i].id) {

        //Push metadata to currentMetadata
        currentMetadata.push(metadata[i]);
        
        
      };
    };
    console.log(currentMetadata);


   
       
    // var microbes = selectotuID.toString().split(",");
    // console.log(microbes)
    // var bbmicrobes = microbes.slice(0, 10);
    // console.log(bbmicrobes);
               
            
            
    // var otuCount = selectValues.map(function(counts) {
    //      return counts;
    // }); 
    
    // // var colonies = otuCount.slice(0, 10);              
    // // console.log(colonies);
    // var cFu = otuCount.toString().split(",");
    // var bubbleColonies = cFu.slice(0, 10, ",");
    
    // console.log(bubbleColonies);
       
    // //Horizontal bar chart  
    // var trace1 = {
    //   x: selectValues,
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
    //     xaxis: { title: "Count",
    //             tickmode: "linear"},
    //     yaxis: { title: "Otu ID" }
    // };
            
    //           // Plot the chart to a div tag with id "plot"
    // Plotly.newPlot("bar", data, layout);

    // d3.select("ul").text(" ");
        
   
    // for (i = 0; i < metadata.length; i++) {

    //   if (option === metadata[i].id){
      
    //     Object.entries(metadata).forEach(([key, value]) => {
    //       console.log ([key, value])
    //       d3.selectAll("ul").append("li").text(`${key} ${value}`);
    //     });
    //   };
    // };
    
    
        
    // // //Bubble chart
    // var trace2 = {
    //   x: newdataotuID,
    //   y: newdataValues,
      
    //   mode: 'markers',
    //   marker: {
    //     size: newdataValues,
    //     colors: newdataotuID,
    //   }
    // };
    
    // var bubbledata = [trace2];
    
    // var bubblelayout = {
    //   title: 'Marker Size',
    //   showlegend: false,
    //   height: 600,
    //   width: 600
    // };
    
    // Plotly.newPlot('bubble', bubbledata, bubblelayout);

    // //Gauge chart
  });
};

init();



