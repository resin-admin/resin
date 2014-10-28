$(document).ready(function(){
  Chart.defaults.global.responsive = true;
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
    ]
  };

  $('.chart').each(function(){
    var ctx = $(this).get(0).getContext("2d");
    var chart = new Chart(ctx).Bar(data, {});
  });

  $('.site-primary-nav .fa-question-circle, .site-overlay').on('click', function(){
    $('.site-overlay').toggleClass('active')
  });

  // jquery-autosize plugin
  $('textarea').autosize({
    'append': ''
  });   

  dropzoneStateToggle();
  sticky();
});

function sticky(){
  var target = $('.sticky');
  var targetY = $('.sticky').offset().top;
  $('.site-body').on('scroll', function(){
    var scrollY = $('.site-body').scrollTop();
    if(scrollY > targetY){
      target.addClass('is-active');
    }
    else{
      target.removeClass('is-active');
    }
  });
}

// http://stackoverflow.com/a/13542669/918060
function shadeRGBColor(color, percent) {
  //var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
  //return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

function dropzoneStateToggle(){
  $('body').on('click', '.dropzone', function(){
    var target = $(this);
    if(target.hasClass('uploading')){
    }
    else if(target.hasClass('hover')){
      target.removeClass('hover');
      target.addClass('uploading');
      target.find('.dropzone-message').html('Uploading...');
      var i = 0;
      var animateProgress = window.setInterval(function(){
        i++;
        target.find('progress').attr('value', i);
        if(i>=100){
          clearInterval(animateProgress);
          target.find('progress').addClass('striped');
          target.find('.dropzone-message').html('Processing...');
        }
      }, 20);
    }
    else{
      target.addClass('hover');
    }
  });
}
