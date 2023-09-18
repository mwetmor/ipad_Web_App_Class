/*  JavaScript Document  */

var eventType = 'click';

/* IScroll */
var myScroll;
function loaded(){
    myScroll = new IScroll('#scroll',{checkDOMChanges:true});
}
document.addEventListener('DOMContentLoaded', loaded, false);
/* end IScroll */

$(document).ready(function(){

    updateOrientationListener();

    window.setTimeout(startMap,1500);

    $('nav a').on(eventType,function(){
        var pageToLoad = $(this).attr('data-file');
        changePage(pageToLoad);
        $('nav a').removeClass('selected');
        $(this).addClass('selected');
    });
    $('nav a:nth-child(1)').trigger(eventType);

});

function startMap(){
    var latlng = new google.maps.LatLng(28.614367, -80.602991); 
    var myOptions = {zoom: 16, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP}; 
    var map = new google.maps.Map(document.getElementById('map_canvas'),myOptions); 
    var marker = new google.maps.Marker({
	position: latlng, 
	map: map,
	title:'Office Location'
});

}

function changePage(fileName){
    $('.content_container').animate({opacity:0},500,function(){
        //detect homepage
        if( fileName == 'home.html'){
            $('.page').addClass('home');
        }else{
            $('.page').removeClass('home');
        }
        // detect contact
        if( fileName == 'contact_us.html'){
            $('.map_container').addClass('on').removeClass('off');
        }else{
            $('.map_container').addClass('off').removeClass('on');
        }

        // load content
        $('.content_loading_container').load('assets/content/'+fileName,function(){
            myScroll.refresh();
            $('.content_container').animate({opacity:1},500);
        });
    });

}

function updateOrientationListener(){
    rotationInterval = setInterval(updateOrientation,500);

}

function updateOrientation(){
    if( $('body').width() < 1024 ){
        $('.page').removeClass('landscape').addClass('portrait');
    }else{
        $('.page').addClass('landscape').removeClass('portrait');
    }
}
