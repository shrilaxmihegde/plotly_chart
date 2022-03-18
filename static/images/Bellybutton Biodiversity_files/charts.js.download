function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var NumberSample = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var firsArry = NumberSample[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firsArry.otu_ids;
    var otuLabels = firsArry.otu_labels;
    var sampleValues = firsArry.sample_values;
 
     // 3. Create a variable that holds the washing frequency.
    
     var temp_metadata = data.metadata.filter(row => row.id == sample);

     var wfreq = temp_metadata[0].wfreq;

    // 7. Create the yticks for the bar chart.

    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last.
    var yticks = otuIds.slice(0,10).map(id => "OTU "+ id).reverse();
    console.log(yticks);
    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text : otuLabels.slice(0,10).reverse(),
      type: "bar",
      orientation:'h',
      

    };
        
   
    // 9. Create the layout for the bar chart. 
    var data = [trace];
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {t: 30, 1 : 150},
      
  };
 
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", data, barLayout);

// bubble chart deliverable-2 code.


 // 1. Create the trace for the bubble chart.
 var trace1 ={
  x: otuIds,
  y : sampleValues,
  text : otuLabels,
  mode : 'markers',
  marker : {
    size: sampleValues,
    color: otuIds,
    colorscale : "Earth" 
  }

};
console.log("within trace");

// 2. Create the layout for the bubble chart.
var data1 = [trace1];
var bubbleLayout = {
  title: "Bacteria Cultures Per Sample",
  showlegend: false,
  xaxis : {title : "OTU ID", automargin:true},
  yaxis: {automargin: true},
  height: 600,
  width: 1144,
  hovermode: "closest",
  
  font:{
    family:'Quicksand'
  },
  xaxis:{
    title: "<b>OTU ID</b>"
    
},
};

// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot( "bubble",data1,bubbleLayout ); 


// 4. Create the trace for the gauge chart.

var gaugeData = [{
  
		domain: { x: [0, 1], y: [0, 1] },
		value: wfreq,
		title: { text: "<b>Belly Button Washing Frequency </b><br> Scrubs Per Week"}, 
		type: "indicator",
		mode: "gauge+number",
    delta: { reference: 380 },
    gauge: {
      axis: { range: [null,10] ,
          tickmode:"array",
          tickvals: [0,2,4,6,8,10],
          ticktext: [0,2,4,6,8,10]          

      },
      bar : {color: "black"},
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange" },
        { range: [4,6], color: "yellow" },
        { range: [6,8], color: "yellowgreen" },
        { range: [8,10], color: "green" }
      ],
     
        thickness: 0.75,
    }
       
	}
     
];

// 5. Create the layout for the gauge chart.
//var  gaugeData =[trace];
var gaugeLayout = { 
autosize :true,
annotations : {
  xref :'paper',
  yref :'paper',
  x : 0.5,
  xanchor:'center',
  y:0,
  yanchor:'center',
  showrow: false
}

 
};

// 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot( 'gauge',gaugeData,gaugeLayout);
  
  });
     
}  
