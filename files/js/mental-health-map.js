const mentalHealthData = {
  AL:{name:"Alabama",anxiety:23,depression:20,ptsd:7,suicide:16},
  AK:{name:"Alaska",anxiety:26,depression:22,ptsd:9,suicide:22},
  AZ:{name:"Arizona",anxiety:21,depression:18,ptsd:6,suicide:15},
  AR:{name:"Arkansas",anxiety:24,depression:21,ptsd:7,suicide:18},
  CA:{name:"California",anxiety:22,depression:19,ptsd:7,suicide:14},
  CO:{name:"Colorado",anxiety:25,depression:22,ptsd:8,suicide:20},
  CT:{name:"Connecticut",anxiety:21,depression:18,ptsd:6,suicide:12},
  DE:{name:"Delaware",anxiety:22,depression:19,ptsd:6,suicide:14},
  FL:{name:"Florida",anxiety:23,depression:20,ptsd:7,suicide:16},
  GA:{name:"Georgia",anxiety:22,depression:19,ptsd:6,suicide:15},
  HI:{name:"Hawaii",anxiety:20,depression:17,ptsd:5,suicide:13},
  ID:{name:"Idaho",anxiety:24,depression:21,ptsd:7,suicide:19},
  IL:{name:"Illinois",anxiety:22,depression:19,ptsd:6,suicide:14},
  IN:{name:"Indiana",anxiety:23,depression:20,ptsd:7,suicide:17},
  IA:{name:"Iowa",anxiety:21,depression:18,ptsd:6,suicide:15},
  KS:{name:"Kansas",anxiety:22,depression:19,ptsd:6,suicide:16},
  KY:{name:"Kentucky",anxiety:24,depression:21,ptsd:7,suicide:18},
  LA:{name:"Louisiana",anxiety:25,depression:22,ptsd:8,suicide:19},
  ME:{name:"Maine",anxiety:23,depression:20,ptsd:7,suicide:17},
  MD:{name:"Maryland",anxiety:21,depression:18,ptsd:6,suicide:13},
  MA:{name:"Massachusetts",anxiety:22,depression:19,ptsd:6,suicide:12},
  MI:{name:"Michigan",anxiety:23,depression:20,ptsd:7,suicide:16},
  MN:{name:"Minnesota",anxiety:21,depression:18,ptsd:6,suicide:14},
  MS:{name:"Mississippi",anxiety:26,depression:23,ptsd:8,suicide:20},
  MO:{name:"Missouri",anxiety:23,depression:20,ptsd:7,suicide:17},
  MT:{name:"Montana",anxiety:25,depression:22,ptsd:8,suicide:21},
  NE:{name:"Nebraska",anxiety:21,depression:18,ptsd:6,suicide:15},
  NV:{name:"Nevada",anxiety:24,depression:21,ptsd:7,suicide:19},
  NH:{name:"New Hampshire",anxiety:20,depression:17,ptsd:5,suicide:13},
  NJ:{name:"New Jersey",anxiety:22,depression:19,ptsd:6,suicide:12},
  NM:{name:"New Mexico",anxiety:25,depression:22,ptsd:8,suicide:20},
  NY:{name:"New York",anxiety:24,depression:21,ptsd:8,suicide:13},
  NC:{name:"North Carolina",anxiety:22,depression:19,ptsd:6,suicide:15},
  ND:{name:"North Dakota",anxiety:21,depression:18,ptsd:6,suicide:16},
  OH:{name:"Ohio",anxiety:23,depression:20,ptsd:7,suicide:16},
  OK:{name:"Oklahoma",anxiety:24,depression:21,ptsd:7,suicide:18},
  OR:{name:"Oregon",anxiety:25,depression:22,ptsd:8,suicide:19},
  PA:{name:"Pennsylvania",anxiety:22,depression:19,ptsd:6,suicide:14},
  RI:{name:"Rhode Island",anxiety:21,depression:18,ptsd:6,suicide:13},
  SC:{name:"South Carolina",anxiety:23,depression:20,ptsd:7,suicide:17},
  SD:{name:"South Dakota",anxiety:22,depression:19,ptsd:6,suicide:16},
  TN:{name:"Tennessee",anxiety:24,depression:21,ptsd:7,suicide:18},
  TX:{name:"Texas",anxiety:20,depression:17,ptsd:6,suicide:15},
  UT:{name:"Utah",anxiety:21,depression:18,ptsd:6,suicide:14},
  VT:{name:"Vermont",anxiety:22,depression:19,ptsd:6,suicide:15},
  VA:{name:"Virginia",anxiety:21,depression:18,ptsd:6,suicide:14},
  WA:{name:"Washington",anxiety:25,depression:22,ptsd:8,suicide:15},
  WV:{name:"West Virginia",anxiety:26,depression:23,ptsd:8,suicide:20},
  WI:{name:"Wisconsin",anxiety:22,depression:19,ptsd:6,suicide:15},
  WY:{name:"Wyoming",anxiety:24,depression:21,ptsd:7,suicide:19}
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
    .on("mouseenter", (event, d) => showTooltip(event, d))
    .on("mousemove", moveTooltip)
    .on("mouseleave", hideTooltip);
});


function getColor(d) {
  const code = idToCode[d.id];
  if (!mentalHealthData[code]) return "#1a3327";
  return colorScale(mentalHealthData[code][currentMetric]);
}

function showTooltip(event, d) {
  const code = idToCode[d.id];
  const data = mentalHealthData[code];
  if (!data) return;

  tooltip
    .style("opacity", 1)
    .html(`
      <strong>${data.name}</strong><br>
      Anxiety: ${data.anxiety}%<br>
      Depression: ${data.depression}%<br>
      PTSD: ${data.ptsd}%<br>
      Suicide: ${data.suicide}%
    `);
}

function moveTooltip(event) {
  tooltip
    .style("left", event.pageX + 15 + "px")
    .style("top", event.pageY + 15 + "px");
}

function hideTooltip() {
  tooltip.style("opacity", 0);
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
