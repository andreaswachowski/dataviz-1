var chartdata = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];

//  the size of the overall svg element
var height = '100%',
    width = '100%',

//  the width of each bar and the offset between each bar
    barWidth = 40,
    barOffset = 20;


d3.select('#bar-chart').append('svg')
  .attr('viewBox', '0 0 ' + (barWidth+barOffset)*chartdata.length + ' 300')
  .attr('preserveAspectRatio', 'xMinYMin meet')
  .style('background', '#dff0d8')
  .selectAll('rect').data(chartdata)
  .enter().append('rect')
    .style({'fill': '#3c763d', 'stroke': '#d6e9c6', 'stroke-width': '5'})
    .attr('width', barWidth)
    .attr('height', function (data) {
        return data;
    })
    .attr('x', function (data, i) {
        return i * (barWidth + barOffset);
    })
    .attr('y', function (data) {
        return height - data;
    });
