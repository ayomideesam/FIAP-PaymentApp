/*!

 =========================================================
 * Material Dashboard PRO - v2.0.2
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-pro
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

//  // console.log = function () {}; // Todo , make sure you remove this to use  // console.log on this script

let breakCards = true;

let searchVisible = 0;
let transparent = true;

let transparentDemo = true;
let fixedTop = false;

let mobile_menu_visible = 0,
  mobile_menu_initialized = false,
  toggle_initialized = false,
  bootstrap_nav_initialized = false;
let sidebar = $('.sidebar');

let seq = 0,
  delays = 80,
  durations = 500;
let seq2 = 0,
  delays2 = 80,
  durations2 = 500;

$(document).ready(() => {
  setTimeout(() => {
     // console.log('Welcome to Lekens world');

  const sidebar = $('.sidebar');
    let window_width = $(window).width();

    $('body').bootstrapMaterialDesign();

    md.initSidebarsCheck();

    window_width = $(window).width();

    // check if there is an image set for the sidebar's background
    md.checkSidebarImage();

  $('#minimizeSidebar').click( function(){
    let $btn = $(this);

  if (md.misc.sidebar_mini_active == true) {
    $('body').removeClass('sidebar-mini');
    md.misc.sidebar_mini_active = false;
  } else {
    $('body').addClass('sidebar-mini');
    md.misc.sidebar_mini_active = true;
  }

  // we simulate the window Resize so the charts will get updated in realtime.
  let simulateWindowResize = setInterval(function() {
    window.dispatchEvent(new Event('resize'));
}, 180);

  // we stop the simulation of Window Resize after the animations are completed
  setTimeout(function() {
    clearInterval(simulateWindowResize);
}, 1000);
});
    // Multilevel Dropdown menu

    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      var $el = $(this);
      var $parent = $(this).offsetParent(".dropdown-menu");
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');

      $(this).closest("a").toggleClass('open');

      $(this).parents('a.dropdown-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-menu .show').removeClass("show");
      });

      if (!$parent.parent().hasClass('navbar-nav')) {
        $el.next().css({
          "top": $el[0].offsetTop,
          "left": $parent.outerWidth() - 4
        });
      }

      return false;
    });


    //   Activate bootstrap-select
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker();
    }

    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

    // Activate Popovers
    $('[data-toggle="popover"]').popover();

    //Activate tags
    // we style the badges with our colors
    let tagClass = $('.tagsinput').data('color');

    if ($(".tagsinput").length != 0) {
      $('.tagsinput').tagsinput();
    }

    $('.bootstrap-tagsinput').addClass('' + tagClass + '-badge');

    //    Activate bootstrap-select
    $(".select").dropdown({
      "dropdownClass": "dropdown-menu",
      "optionClass": ""
    });

    $('.form-control').on("focus", function() {
      $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
      $(this).parent(".input-group").removeClass("input-group-focus");
    });


    if (breakCards == true) {
      // We break the cards headers if there is too much stress on them :-)
      $('[data-header-animation="true"]').each(() => {
        let $fix_button = $(this);
        let $card = $(this).parent('.card');

        $card.find('.fix-broken-card').click(() => {
           // console.log(this);
          let $header = $(this).parent().parent().siblings('.card-header, .card-header-image');

          $header.removeClass('hinge').addClass('fadeInDown');

          $card.attr('data-count', 0);

          setTimeout(() => {
            $header.removeClass('fadeInDown animate');
          }, 480);
        });

        $card.mouseenter(() => {
          let $this = $(this);
          let  hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
          $this.attr("data-count", hover_count);

          if (hover_count >= 20) {
            $(this).children('.card-header, .card-header-image').addClass('hinge animated');
          }
        });
      });
    }

    // remove class has-error for checkbox validation
    $('input[type="checkbox"][required="true"], input[type="radio"][required="true"]').on('click', () => {
      if ($(this).hasClass('error')) {
        $(this).closest('div').removeClass('has-error');
      }
    });


  }, 2000);
  /*(()  => {
    const isWindows = navigator.platform.indexOf('Win') > -1;

    setTimeout(() => {
       // console.log('Hello World');
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

        $('html').addClass('perfect-scrollbar-on');
        $('.main-panel').addClass(' ps-active-y ps-y ps-in-scrolling');
        $('.ps-scrollbar-y').css('height', '122px');
      } else {
        $('html').addClass('perfect-scrollbar-off');
      }
    }, 2000);
  })();*/
});

$(document).on('click', '.navbar-toggler', () => {
  let toggle = $(this);

   // console.log('click me');
  if (mobile_menu_visible == 1) {
    $('html').removeClass('nav-open');

    $('.close-layer').remove();
    setTimeout(() => {
      toggle.removeClass('toggled');
    }, 400);

    mobile_menu_visible = 0;
  } else {
    setTimeout(() => {
      toggle.addClass('toggled');
    }, 430);

    let layer = $('<div class="close-layer"></div>');

    if ($('body').find('.main-panel').length != 0) {
      layer.appendTo(".main-panel");

    } else if (($('body').hasClass('off-canvas-sidebar'))) {
      layer.appendTo(".wrapper-full-page");
    }

    setTimeout(() => {
      layer.addClass('visible');
    }, 100);

    layer.click(() => {
      $('html').removeClass('nav-open');
      mobile_menu_visible = 0;

      layer.removeClass('visible');

      setTimeout(() => {
        layer.remove();
        toggle.removeClass('toggled');

      }, 400);
    });

    $('html').addClass('nav-open');
    mobile_menu_visible = 1;

  }

});

// activate collapse right menu when the windows is resized
$(window).resize(() => {
   // console.log('Resizer');
  md.initSidebarsCheck();

  // reset the seq for charts drawing animations
  seq = seq2 = 0;

  setTimeout(() => {
    md.initDashboardPageCharts();
  }, 500);
});

let md = {
  misc: {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
  },

  checkSidebarImage: () => {
     // console.log('Side bar image setter');
    const sidebar = $('.sidebar');
    let image_src = sidebar.data('image');

    if (image_src !== undefined) {
      let sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>';
      sidebar.append(sidebar_container);
    }
  },

  showNotification: (from, align) => {
    let type = ['', 'info', 'danger', 'success', 'warning', 'rose', 'primary'];

    let color = Math.floor((Math.random() * 6) + 1);

    $.notify({
      icon: "add_alert",
      message: "Welcome to <b>Material Dashboard Pro</b> - a beautiful admin panel for every web developer."

    }, {
      type: type[color],
      timer: 3000,
      placement: {
        from: from,
        align: align
      }
    });
  },

  initDocumentationCharts: function() {
    if ($('#dailySalesChart').length != 0 && $('#websiteViewsChart').length != 0) {
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [12, 17, 7, 17, 23, 18, 38]
        ]
      };

      optionsDailySalesChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      };

      let dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      let animationHeaderChart = new Chartist.Line('#websiteViewsChart', dataDailySalesChart, optionsDailySalesChart);
    }
  },


  initFormExtendedDatetimepickers: function() {
    $('.datetimepicker').datetimepicker({
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });

    $('.datepicker').datetimepicker({
      format: 'MM/DD/YYYY',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });

    $('.timepicker').datetimepicker({
      //          format: 'H:mm',    // use this format if you want the 24hours timepicker
      format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
  },


  initSliders: () => {
    // Sliders for demo purpose
    let slider = document.getElementById('sliderRegular');

    noUiSlider.create(slider, {
      start: 40,
      connect: [true, false],
      range: {
        min: 0,
        max: 100
      }
    });

    let slider2 = document.getElementById('sliderDouble');

    noUiSlider.create(slider2, {
      start: [20, 60],
      connect: true,
      range: {
        min: 0,
        max: 100
      }
    });
  },

  initSidebarsCheck: () => {
     // console.log('Side bar checker');
    if ($(window).width() <= 991) {
      if (sidebar.length != 0) {
        md.initRightMenu();
      }
    }
  },

  initDashboardPageCharts: () => {
 // console.log('Dashboard Chart');
    if ($('#dailySalesChart').length != 0 || $('#completedTasksChart').length != 0 || $('#websiteViewsChart').length != 0) {
      /* ----------==========     Daily Sales Chart initialization    ==========---------- */

      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [12, 17, 7, 17, 23, 18, 38]
        ]
      };

      optionsDailySalesChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      }

      let dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      md.startAnimationForLineChart(dailySalesChart);



      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      dataCompletedTasksChart = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
          [230, 750, 450, 300, 280, 240, 200, 190]
        ]
      };

      optionsCompletedTasksChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      let completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      md.startAnimationForLineChart(completedTasksChart);


      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      let dataWebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      let optionsWebsiteViewsChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      };
      let responsiveOptions = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }]
      ];
      let websiteViewsChart = Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      md.startAnimationForBarChart(websiteViewsChart);
    }
  },

  initMinimizeSidebar: function() {

    $('#minimizeSidebar').click(() => {
      let $btn = $(this);

      if (md.misc.sidebar_mini_active == true) {
        $('body').removeClass('sidebar-mini');
        md.misc.sidebar_mini_active = false;
      } else {
        $('body').addClass('sidebar-mini');
        md.misc.sidebar_mini_active = true;
      }

      // we simulate the window Resize so the charts will get updated in realtime.
      let simulateWindowResize = setInterval(() => {
        window.dispatchEvent(new Event('resize'));
      }, 180);

      // we stop the simulation of Window Resize after the animations are completed
      setTimeout(() => {
        clearInterval(simulateWindowResize);
      }, 1000);
    });
  },

  checkScrollForTransparentNavbar: debounce(function() {
    if ($(document).scrollTop() > 260) {
      if (transparent) {
        transparent = false;
        $('.navbar-color-on-scroll').removeClass('navbar-transparent');
      }
    } else {
      if (!transparent) {
        transparent = true;
        $('.navbar-color-on-scroll').addClass('navbar-transparent');
      }
    }
  }, 17),


  initRightMenu: debounce(() => {
    let $sidebar_wrapper = $('.sidebar-wrapper');
     // console.log('Side Wrapper');
    if (!mobile_menu_initialized) {
      let $navbar = $('nav').find('.navbar-collapse').children('.navbar-nav');

     let mobile_menu_content = '';

    let  nav_content = $navbar.html();

      nav_content = '<ul class="nav navbar-nav nav-mobile-menu">' + nav_content + '</ul>';

     let navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

     let $sidebar_nav = $sidebar_wrapper.find(' > .nav');

      // insert the navbar form before the sidebar list
     let $nav_content = $(nav_content);
      let $navbar_form = $(navbar_form);
      $nav_content.insertBefore($sidebar_nav);
      $navbar_form.insertBefore($nav_content);

      $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click((event) => {
        event.stopPropagation();
      });

      // simulate resize so all the charts/maps will be redrawn
      window.dispatchEvent(new Event('resize'));

      mobile_menu_initialized = true;
    } else {
      if ($(window).width() > 991) {
        // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
        $sidebar_wrapper.find('.navbar-form').remove();
        $sidebar_wrapper.find('.nav-mobile-menu').remove();

        // mobile_menu_initialized = false;
      }
    }
  }, 1000),

  startAnimationForLineChart: (chart) => {

    chart.on('draw', (data) => {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  },
  startAnimationForBarChart: (chart) => {

    chart.on('draw', (data) => {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  },


  initFullCalendar: () => {
    let $calendar = $('#fullCalendar');

    let today = new Date();
    let y = today.getFullYear();
    let m = today.getMonth();
    let d = today.getDate();

    $calendar.fullCalendar({
      viewRender: (view, element) =>  {
        // We make sure that we activate the perfect scrollbar when the view isn't on Month
        if (view.name != 'month') {
          $(element).find('.fc-scroller').perfectScrollbar();
        }
      },
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'prev,next,today'
      },
      defaultDate: today,
      selectable: true,
      selectHelper: true,
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
          // other view-specific options here
        },
        week: {
          titleFormat: " MMMM D YYYY"
        },
        day: {
          titleFormat: 'D MMM, YYYY'
        }
      },

      select: function(start, end) {

        // on select we show the Sweet Alert modal with an input
        swal({
            title: 'Create an Event',
            html: '<div class="form-group">' +
              '<input class="form-control" placeholder="Event Title" id="input-field">' +
              '</div>',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-success',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false
          }).then(function(result) {

            var eventData;
            event_title = $('#input-field').val();

            if (event_title) {
              eventData = {
                title: event_title,
                start: start,
                end: end
              };
              $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
            }

            $calendar.fullCalendar('unselect');

          })
          .catch(swal.noop);
      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events


      // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
      events: [{
          title: 'All Day Event',
          start: new Date(y, m, 1),
          className: 'event-default'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d - 4, 6, 0),
          allDay: false,
          className: 'event-rose'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: new Date(y, m, d + 3, 6, 0),
          allDay: false,
          className: 'event-rose'
        },
        {
          title: 'Meeting',
          start: new Date(y, m, d - 1, 10, 30),
          allDay: false,
          className: 'event-green'
        },
        {
          title: 'Lunch',
          start: new Date(y, m, d + 7, 12, 0),
          end: new Date(y, m, d + 7, 14, 0),
          allDay: false,
          className: 'event-red'
        },
        {
          title: 'Md-pro Launch',
          start: new Date(y, m, d - 2, 12, 0),
          allDay: true,
          className: 'event-azure'
        },
        {
          title: 'Birthday Party',
          start: new Date(y, m, d + 1, 19, 0),
          end: new Date(y, m, d + 1, 22, 30),
          allDay: false,
          className: 'event-azure'
        },
        {
          title: 'Click for Creative Tim',
          start: new Date(y, m, 21),
          end: new Date(y, m, 22),
          url: 'http://www.creative-tim.com/',
          className: 'event-orange'
        },
        {
          title: 'Click for Google',
          start: new Date(y, m, 21),
          end: new Date(y, m, 22),
          url: 'http://www.creative-tim.com/',
          className: 'event-orange'
        }
      ]
    });
  },

  initVectorMap: function() {
    var mapData = {
      "AU": 760,
      "BR": 550,
      "CA": 120,
      "DE": 1300,
      "FR": 540,
      "GB": 690,
      "GE": 200,
      "IN": 200,
      "RO": 600,
      "RU": 300,
      "US": 2920,
    };

    $('#worldMap').vectorMap({
      map: 'world_mill_en',
      backgroundColor: "transparent",
      zoomOnScroll: false,
      regionStyle: {
        initial: {
          fill: '#e4e4e4',
          "fill-opacity": 0.9,
          stroke: 'none',
          "stroke-width": 0,
          "stroke-opacity": 0
        }
      },

      series: {
        regions: [{
          values: mapData,
          scale: ["#AAAAAA", "#444444"],
          normalizeFunction: 'polynomial'
        }]
      },
    });
  }
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
  let timeout;
   // console.log('Welcome to debounce');
  return () => {
    let context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};





const sidebar_img_container = sidebar.find('.sidebar-background');

const full_page = $('.full-page');

const sidebar_responsive = $('body > .navbar-collapse');

const window_width = $(window).width();
let full_page_background;

const fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
  if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
    $('.fixed-plugin .dropdown').addClass('open');
  }

}

$('.fixed-plugin a').click((event) => {
  // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
  if ($(this).hasClass('switch-trigger')) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true;
    }
  }
});

$('.fixed-plugin .active-color span').click(() => {
  full_page_background = $('.full-page-background');

  $(this).siblings().removeClass('active');
  $(this).addClass('active');

  const new_color = $(this).data('color');

  if (sidebar.length !== 0) {
    sidebar.attr('data-color', new_color);
  }

  if (full_page.length !== 0) {
    full_page.attr('filter-color', new_color);
  }

  if (sidebar_responsive.length !== 0) {
    sidebar_responsive.attr('data-color', new_color);
  }
});

$('.fixed-plugin .background-color .badge').click(() =>  {
  $(this).siblings().removeClass('active');
  $(this).addClass('active');

  const new_color = $(this).data('background-color');

  if (sidebar.length != 0) {
    sidebar.attr('data-background-color', new_color);
  }
});

$('.fixed-plugin .img-holder').click(() => {
  full_page_background = $('.full-page-background');

  $(this).parent('li').siblings().removeClass('active');
  $(this).parent('li').addClass('active');


  const new_image = $(this).find("img").attr('src');

  if (sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
    sidebar_img_container.fadeOut('fast', () => {
      sidebar_img_container.css('background-image', 'url("' + new_image + '")');
      sidebar_img_container.fadeIn('fast');
    });
  }

  if (full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
    const new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

    full_page_background.fadeOut('fast', () => {
      full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
      full_page_background.fadeIn('fast');
    });
  }

  if ($('.switch-sidebar-image input:checked').length == 0) {
    const new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
    const new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

    sidebar_img_container.css('background-image', 'url("' + new_image + '")');
    full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
  }

  if (sidebar_responsive.length != 0) {
    sidebar_responsive.css('background-image', 'url("' + new_image + '")');
  }
});

$('.switch-sidebar-image input').change(() =>{
  full_page_background = $('.full-page-background');

  const input = $(this);

  if (input.is(':checked')) {
    if (sidebar_img_container.length != 0) {
      sidebar_img_container.fadeIn('fast');
      sidebar.attr('data-image', '#');
    }

    if (full_page_background.length != 0) {
      full_page_background.fadeIn('fast');
      full_page.attr('data-image', '#');
    }

    const background_image = true;
  } else {
    if (sidebar_img_container.length != 0) {
      sidebar.removeAttr('data-image');
      sidebar_img_container.fadeOut('fast');
    }

    if (full_page_background.length != 0) {
      full_page.removeAttr('data-image');
      full_page_background.fadeOut('fast');
    }

    const background_image = false;
  }
});

$('.switch-sidebar-mini input').change(() => {
  const body = $('body');

  const input = $(this);

  if (md.misc.sidebar_mini_active == true) {
    $('body').removeClass('sidebar-mini');
    md.misc.sidebar_mini_active = false;

    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

  } else {

    $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

    setTimeout(() => {
      $('body').addClass('sidebar-mini');

      md.misc.sidebar_mini_active = true;
    }, 300);
  }

  // we simulate the window Resize so the charts will get updated in realtime.
  const simulateWindowResize = setInterval(() => {
    window.dispatchEvent(new Event('resize'));
  }, 180);

  // we stop the simulation of Window Resize after the animations are completed
  setTimeout(() => {
    clearInterval(simulateWindowResize);
  }, 1000);

});
