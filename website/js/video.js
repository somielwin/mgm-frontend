

$(document).ready(function(){
     setupYTAPI();

    $('.video-big').owlCarousel({
        loop:false,
        margin: 0,
        dots: false,
        nav:true,
        autoplay:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    $('.video-wrap-list').owlCarousel({
        loop:false,
        margin:10,
        nav:false,
        autoplay:false,
        center:true,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    })

    var videoBig = $('.video-big');
    var videoNavigation = $('.video-wrap-list');


    videoBig.on('translated.owl.carousel', function(event) {

        var element = event.target;
        var items = event.item.count;
        var item = event.item.index;
        var current = event.item.index + 1;
        stopVideo();

        $('.video-wrap-list .owl-item').removeClass('playing');
        $('.video-big .owl-item:nth-child('+current+') .video-trigger').click();
        $('.video-wrap-list .owl-item:nth-child('+current+')').addClass('playing');
    });

    videoNavigation.on('translated.owl.carousel', function(event) {

        var element = event.target;
        var items = event.item.count;
        var item = event.item.index;


        console.log(item);
    });

    $(document).on('click', '.video-list-parent .video-trigger', function(e) {
        e.preventDefault();

        var _thisIndex = $(this).closest('.owl-item').index();

        videoBig.trigger('to.owl.carousel', _thisIndex, function(event){

            var element = event.target;
            console.log(element);
        });
        videoNavigation.trigger('to.owl.carousel', _thisIndex);

       

        //$(document).on('click', +') .video-trigger');
    });

});

function setupYTAPI() {
    tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
        
var player, iframe;
var playerVideo = "unloaded";
    
function onYouTubeIframeAPIReady() {
    playerVideo = "ready";
    //$(".home-slide-thumb li").each(function(index) {
    $(document).on('click', '.video-big .video-trigger', function(e) {
        e.preventDefault();
        var _thisbtn = $(this);
        var videoId = $(this).attr('data-videoid');
        var _thisIndex = $(this).closest('.owl-item').index();


        console.log(_thisIndex);

        $('.video-wrap-list').trigger('to.owl.carousel', _thisIndex);
        $('.video-wrap-list .owl-item').removeClass('playing');

        
        if($(_thisbtn).hasClass('isPlaying')) {
            player.pauseVideo();

            $(_thisbtn).removeClass('isPlaying');            

        } else {
            //$('.video-holder-youtube').removeClass('z-index').removeClass('opac');
            $('.video-wrap-list .owl-item:nth-child('+(_thisIndex+1)+')').addClass('playing');

            $(_thisbtn).addClass("isPlaying");
            $(_thisbtn).closest('.item').find('.video-holder-player').addClass('active').append("<div id='player'></div>");
            //$(_thisbtn).closest('li').addClass('active');
            player = new YT.Player('player', {
                height: $(".video-holder-player").height(),
                width: $(".video-holder-player").width(),
                playerVars: { 
                    'controls':0,
                    'showinfo':0,  
                    'fs': 0, 
                    'autoplay':1,
                    'loop': 1,
                    'ecver': 2,
                    'modestbranding': 0, // Hide the Youtube Logo
                },
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    	
    });
	//});
}

function onPlayerReady(event) {
    //player.mute();
    player.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        //playerVideo = "complete";
        stopVideo();
        
    }

}


function stopVideo() {
    if (player) {
		player = null;
		$("#player").attr("src","");
		$("#player").remove();
		$(".video-trigger").removeClass("isPlaying").removeClass('pause');
        $('.video-holder-player').removeClass('active')
        $('.video-holder-player').html('');
    }	

    $('.video-holder-player').html('');

}