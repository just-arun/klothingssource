$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
    $('.tabs').tabs();
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.modal').modal();
    // $('.carousel').carousel({
    //     padding: 200    
    // }).next();
    $('.carousel').carousel({padding:200});
    let carousel = M.Carousel.getInstance($('.carousel'));
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
      });
    setInterval(()=>{carousel.next();}, 4000);
    $('.materialboxed').materialbox();
});




$(window).scroll(()=>{
    if (pageYOffset > 80) {
        $('.scroling-nav').fadeIn();
    }else{
        $('.scroling-nav').fadeOut();
    }
});