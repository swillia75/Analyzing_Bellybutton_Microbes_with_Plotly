//Use the D3 library to read in samples.json.
d3.json("samples.json").then(data) => {
    console.log(data);
    var bbData = [data]
});

//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function init(){
    data = [{
        x:[],
        y:[]}];

    Plotly.newplot("bar", data)
};

d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly(){

    var dropdown = d3.select("#selDataset");

    var dataset = dropdown.property("value");

    var x = [];
    var y = [];

    switch (dataset) {
        case "name":
            x = [];
            y = [];
            break;
    }

    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
};

init();


///Use sample_values as the values for the bar chart.


//Use otu_ids as the labels for the bar chart.


//Use otu_labels as the hovertext for the chart.




//Create a bubble chart that displays each sample.



//Use otu_ids for the x values.


//Use sample_values for the y values.


//Use sample_values for the marker size.


//Use otu_ids for the marker colors.


//Use otu_labels for the text values.





///Display the sample metadata, i.e., an individual's demographic information.


//Display each key-value pair from the metadata JSON object somewhere on the page.




//Update all of the plots any time that a new sample is selected.

//Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below: