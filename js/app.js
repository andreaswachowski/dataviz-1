// I started out with the bar chart example on
// http://vegibit.com/create-a-bar-chart-with-d3-javascript/
// https://gist.github.com/benjchristensen/2579599

// var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];
var chartdata = monthlyMeans.map(function(entry) {
    return entry.MAM;
});

console.log(chartdata);

//  The size of the chart is determined by the size of the surrounding
//  container (which can easily be adapted using CSS).
var height = '100%',
    width = '100%',
//  The width of each bar and the offset between each bar, in the units of
//  the processed data. In other words, these settings determine the
//  overall proportions. For example, using a barWidth of "20" will render
//  data with a value of "20" as a square.
    barWidth = 10,
    barOffset = 5;

var maxNegativeValue =  Math.min.apply(null,chartdata);
var maxPositiveValue =  Math.max.apply(null,chartdata);
console.log(maxNegativeValue);
console.log(maxPositiveValue);
var maxHeight = maxPositiveValue - maxNegativeValue;
console.log(maxHeight);

d3.select('#bar-chart').append('svg')
   // Calculate width and height dynamically, based on the supplied data.
  .attr('viewBox', '0 0 ' + (barWidth+barOffset)*chartdata.length + ' ' + maxHeight)
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .style('background', '#fff')
  .selectAll('rect').data(chartdata)
  .enter().append('rect')
    .style({'fill': '#3c763d', 'stroke': '#3c763d', 'stroke-width': '0'})
    .attr('width', barWidth)
    .attr('height', function (data) {
        return Math.abs(data);
    })
    .attr('x', function (data, i) {
        return i * (barWidth + barOffset);
    })
    .attr('y', function (data) {
        return data > 0 ? maxPositiveValue-data : maxPositiveValue;
    });
