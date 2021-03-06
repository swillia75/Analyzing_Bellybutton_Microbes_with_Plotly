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

    var option = "940"

    //FIlter samples and metadata arrays for first subject - "940"
    function initialSubject(subject) {
      return subject.id === option;
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

    var colonies = otuCount.toString().split(",");
    var cfu = colonies.slice(0, 10, ",");
    var count = cfu.toString()
   
   
    
    //Slicing the first 10 sample_vaues

   
    
       
    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    //Use otu_labels as the hovertext for the chart.
    var otuLabel = firstDataset.map(function(samples) {
      return samples.otu_labels;
    });

    var labels = otuLabel.toString().split(";");
    var organism = labels.slice(0, 10, ";");
   
    //Slice function not working use loop to 
    //turn string array to integers
    var bugs = []
    
    for (i=0; i<cfu.length; i++){
      bugs.push(Number(cfu[i]))
    }

    console.log(bugs);
    console.log(bbmicrobes);
    console.log(organism);
  
    //Create trace for horizontal bar chart
  // });      
    var tracehbar = {
      x: bugs,
      y: bbmicrobes,
      type: "bar",
      orientation: "h",
      hovertext: organism
     
    };
            
//     Create the data array for the plot
    var data = [tracehbar];
            
//     Define the plot layout
    var layout = {
        title: "BellyBotton Biodiversity",
        xaxis: { title: "Count" },
        yaxis: { title: "Otu ID",
                autotick: true},
        
    };
            
//     Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);

//     Create function to filter first subject metadata for panel    
    function initialMetadata(data) {
      return data.id === parseInt(option);
    };

    
    var firstMetadata = metadata.filter(initialMetadata);
    console.log(firstMetadata)

  //  Loop through firstMetadata to use object.entries to append key,value pairs to sample_metadata
    firstMetadata.forEach((data) => {
        Object.entries(data).forEach(([key, value]) => {
          d3.select("#sample-metadata").append("ul").append("li").text(`${key}  :  ${value}`);
        });
    });
  
           
//     Create a bubble chart that displays each sample.
    console.log(Id);
    console.log(otuCount);
    console.log(labels);
    
//     Create trace for bubble chart
    var tracebubble = {
      x: microbes,
      y: colonies,
      type: "scatter",
      mode: 'markers',
      hovertext: labels,
      
      marker: {
        size: colonies,
        color: microbes,
        symbol: "circle"
       
      },
      
    };
    
//     Create data array for bubble plot
    var bubbledata = [tracebubble];
    
//     Create layout for bubble plot
    var bubblelayout = {
      title: 'BellyBottom Microbe Diversity',
      showlegend: false,
      height: 800,
      width: 1000
    };
    
//     Plot the chart to a div tag with id "bubble"
    Plotly.newPlot('bubble', bubbledata, bubblelayout);
  
   // Gauge chart

    //Create array for Wfreq and other
    var wfreq = [];
    var other = [];

//     Loop through first metadata for wfreq
    firstMetadata.forEach((data) => {

//       Iterate through each key and value
      Object.entries(data).forEach(([key, value]) => {
    
//         Use the key to determine which array to push the value to
        if (key === "wfreq") {
         
          wfreq.push(value);
        }
        else {
          other.push(value);
        };
      });
    });

    console.log(wfreq);
    var wash = wfreq[0];
    console.log(wash);
//     Use wfreq array to generate gauge plot

    //Create initial gauge chart trace
    var traceGauge = {
      type: 'pie',
      rotation: 90,
      values: [ 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180],
      text: ['0','1','2','3','4','5','6','7','8','9'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['red','orange','yellow','tan','green','blue','purple','maroon','grey', 'cyan', 'white'],
        labels: ['0','1','2','3','4','5','6','7','8','9'],
        hoverinfo: 'label'
      }
    };

    //Set up needle for intial subject

    var degrees = 97, radius = 0.9;

    var radians = degrees * Math.PI / 180;
    var x = -1 * radius * Math.cos(radians) * wash;
    var y = radius * Math.sin(radians);

    //Set up Gauge layout
    var gaugeLayout = {
      shapes: [{
        type: 'line',
        x0: 0.5,
        y0: 0.5,
        x1: x,
        y1: y,
        line: {
          color: 'black',
          width: 3
        }
      }],

      title: 'Belly Button washing Frequency',
      xaxis: {visible: false, range: [-1, 1]},
      yaxis: {visible: false, range: [-1, 1]}
    };

    //Create data gauge array
    var dataGauge = [traceGauge];

    //Plot initial gauge chart
    Plotly.newPlot('gauge', dataGauge, gaugeLayout);
  });

};
// On click dropdown menu call function optionChanged
d3.selectAll("#selDataset").on("change", optionChanged);

// Create function to be called by dropdown click
function optionChanged() {

  var dropdownMenu = d3.selectAll("#selDataset").node();

//   Assign value of the dropdown option to a variable
  var option = dropdownMenu.value;

  console.log(option)

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

    //FIlter samples and metadata arrays for option
    function initialSubject(subject) {
      return subject.id === option;
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

    console.log(otuCount);
    
    //Slicing the first 10 sample_vaues
    var colonies = otuCount.toString().split(",");
    var cfu = colonies.slice(0, 10, ",");
    var count = cfu.toString()
    console.log(count);
  
    var bugs = []
      
      for (i=0; i<cfu.length; i++){
        bugs.push(Number(cfu[i]))
      }

      console.log(bugs)
    //Create a horizontal bar chart with a dropdown menu to display the top 
    //10 OTUs found in that individual.

    //Use otu_labels as the hovertext for the chart.
    var otuLabel = firstDataset.map(function(samples) {
      return samples.otu_labels;
    });


    var labels = otuLabel.toString().split(";");
    var organism = labels.slice(0, 10, ";");
    console.log(organism);

    //Create trace for horizontal bar chart
    // });      
    var tracehbar = {
      x: bugs,
      y: bbmicrobes,
      type: "bar",
      orientation: "h",
      hovertext: organism,
        
    };
          
      //     Create the data array for the plot
    var data = [tracehbar];
          
    //     Define the plot layout
    var layout = {
      title: "BellyBotton Biodiversity",
      xaxis: { title: "Count" },
      yaxis: { title: "Otu ID",
              autotick: true},
      
  };
          
  //     Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar", data, layout);

  //     Create function to filter first subject metadata for panel    
    function initialMetadata(data) {
      return data.id === parseInt(option);
    };

    var clearMetadata = d3.select('#sample-metadata');
      
      clearMetadata.html("")

    var currentMetadata = metadata.filter(initialMetadata);
    console.log(currentMetadata)

  //  Loop through firstMetadata to use object.entries to append key,value pairs to sample_metadata
    currentMetadata.forEach((data) => {
        Object.entries(data).forEach(([key, value]) => {
          d3.select("#sample-metadata").append("ul").append("li").text(`${key}  :  ${value}`);
        });
    });

          
  //     Create a bubble chart that displays each sample.
  
    
  //     Create trace for bubble chart
    var tracebubble = {
      x: microbes,
      y: colonies,
      type: "scatter",
      mode: 'markers',
      hovertext: labels,
    
      marker: {
        size: colonies,
        color: microbes,
        symbol: "circle"
    
      },
    
    };
    
  //Create data array for bubble plot
    var bubbledata = [tracebubble];
    
  //Create layout for bubble plot
    var bubblelayout = {
      title: 'BellyBottom Microbe Diversity',
      showlegend: false,
      height: 800,
      width: 1000
    };
    
  //Plot the chart to a div tag with id "bubble"
    Plotly.newPlot('bubble', bubbledata, bubblelayout);

  //     Gauge chart

  //Create array for Wfreq and other
    var wfreq = [];
    var other = [];

  //Loop through first metadata for wfreq
    currentMetadata.forEach((data) => {

  //Iterate through each key and value
      Object.entries(data).forEach(([key, value]) => {
    
  //Use the key to determine which array to push the value to
        if (key === "wfreq") {
          wfreq.push(value);
        }
        else {
          other.push(value);
        };
      });
    });

    console.log(wfreq);

    //Get number from array for needle calculation
    var wash = wfreq[0];
    console.log(wash);

      
      
  
    
   
    
  // Use wfreq array to generate gauge plot

    //Create gauge chart trace

    var traceGauge = {
      type: 'pie',
      rotation: 90,
      values: [ 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180/10, 180],
      text: ['0','1','2','3','4','5','6','7','8','9'],
      direction: 'clockwise',
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['red','orange','yellow','tan','green','blue','purple','maroon','grey', 'cyan', 'white'],
        labels: ['0','1','2','3','4','5','6','7','8','9'],
        hoverinfo: 'label'
      }
    };

    

      
    //Create  needle and gauge

    var degrees = 97, radius = 0.9
    
    var radians = degrees * Math.PI / 180;
    var x = -1 * radius * Math.cos(radians) * wash;
    var y = radius * Math.sin(radians);
    
    //set up gauge layout
    
    var gaugeLayout = {
      shapes: [{
        type: 'line',
        x0: 0.5,
        y0: 0.5,
        x1: x,
        y1: y,
        line: {
          color: 'black',
          width: 3
        }
      }],
      title: 'Belly Button washing Frequency',
      xaxis: {visible: false, range: [-1, 1]},
      yaxis: {visible: false, range: [-1, 1]}
    };
    
    //Create dataGauge array
    var dataGauge = [traceGauge]

    //plot gauge chart
    
    Plotly.newPlot('gauge', dataGauge, gaugeLayout)
  });
};

//Intiate initial page
init();

