// I started out with the bar chart example on
// http://vegibit.com/create-a-bar-chart-with-d3-javascript/
// https://gist.github.com/benjchristensen/2579599

// var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];
var chartdata = monthlyMeans.map(function(entry) {
    return entry.MAM;
});

//  The values here don't really matter because a) the original data values
//  are mapped via d3.scale to this box, and b) the SVG will be scaled
//  to 100% in it's surrounding <div>. Hence the size displayed on the screen
//  depends entirely on the size of the surrounding <div>.
var height = '300',
    width = '1000',
    svgViewBox = '0 0 ' + width + ' ' + height +'',
    xScale = d3.scale.ordinal()
                     .domain(d3.range(chartdata.length))
                     .rangeRoundBands([0, width], 0.2),
    yScale = d3.scale.linear()
                     .domain(d3.extent(chartdata))
                     .range([height,0]) // reverse orientation because SVG's origin is at the top, not bottom left
                     .nice();

d3.select('#bar-chart').append('svg')
   // Calculate width and height dynamically, based on the supplied data.
  .attr('viewBox', svgViewBox)
  .style('background', '#fff')
  .selectAll('rect').data(chartdata)
  .enter().append('rect')
    .style({'fill': '#3c763d', 'stroke': '#3c763d', 'stroke-width': '0'})
    .attr('width', xScale.rangeBand())
    .attr('height', function (data) {
        return Math.abs(yScale(data)-yScale(0));
    })
    .attr('x', function (data, i) {
        return xScale(i);
    })
    .attr('y', function (data) {
        // This is almost as shown on http://stackoverflow.com/questions/10127402/bar-chart-with-negative-values
        // except that we have to use Math.max instead of Math.min due to
        // the inverted yScale.
        return yScale(Math.max(0,data));
    });
