'use strict';
var wH = window.innerHeight ? window.innerHeight : $(window).height(),
    wW = window.innerWidth ? window.innerWidth : $(window).width();
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function resizeBanner(){
  // Adjust Banner height to substract address bar height
  if($('.banner').length){
    var rootElement = document.querySelector('.banner')
    var viewPortH = rootElement.getBoundingClientRect().height;
    console.log('viewPortH: ' + viewPortH);
    var windowH = window.innerHeight;
    console.log('windowH: ' + windowH);
    var browserUiBarsH = viewPortH - windowH;
    console.log('browserUiBarsH: ' + browserUiBarsH);
    if(browserUiBarsH > 0){
      rootElement.style.height = windowH + 'px';
    }
  }
}

function toggleFocus(e){
  // console.log(e.type)
  if( e.type == 'focus' ){ 
    $('.icon-search--inline svg').css('visibility', 'hidden');
    if(wW > 1023){
      $('.product__search').addClass('focused');
      $('.banner__image img').addClass('blurred');
    }
  }
  else{
    setTimeout(function(e) {
      $('.icon-search--inline svg').css('visibility', 'visible');
      if(wW > 1023){
        $('.product__search').removeClass('focused');
        $('.banner__image img').removeClass('blurred');
      }
    }, 200);
      
  }
}

function toggleSelect(e){
  // console.log(e.type)
  if( e.type == 'focus' ){ 
      if(wW > 1024){
        $('.select2-dropdown').hide();
        $('.select2-dropdown').removeClass('visible');
        $('.service__select').addClass('focused');
        $('.banner__image img').addClass('blurred');
        window.scrollTo(0,1);

        setTimeout(function(e) {
          window.scrollTo(0,0);
          $('.select2-dropdown').removeClass('select2-dropdown--above');
          $('.select2-dropdown').addClass('select2-dropdown--below');
          $('.select2-dropdown').show();
          $('.select2-dropdown').addClass('visible');
        }, 500);
      }
  } else if( e.type == 'blur' ){
    if(wW > 1024){
      $('.service__select').removeClass('focused');
      $('.banner__image img').removeClass('blurred');
      $('.select2-dropdown').removeClass('visible');
      $('.select2-dropdown').hide();
    }
  } else{
    if(wW > 1024){
      $('.service__select').removeClass('focused');
      $('.banner__image img').removeClass('blurred');
      $('.select2-dropdown').removeClass('visible');
      $('.select2-dropdown').hide();
    }
  }
}

function coverImage(image){
  var _banner = {

    init: function() {
      $('.banner__image img').each(function() {
        _banner.calculate( $(this) );
      });
    },

    calculate : function(image) {

      var wW = $(window).width();
      var wH = $(window).height();
      var imgObj = image;
      var iW = (wW < 641) ? 640 : imgObj.attr('width')
      var iH = (wW < 641) ? 964 : imgObj.attr('height')

      imgObj.width(0).height(0);

      var imgContainer = $('.banner');
      // var imgContainer = image.parent();
      var cW = imgContainer.width(); //width of container or browser
      var cH = imgContainer.height(); //height of container or browser

      // console.log(iW,iH,cW,cH);

      if ( cH > 1 ) {
          var cP = cW/cH; //ratio of container or browser
          var iP = iW/iH; //ratio of image

          if ( iP > cP ) { //if image ratio is more than container ratio (if image width is more than container width)
              iH = cH; //set image height from container height
              iW = cH * iP; //set image width using container height and image ratio
              imgObj.css({
                  'margin-top': 0,
                  'margin-left': Math.ceil((cW-iW)/2),
                  'width': Math.ceil(iW),
                  'height': Math.ceil(iH)
              }); //center the image and set dimensions
          } else { //if image ratio is less than container ratio (if image height is more than container height)
              iW = cW; //set image width from container width
              iH = cW / iP; //set image height from container width and ratio
              imgObj.css({
                  'margin-bottom': Math.ceil((cH-iH)/2),
                  'margin-left': 0,
                  'width': Math.ceil(iW),
                  'height': Math.ceil(iH)
              }); //center the image and set dimensions
          }
      } else {
          imgObj.css({
              'margin-bottom': 0,
              'margin-left': 0,
              'width': 'auto',
              'height': 'auto'
          });
      }

      if(wW < 769){
        $('.banner, .banner__image').css('height', wH);
      }
    }
  }
  _banner.init()
}

function loopCards(){
  var loopInterval = '';
  var _loopCardInterval = {
    init: function(){
      loopInterval = 
        setInterval(function() {
        var activeCard = $('.icon__select li.active');
        var activeCardTarget = $("#" + activeCard.attr('data-target'));
        // console.log(activeCardTarget);

        var nextActive = activeCard.next();
        var nextActiveTarget = $("#" + nextActive.attr('data-target'));

        if(activeCard.hasClass('active')){
          // If last card is active, loop back to first card
          if($('.icon__select li:last').hasClass('active')){
            //console.log('last card');
            activeCard.removeClass('active');
            activeCardTarget.removeClass('active');

            activeCard = $('.icon__select li').first();
            activeCardTarget = $('.icon__selection-cards li').first();

            //console.log("activeCardTarget: " + activeCardTarget);

            activeCard.addClass('active');
            activeCardTarget.addClass('active');

            nextActive = activeCard.next();
            nextActiveTarget = activeCardTarget.next();
          } else{
            //console.log('activeCard');
            activeCard.removeClass('active');
            activeCardTarget.removeClass('active');
            nextActive.addClass('active');
            nextActiveTarget.addClass('active');
          }
        } 
      }, 7000);
    },
    pause: function(){
      clearInterval(loopInterval);
    }
  }
  _loopCardInterval.init();

  // Pause autoplay on section hover
  // Resume autoplay when hovered out
  $('.icon__selection').hover(
    function(){
      _loopCardInterval.pause();
    },
    function(){
      _loopCardInterval.init();
    }
  );
}

function dropdownSelected(){
  var selectedVal = $('.dropdown__select').find(":selected").val();
  console.log('selectedVal: '+selectedVal);
  $('.dropdown__selected-item').each(function(){
    var checker = $(this).is('[data-actions~="'+selectedVal+'"]');
    if (checker){
      $(this).show();
    } else{
      $(this).hide();
    }
  });
}

$(document).ready(function(){

  resizeBanner();
  //coverImage();
  loopCards();

  $(window).on('resize', function(){
    if(wW > 768){
      //coverImage();
    }
  });

  // Menu hover behavior
  // $('.nav__level--1 .dropdown').hover(
  //   function(){
  //     $('.nav--level-2 .dropdown__content').show();
  //   }, 
  //   function(){
  //     $('.nav--level-2 .dropdown__content').show();
  //   }
  // );
  // Menu hover behavior
  // $('.nav__level--2 .dropdown').hover(
  //   function(){
  //     $('.nav__level--2 .dropdown__content').show();
  //   }, 
  //   function(){
  //     $('.nav--level-2 .dropdown__content').show();
  //   }
  // );

  // Menu hover behavior
  // 3rd level
  $('.nav--level-2 .menu__blocks-container').hover(
    function(){
    //   $('.nav--level-2 li .dropdown__button').css({'border-bottom': '4px solid #FFF',
    // 'padding-bottom': '6px'});
      $(this).parent().parent().find('.dropdown__button').css({'border-bottom': '4px solid #FFF',
    'padding-bottom': '2px'});
    }, 
    function(){
    //   $('.nav--level-2 li .dropdown__button').css({'border-bottom': 'none',
    // 'padding-bottom': '10px'});
      $(this).parent().parent().find('.dropdown__button').css({'border-bottom': 'none',
    'padding-bottom': '6px'});
    }
  );
  // 2nd level
  $('.nav--level-2 .dropdown__button').hover(
    function(){
      $(this).css({'border-bottom': '4px solid #FFF',
    'padding-bottom': '2px'});
    }, 
    function(){
      $(this).css({'border-bottom': 'none',
    'padding-bottom': '6px'});
    }
  );

  // Search
  $('.toggle-dropdown a').click(function(){
    $(this).parent().toggleClass('active');
    $(this).parent().siblings('.toggle-dropdown').removeClass('active');
    $(this).parent().siblings('.toggle-dropdown').find('.dropdown__content').hide();
    $(this).siblings('.dropdown__content').toggle();
  });
  $('#searchSite, #searchSiteMobile').on('click', function(){
    $('.toggle-dropdown .dropdown__content').show();
  });

  // Hide search if hovered other dropdown
  $('.dropdown:not(.toggle-dropdown)').hover(function () {
    var expanding = $(this);
    var timer = window.setTimeout(function () {
        expanding.data('timerid', null);

    $('.toggle-dropdown').removeClass('active');
    $('.toggle-dropdown .dropdown__content').hide();

    }, 300);
    //store ID of newly created timer in DOM object
    expanding.data('timerid', timer);
  }, function () {
    var timerid = $(this).data('timerid');
    if (timerid != null) {
        //mouse out, didn't timeout. Kill previously started timer
        window.clearTimeout(timerid);
    }
  });

  // Hide search when clicked outside search container
  $(document).click(function (e) {
    if ($(e.target).parents(".dropdown").length === 0) {
       $(".toggle-dropdown .dropdown__content").hide();
      $('.toggle-dropdown').removeClass('active');
    }
  });

  // Disable Google autocomplete
  $('#searchSite').on('focus', function(){
    $(this).attr('autocomplete', 'none');
  });

  // For mobile only
  if(wW < 769 && $('.swiper-container').length){

    // Convert cards to swiper on mobile
    $('.swiper-container').removeClass('flex--third');
    $('.swiper-container ul').addClass('swiper-wrapper');
    $('.swiper-wrapper li').addClass('swiper-slide');
      var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 0
      });
    $('.swiper-container').on('load', function(){
      //console.log('load swiper');
    });
  }

  // Toggle accordion
  // $('.accordion').on('click', function(e) {
  //   e.preventDefault();
  //   if ($(this).parent().parent().hasClass('accordion-container--expanded')){
      
  //   } else {
  //     $(this)
  //       .next('.accordion__content')
  //       .slideToggle();
  //     $(this).toggleClass('is-expanded');
  //   }
  // });

  // Toggle accordion
  $('.accordion.is-expanded').next('.accordion__content').slideToggle('show');

  // Save accordions
  if($('#saveLinks').length){
    $('#saveLinks').addClass('link-list');
  }

  // Online Banking accordions
  if($('#personalBankingProducts').length){
    $('#personalBankingProducts').addClass('link-list');
  }

  // Link List accordions
  // use this class to replicate Personal Banking product links section
  if($('.link-list').length){
    if(wW > 767){
     $('.link-list .accordion').next('.accordion__content').show();
    } else{
     $('.link-list .accordion').addClass('has-caret');
    }
    $('.link-list .accordion-container--expanded').addClass('singleview');
  }

  // Footer accordions
  $('.footer__links').addClass('singleview');


  // Toggle Accordion
  $('.accordion').on('click', function(e) {
    e.preventDefault();
    var targetAccordion = $(this);
    var isSingleView = $(this).parent().parent('.accordion-container, .accordion-container--expanded').hasClass('singleview');
    var isFooterLink = $(this).parent().parent().hasClass('footer__links');
    var isSaveLink = $(this).closest('.section__content').is('#saveLinks');
    var isOnlineBanking = $(this).closest('.section__content').is('#personalBankingProducts');

    if(isSingleView){
      console.log('isSingleView');
      var toggleSingleView = function(){
        $(targetAccordion).parent().siblings().find('.accordion').removeClass('is-expanded').next('.accordion__content').slideUp();
        if($(targetAccordion).hasClass('is-expanded')){
          $(targetAccordion).removeClass('is-expanded');
        } else {
          $(targetAccordion).addClass('is-expanded');
        }
        $(targetAccordion)
          .next('.accordion__content')
          .slideToggle();
      }

      if(isFooterLink || isSaveLink || isOnlineBanking){
        if(isFooterLink && wW < 1024){
          toggleSingleView();
        } 
        if((isSaveLink || isOnlineBanking) && wW < 769){
          toggleSingleView();
        }
      }else{
        toggleSingleView();
      }
    } 
    else{
      var toggleAccordionContent = function (){
        $(targetAccordion)
            .next('.accordion__content')
            .slideToggle();
          $(targetAccordion).toggleClass('is-expanded');
      }
      if(isFooterLink || isSaveLink || isOnlineBanking){
        if(isFooterLink && wW < 1024){
          toggleAccordionContent();
        } 
        if((isSaveLink || isOnlineBanking) && wW < 769){
          toggleAccordionContent();
        }
      }else{
        toggleAccordionContent();
      }
    }
  });

  // Toggle tabs
  $('.tab a').on('click', function(e) {
    e.preventDefault();
    console.log('tab clicked');
    $('.tab li').removeClass('active');
    $(this).parent().addClass('active');

    var targetTab = $(this).attr("href");
    $('.tab__content').hide();
    $(targetTab).show();
  });

  // Icon selection hover behavior
  $('.icon__select li').hover(function(){
    $('.icon__select li').removeClass('active');
    $(this).addClass('active');
    var targetProduct = $(this).attr('data-target');
    //console.log(targetProduct);
    $('.icon__selection-cards li').removeClass('active');
    $('#' + targetProduct).addClass('active');
  });

  // Dropdown selection behavior
  //dropdownSelected();
  $('.dropdown__select').on('change',function(){
    dropdownSelected();

    $("#tempSelect option").text($('.dropdown__select').find(':selected').text());
    //console.log($("#tempSelect").width());
    var setSelectWidth = $("#tempSelect").width() - 30;
    var setOptionsWidth = $("#tempSelect").width() + 30;
    $('.select2-container').width(setSelectWidth); 
    $('.select2-dropdown').width(setOptionsWidth); 
  });

  // Determine vertical scroll direction
  var lastScrollTop = 0;
  var currentPosition = $(window).scrollTop();
  var menuIsExpanded = $('.nav__mobile-toggle').hasClass('opened');
  console.log('menuIsExpanded: ' + menuIsExpanded);
  // If page is reloaded while scrolled down,
  // sub menu remains hidden
  // if(currentPosition > 0){
  //   $('.nav__main .logo img').show();
  //   $('.nav__main').addClass('menu--scrolled');
  //   $('.nav__footer').show();
  //   if(!menuIsExpanded){
  //     $('.nav__main').addClass('menu--scrolled');
  //   }
  // } 
  // if (wW < 768){
  //   $('.nav__main .logo img').show();
  // }

  $('.icon__select').on('click', function(e){
    //e.preventDefault();
  });

  // Scroll behavior
  $(window).scroll(function(event){
    currentPosition = $(this).scrollTop();
    menuIsExpanded = $('.nav__mobile-toggle').hasClass('opened');
     if (currentPosition > lastScrollTop){
      if (wW < 769){
        // if(!menuIsExpanded){
        //   $('.nav__main').addClass('menu--scrolled');
        // } else{
        //   $('.nav__main').removeClass('menu--scrolled');
        // }
        if (currentPosition > 50){
          $('.nav__main').addClass('menu--scrolled');
          $('.nav__footer').show();
        } else {
          if(!menuIsExpanded){
            $('.nav__main').removeClass('menu--scrolled');
            $('.nav__footer').hide();
          }
        }
      }
        // console.log("down")
        // $('.nav__main').addClass('menu--scrolled');
        // $('.nav__sub-bg').addClass('menu--scrolled');

     } else if(currentPosition == lastScrollTop){
       //do nothing 
       //In IE this is an important condition because there seems to be some instances where the last scrollTop is equal to the new one
     }
     else {
        // console.log("up");
        if(currentPosition == 0){
          // Hide main menu logo
          if(wW < 769){
            if(!menuIsExpanded){
              $('.nav__main').removeClass('menu--scrolled');
            }
            else{
              $('.nav__main').addClass('menu--scrolled');
            }
            $('.nav__footer').hide();
          }
          // $('.nav__main').removeClass('menu--scrolled');
          // $('.nav__sub-bg').removeClass('menu--scrolled');
        } else {
        }
     }
     lastScrollTop = currentPosition;
  });

  if(wW < 769){
    // Toggle mobile menu
    $('.nav__mobile-toggle').on('click',function(){ 
      currentPosition = $(window).scrollTop();
      lastScrollTop = 0;
      console.log('currentPosition: ' + currentPosition);
      console.log('lastScrollTop: ' + lastScrollTop);
      if ($('.nav__mobile').hasClass('expanded') ) {
        //console.log("hide menu");  
        $(this).removeClass('opened');
        $('.nav__mobile').removeClass('expanded');
        $('.nav__mobile').addClass('collapsed');
        $('.nav__mobile .accordion').each(function(){
          $(this).removeClass('is-expanded').next('.accordion__content').slideUp();;
        });

        if (currentPosition > lastScrollTop){
          $('.nav__main').addClass('menu--scrolled');
        } else{
          $('.nav__main').removeClass('menu--scrolled');
        }
      } else {
        //console.log("show menu");
        $(this).addClass('opened');
        $('.nav__mobile').removeClass('collapsed');
        $('.nav__mobile').addClass('expanded');

        $('.nav__main').addClass('menu--scrolled');
      }
    });
  }

  // Focus search box on click
  $('#searchProducts').on('focus blur', toggleFocus);
  // $('#bankFromHomeSelect').on('focus blur', toggleSelect);
  // $('#bankFromHomeSelect').on('click', function(e){
  //   $(this).select2('open');
  // })
  $('#bankFromHomeSelect').on('change', function(e){
    var _this = $(this);
    $('html, body').animate({
      scrollTop: $('#main').offset().top - 40
    }, 800)
  });

  // Autocomplete
  // var options = {
  //   url: "data/productSearch.json",
  //   getValue: "name",
  //   list: {
  //     match: {
  //       enabled: true
  //     }
  //   }
  // };
  // $("#searchProducts").easyAutocomplete(options);

  // Disable native select on mobile when select2 is opened
  $(document).on('select2:opening select2:open', function(e) {
    console.log(navigator.userAgent);
    if (isMobile) {
      setTimeout(function(e) {
        document.activeElement.blur();
      }, 1);
    }
  });


  // Convert input to currency format with comma thousandth separator
  $('.text--currency').on('change, keyup', function() {
      if(event.which >= 37 && event.which <= 40) return;

      $(this).val(function(index, value) {
        return value
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ;
      });
  });

  // Anchor links smooth scroll
  $(document).on("click", ".anchor-link", function(e) {
    e.preventDefault();

    var hash = $(this).attr("href");
    if ($(hash).length === 0) {
      return;
    }
    //console.log($(hash).offset().top)
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800)
  })

  // For Animate css
  $('.animated').appear(function() {
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    if(animationDelay) {
      setTimeout(function(){
          element.addClass( animation + " visible" );
          element.removeClass('hiding');
      }, animationDelay);
    } else {
      element.addClass( animation + " visible" );
      element.removeClass('hiding');
    }               
  }, {accY: -90});

});