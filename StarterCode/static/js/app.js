//Read json file using d3
d3.json("data/samples.json").then(function(data) {
    console.log(data);

    Object.entries(data).forEach(([key, value]) => 
        console.log(key, value));
            
});    
