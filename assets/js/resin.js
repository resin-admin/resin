var Chart
$(document).ready(function(){
  //Chart.defaults.global.responsive = true;
  var chartColor = $('.site-primary-nav').css('background-color');
  chartColor = shadeRGBColor(chartColor, 0.6)

  var data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        fillColor: chartColor,
        strokeColor: chartColor,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ],
    responsive: true
  };

  $('.chart').each(function(){
    var ctx = $(this).get(0).getContext("2d");
    var chart = new Chart(ctx).Bar(data, {});
  });

});

// http://stackoverflow.com/a/13542669/918060
function shadeRGBColor(color, percent) {
  var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
  return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}
