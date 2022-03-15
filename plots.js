function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();


  

 function buildMetadata(sample) {
  console.log(" in function");
  
    d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    var kvpairs = Object.entries(resultArray[0]);
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    var results = kvpairs.forEach(function(pair) {
      PANEL.append("h6").text(pair[0] + ': ' + pair[1]);
    });
  
  });
}

function optionChanged(newSample) {
  console.log(" before calling build charts");
  buildMetadata(newSample);

}
  