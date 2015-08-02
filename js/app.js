// I started out with the bar chart example on
// http://vegibit.com/create-a-bar-chart-with-d3-javascript/
// https://gist.github.com/benjchristensen/2579599
//
// For the axis, I also looked at
// http://stackoverflow.com/questions/18853873/d3-js-calculate-x-axis-time-scale-for-bar-graph
// which refers to http://jsfiddle.net/jcollado/N8tuR/

// Margins are defined as per mbostock's Margin Convention, see
// http://bl.ocks.org/mbostock/3019563
var margin = { top: 30, right: 30, bottom: 30, left: 30},

//  The values here don't really matter because a) the original data values
//  are mapped via d3.scale to this box, and b) the SVG will be scaled
//  to 100% in it's surrounding <div>. Hence the size displayed on the screen
//  depends entirely on the size of the surrounding <div>.
    heightWithMargin = 300,
    widthWithMargin = 1000,
    height = 300 - margin.top - margin.bottom,
    width = 1000 - margin.left - margin.right,
    // parse the time with d3 instead of creating Date objects for browser
    // independency, see http://bl.ocks.org/jebeck/9671241
    timeFormat = d3.time.format("%Y-%m-%d"),
    yearAsDate = function(yearNumber) {
        // Because we only have the year, we arbitrarily choose the middle of the year.
        return timeFormat.parse(yearNumber+'-07-01');
    },
    x = d3.time.scale()
                    .domain(d3.extent(monthlyMeans.map(function(d) {
                        return yearAsDate(d.Year);
                    })))
                    .range([0, width]),
    y = d3.scale.linear()
                     .domain(d3.extent(monthlyMeans.map(function(d) {
                         return d.MAM;
                     })))
                     .range([height,0]) // reverse orientation because SVG's origin is at the top, not bottom left
                     .nice();

// Create SVG
var svg = d3.select('#bar-chart')
            .append('svg')
            // Calculate width and height dynamically, based on the supplied data.
            .attr('viewBox', '0 0 ' + widthWithMargin + ' ' + heightWithMargin +'')
            .attr('width', widthWithMargin)
            .attr('height', heightWithMargin)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var barPadding=2;

function barWidth() {
    return width/monthlyMeans.length-barPadding; // with time scale
}

// Add data
svg.append('g')
   .style('background', '#fff')
   .selectAll('rect').data(monthlyMeans, function(d) { return d.Year; } )
   .enter()
   .append('rect')
   .style({'fill': '#3c763d', 'stroke': '#3c763d', 'stroke-width': '0'})
    .attr('width', barWidth())
    .attr('height', function (d) {
        return Math.abs(y(d.MAM)-y(0));
    })
    .attr('x', function (d) {
        return x(yearAsDate(d.Year));
    })
    .attr('y', function (d) {
        // This is almost as shown on http://stackoverflow.com/questions/10127402/bar-chart-with-negative-values
        // except that we have to use Math.max instead of Math.min due to
        // the inverted y.
        return y(Math.max(0,d.MAM));
    });

// Add axes
var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom")
              .ticks(22);

var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left");

svg.append('g')
   .attr('class', 'axis')
   .attr('transform', 'translate(0,' + height + ')')
   .call(xAxis);

svg.append('g')
   .attr('class', 'axis')
   .call(yAxis);
