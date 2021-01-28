//prevent from scrolling
$('#js-menu-toggle').on('click', function () {
    $('body').toggleClass('hidden');
    $('#menu').addClass('open');
});
//
//left padding for carousel at main section
function defineCarouselPadding() {
    let windowWidth = $(window).width(),
        containerWidth = $('.js-container').width(),
        carouselContainer = $('.js-carousel-container'),
        paddingLeft;
    if (windowWidth > containerWidth) {
        paddingLeft = (windowWidth - containerWidth) / 2;
        carouselContainer.css('padding-left', paddingLeft)
    }
}

defineCarouselPadding();
$(window).on('resize', defineCarouselPadding);
//
// sticky header for mobile view
let $navBar = $('.js-mobile-header'),
    showNavBarMinimum = $('.b-main_section').height() / 2 - $navBar.height(),
    wasNavBarVisible = false;

// change nav bar visibility on scroll
function onScrollHeader() {
    let isNavBarVisible = window.pageYOffset >= showNavBarMinimum;
    if (isNavBarVisible != wasNavBarVisible) {
        $navBar.toggleClass('m-sticky');
        $('.b-main').toggleClass('m-sticky-header-showed');
        wasNavBarVisible = isNavBarVisible;
    }
}

// initial check
onScrollHeader();
$(window).on('scroll', onScrollHeader);
//
//slider counter
let $status = $('.js-pagingInfo'),
    $slickElement = $('.js-carousel');

$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    if (!slick.$dots) {
        return;
    }
    let i = (currentSlide ? currentSlide : 0) + 1;
    $status.text(i + '/' + (slick.$dots[0].children.length));
});
//
//carousel
$slickElement.slick({
    variableWidth: true,
    slidesToShow: 3,
    infinite: true,
    dots: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                slidesToShow: 2
            }
        }
    ]
});
//gallery slider
$('.js-carousel_gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.js-carousel_gallery_nav'
});
$('.js-carousel_gallery_nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.js-carousel_gallery',
    dots: false,
    arrows: false,
    // centerMode: true,
    focusOnSelect: true
});

//
// function scale() {
//     let sliderItem = $('.b-line_slider-item');
//     sliderItem.toggleClass('m-active');
// }
// $(document).on('click', scale);
