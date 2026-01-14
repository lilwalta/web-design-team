const mentalHealthData = {
  "Alabama": { anxiety: 19.2, depression: 17.1, ptsd: 7.2, suicide: 15.9 },
  "Alaska": { anxiety: 21.4, depression: 18.5, ptsd: 9.1, suicide: 28.4 },
  "Arizona": { anxiety: 20.1, depression: 16.9, ptsd: 8.0, suicide: 18.2 },
  "Arkansas": { anxiety: 18.7, depression: 17.8, ptsd: 7.4, suicide: 20.3 },
  "California": { anxiety: 17.9, depression: 15.3, ptsd: 6.5, suicide: 10.5 },
  "Colorado": { anxiety: 22.3, depression: 19.1, ptsd: 8.9, suicide: 24.9 },
  "Connecticut": { anxiety: 16.8, depression: 14.2, ptsd: 5.8, suicide: 8.7 },
  "Delaware": { anxiety: 18.4, depression: 15.9, ptsd: 6.7, suicide: 12.1 },
  "Florida": { anxiety: 19.9, depression: 16.4, ptsd: 7.1, suicide: 14.1 },
  "Georgia": { anxiety: 18.6, depression: 15.8, ptsd: 6.9, suicide: 13.7 },
  "Hawaii": { anxiety: 17.2, depression: 14.7, ptsd: 6.0, suicide: 11.3 },
  "Idaho": { anxiety: 20.7, depression: 17.6, ptsd: 7.9, suicide: 23.1 },
  "Illinois": { anxiety: 18.1, depression: 15.2, ptsd: 6.4, suicide: 11.0 },
  "Indiana": { anxiety: 19.3, depression: 16.7, ptsd: 7.2, suicide: 16.4 },
  "Iowa": { anxiety: 17.8, depression: 15.1, ptsd: 6.3, suicide: 14.9 },
  "Kansas": { anxiety: 18.9, depression: 16.2, ptsd: 6.8, suicide: 18.0 },
  "Kentucky": { anxiety: 20.4, depression: 18.3, ptsd: 7.6, suicide: 19.7 },
  "Louisiana": { anxiety: 19.6, depression: 17.5, ptsd: 7.3, suicide: 17.2 },
  "Maine": { anxiety: 21.1, depression: 18.8, ptsd: 8.4, suicide: 20.6 },
  "Maryland": { anxiety: 17.4, depression: 14.9, ptsd: 6.1, suicide: 9.8 },
  "Massachusetts": { anxiety: 16.5, depression: 14.1, ptsd: 5.7, suicide: 8.9 },
  "Michigan": { anxiety: 19.2, depression: 16.6, ptsd: 7.1, suicide: 15.4 },
  "Minnesota": { anxiety: 18.0, depression: 15.5, ptsd: 6.6, suicide: 14.3 },
  "Mississippi": { anxiety: 19.8, depression: 17.9, ptsd: 7.5, suicide: 16.9 },
  "Missouri": { anxiety: 20.1, depression: 17.3, ptsd: 7.8, suicide: 19.5 },
  "Montana": { anxiety: 22.7, depression: 19.4, ptsd: 9.0, suicide: 26.7 },
  "Nebraska": { anxiety: 18.2, depression: 15.7, ptsd: 6.7, suicide: 14.7 },
  "Nevada": { anxiety: 21.0, depression: 18.2, ptsd: 8.1, suicide: 21.0 },
  "New Hampshire": { anxiety: 19.5, depression: 16.9, ptsd: 7.3, suicide: 18.1 },
  "New Jersey": { anxiety: 16.9, depression: 14.5, ptsd: 5.9, suicide: 8.3 },
  "New Mexico": { anxiety: 21.9, depression: 19.6, ptsd: 8.8, suicide: 27.3 },
  "New York": { anxiety: 17.1, depression: 14.8, ptsd: 6.0, suicide: 9.4 },
  "North Carolina": { anxiety: 19.0, depression: 16.5, ptsd: 7.0, suicide: 14.8 },
  "North Dakota": { anxiety: 18.6, depression: 15.9, ptsd: 6.9, suicide: 19.2 },
  "Ohio": { anxiety: 19.7, depression: 17.0, ptsd: 7.4, suicide: 16.2 },
  "Oklahoma": { anxiety: 20.8, depression: 18.4, ptsd: 7.9, suicide: 19.9 },
  "Oregon": { anxiety: 21.6, depression: 18.9, ptsd: 8.5, suicide: 22.1 },
  "Pennsylvania": { anxiety: 18.3, depression: 15.6, ptsd: 6.6, suicide: 13.6 },
  "Rhode Island": { anxiety: 17.0, depression: 14.6, ptsd: 5.8, suicide: 9.2 },
  "South Carolina": { anxiety: 19.4, depression: 16.8, ptsd: 7.2, suicide: 15.1 },
  "South Dakota": { anxiety: 18.9, depression: 16.3, ptsd: 7.0, suicide: 21.6 },
  "Tennessee": { anxiety: 20.2, depression: 17.7, ptsd: 7.5, suicide: 18.4 },
  "Texas": { anxiety: 18.5, depression: 15.9, ptsd: 6.8, suicide: 13.0 },
  "Utah": { anxiety: 22.5, depression: 19.3, ptsd: 8.7, suicide: 24.6 },
  "Vermont": { anxiety: 19.8, depression: 17.4, ptsd: 7.6, suicide: 19.1 },
  "Virginia": { anxiety: 18.2, depression: 15.7, ptsd: 6.7, suicide: 12.9 },
  "Washington": { anxiety: 21.3, depression: 18.6, ptsd: 8.2, suicide: 17.8 },
  "West Virginia": { anxiety: 20.9, depression: 18.5, ptsd: 7.9, suicide: 21.4 },
  "Wisconsin": { anxiety: 18.7, depression: 16.1, ptsd: 6.9, suicide: 14.6 },
  "Wyoming": { anxiety: 22.1, depression: 19.0, ptsd: 8.6, suicide: 25.8 }
};

const width = 960;
const height = 600;

const svg = d3.select("#usMentalHealthMap")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("width", "100%")
  .style("height", "auto");

const projection = d3.geoAlbersUsa()
  .scale(1200)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

let currentMetric = "anxiety";

const colorScale = d3.scaleSequential()
  .domain([15, 28])
  .interpolator(d3.interpolateReds);

const tooltip = d3.select("#mapTooltip");

const idToCode = {
  1:"AL",2:"AK",4:"AZ",5:"AR",6:"CA",8:"CO",9:"CT",10:"DE",12:"FL",
  13:"GA",15:"HI",16:"ID",17:"IL",18:"IN",19:"IA",20:"KS",21:"KY",
  22:"LA",23:"ME",24:"MD",25:"MA",26:"MI",27:"MN",28:"MS",29:"MO",
  30:"MT",31:"NE",32:"NV",33:"NH",34:"NJ",35:"NM",36:"NY",37:"NC",
  38:"ND",39:"OH",40:"OK",41:"OR",42:"PA",44:"RI",45:"SC",46:"SD",
  47:"TN",48:"TX",49:"UT",50:"VT",51:"VA",53:"WA",54:"WV",55:"WI",56:"WY"
};


d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(us => {
  const states = topojson.feature(us, us.objects.states).features;

  svg.selectAll("path")
    .data(states)
    .enter()
    .append("path")
    .attr("class", "state")
    .attr("d", path)
    .attr("fill", d => getColor(d))
.on("mousemove", (event, d) => {
  const code = idToCode[d.id];
  const data = mentalHealthData[code];
  if (!data) return;

  tooltip
    .style("opacity", 1)
    .style("left", `${event.pageX + 12}px`)
    .style("top", `${event.pageY - 28}px`)
    .html(`
      <strong>${data.name}</strong><br>
      Anxiety: ${data.anxiety}%<br>
      Depression: ${data.depression}%<br>
      PTSD: ${data.ptsd}%<br>
      Suicide: ${data.suicide}%
    `);
})
.on("mouseout", () => {
  tooltip.style("opacity", 0);
});
});


function getColor(d) {
  const code = idToCode[d.id];
  if (!mentalHealthData[code]) return "#1a3327";
  return colorScale(mentalHealthData[code][currentMetric]);
}


function updateMap() {
  svg.selectAll(".state")
    .transition()
    .duration(500)
    .attr("fill", d => getColor(d));
}

document.querySelectorAll(".stat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".stat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentMetric = btn.dataset.metric;
    updateMap();
  });
});
