/*  JavaScript Document  */

$(document).ready(function(){

    updateOrientationListener();

    $('nav a').on('click',function(){
        var pageToLoad = $(this).attr('data-file');
        changePage(pageToLoad);
        $('nav a').removeClass('selected');
        $(this).addClass('selected');
    });

});

function changePage(fileName){
    $('.content_container').animate({opacity:0},500,function(){
        $('.content_loading_container').load('assets/content/'+fileName,function(){
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
