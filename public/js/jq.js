$(document).ready(function () {
    $('.collapsible').collapsible();
    $('.tooltipped').tooltip();
    $('.tabs').tabs();
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    $('select').formSelect();
    $('.modal').modal();
    let carousel = M.Carousel.getInstance($('.carousel'));

    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: false
    });
    $('.materialboxed').materialbox();
});




$(window).scroll(() => {
    if (pageYOffset > 80) {
        $('.scroling-nav').fadeIn();
    } else {
        $('.scroling-nav').fadeOut();
    }
});