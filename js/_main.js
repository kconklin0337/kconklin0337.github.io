( function( $ ) {
    // Init Skrollr
    var s = skrollr.init({
        render: function(data) {
            //Debugging - Log the current scroll position.
            //console.log(data.curTop);
        }
    });
} )( jQuery );

var homeSlides = $(".homeSlide");
var $slideContent = $(".hsContainer");
var slidesCount = $(homeSlides).length;
var activeSlide = 1;

// Build HTML for Nav
$("<div/>", {
    "id" : "slideNav"
}).append($("<ul>
<li class="slideNavPrev">
    <a class="disabled" href="#" title="Go to previous slide">
        <span class="ico ico-up">↑</span>
    </a>
</li>
<li>
    <span id="activeSlide">'+activeSlide+'</span>/<span id="maxSlides">'+slidesCount+'</span>
</li>
<li class="slideNavNext">
    <a href="#" title="Go to next slide">
        <span class="ico ico-down">↓</span>
    </a>
</li>
</ul>")).appendTo("body").delay(1200).fadeIn(duration);

// Navigation highligting
var $activeSlide = $('#activeSlide');
var $maxSlides = $('#maxSlides');
var $numberOfSlides = parseInt($maxSlides.text());
var $slideNavNext = $('.slideNavNext');
var $slideNavPrev = $('.slideNavPrev');
var $slideNavNextA = $('.slideNavNext a');
var $slideNavPrevA = $('.slideNavPrev a');

// Highlight current section while scrolling DOWN
homeSlides.waypoint(function(direction) {
    if (direction === 'down') {
        var index = $(this).index();
        var index = index+1;
    $activeSlide.text(index);
    showHideNavItems();
    }
}, { offset: '50%' });

// Highlight current section while scrolling UP
homeSlides.waypoint(function(direction) {
    if (direction === 'up') {
    var index = $(this).index();
    var index = index+1;
    $activeSlide.text(index);
    showHideNavItems();
    }
}, {
    offset: function() {
        // This is the calculation that would give you
        // "bottom of element hits middle of window"
        return $.waypoints('viewportHeight') / 2 - $(this).outerHeight();
    }
});

//Fade out unnecesary nav items
function showHideNavItems(){
    var $activeSlideNumber = parseInt($activeSlide.text());

    if($activeSlideNumber == 1){

        $slideNavNextA.removeAttr('class');
        $slideNavPrev.animate({opacity: 0.25}).find('a').addClass('disabled');

    } else if ($activeSlideNumber == $numberOfSlides) {

        $slideNavPrevA.removeAttr('class');
        $slideNavNext.animate({opacity: 0.25}).find('a').addClass('disabled');

    } else {

        $slideNavNext.add($slideNavPrev).animate({opacity: 1});
        $slideNavNextA.add($slideNavPrevA).removeAttr('class');

    }
}

//Next slide
$slideNavNext.click(function (e) {
    e.preventDefault();
    var index = parseInt($activeSlide.text());
    index++;
    if(index <= $numberOfSlides){
        scrollToSlide(index);
    }
});

//Prev slide
$slideNavPrev.click(function (e) {
    e.preventDefault();
    var index = parseInt($activeSlide.text());
    index--;
    if(index > 0){
        scrollToSlide(index);
    }
});

function scrollToSlide(slideId){

    // Custom slide content offset
    var customSlideOffset = $("#slide-"+slideId).attr('data-content-offset');

    // Scroll to the top of a container if it doesn't have custom offset defined
    if(typeof customSlideOffset === "undefined"){

        htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top) + "px"},"slow");

    } else {

        // Convert percentage 'eg. 25p' into pixels
        if(customSlideOffset.indexOf("p")!=-1) {

            var customSlideOffset = parseInt(customSlideOffset.split("p")[0]);
            var slideHeight = $slide.height();

            customSlideOffset = Math.ceil((slideHeight/100) * customSlideOffset);

            htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + "px"},"slow");

        } else {

           var customSlideOffset = parseInt(customSlideOffset);

           htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + "px"},"slow");

        }

    }
}
