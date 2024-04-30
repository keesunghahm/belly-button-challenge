// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let samplemetadata = data.metadata
            

    // Filter the metadata for the object with the desired sample number
    let newArray = samplemetadata.filter(number => number.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let selector = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
selector.html("")

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(newArray).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);

      selector
      .append("h6")
      .text(`${key.toUpperCase()}: ${value}`)


    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples

    // Filter the samples for the object with the desired sample number
    let newArray = samples.filter(number => number.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
otu_ids=newArray.otu_ids
otu_labels=newArray.otu_labels
sample_values=newArray.sample_values



    // Build a Bubble Chart
    var bubbledata = [{
      x: otu_ids,
      y: sample_values,
      text:otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    }];
    

    
    var bubblelayout = {
      title: 'Bacteria Cultures per Sample',
      showlegend: false,
   
    };
    
   
    

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbledata, bubblelayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var bardata = [{
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).map(otu=>`OTU${otu}`).reverse(),
      text:otu_labels.slice(0,10).reverse(),
      orientation: 'h',
      
      type: 'bar'
    }];
    

    
    var barlayout = {
      title: 'Top 10 Bacteria Cultures Found',

    };
    

    

    // Render the Bar Chart
    Plotly.newPlot('bar', bardata, barlayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    
    let sampleNames = data.names
            
    

    // Use d3 to select the dropdown with id of `#selDataset`
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach((sample) => {
      selector
          .append("option")
          .text(sample)
          .property("value", sample);
  });

    // Get the first sample from the list
let first_name=sampleNames[0]

    // Build charts and metadata panel with the first sample
    buildCharts(first_name)
    buildMetadata(first_name)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample)
  buildMetadata(newSample)
}

// Initialize the dashboard
init();
