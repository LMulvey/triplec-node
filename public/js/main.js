/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function preload(arrayOfImages, imgDir) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src', imgDir + this).appendTo('body').css('display','none');
    });
}

$(window).load(function() { //start after HTML, images have loaded

var InfiniteRotator =
{
    init: function()
    {
        //initial fade-in time (in milliseconds)
        var initialFadeIn = 1000;

        //interval between items (in milliseconds)
        var itemInterval = 5000;

        //cross-fade time (in milliseconds)
        var fadeTime = 2500;

        //set current items
        var cItems = {
          'b': 0,
          'k': 0,
          'o': 0
        };

        //img dir
        var imgUrl = "./img/";

        //kitchen images
        var kitchenImages = [
          "kitchen/1_thumb.png",
          "kitchen/2_thumb.png",
          "kitchen/3_thumb.png",
          "kitchen/4_thumb.png",
          "kitchen/5_thumb.png"
        ];

        //bathroom images
        var bathroomImages = [
          "Bathroom/1_thumb.jpg",
          "Bathroom/2_thumb.jpg",
          "Bathroom/3_thumb.jpg",
          "Bathroom/4_thumb.jpg"
        ];

        //bathroom images
        var otherImages = [
          "Other/1_thumb.jpg",
          "Other/2_thumb.jpg",
          "Other/3_thumb.jpg",
          "Other/4_thumb.jpg",
          "Other/5_thumb.jpg",
          "Other/6_thumb.jpg"
        ];

        shuffle(kitchenImages);
        shuffle(bathroomImages);
        shuffle(otherImages);

        preload(kitchenImages, imgUrl);
        preload(bathroomImages, imgUrl);
        preload(otherImages, imgUrl);

        //count number of items
        var kitchenLength = kitchenImages.length;
        var bathroomLength = bathroomImages.length;
        var othersLength = otherImages.length;

        //show first items
        $('.button-bathrooms').css('background-image', 'url(' + imgUrl + bathroomImages[cItems['b']] + ')');
        $('.button-kitchens').css('background-image', 'url(' + imgUrl + kitchenImages[cItems['k']] + ')');
        $('.button-others').css('background-image', 'url(' + imgUrl + otherImages[cItems['o']] + ')');

        //loop through the items
        var infiniteLoop = setInterval(function(){

          $('.button-bathrooms').css('background-image', 'url(' + imgUrl + bathroomImages[cItems['b']] + ')');
          $('.button-kitchens').css('background-image', 'url(' + imgUrl + kitchenImages[cItems['k']] + ')');
          $('.button-others').css('background-image', 'url(' + imgUrl + otherImages[cItems['o']] + ')');

            if(cItems['b'] == bathroomLength -1) {
              cItems['b'] = 0;
            } else {
              cItems['b']++;
            }

            if(cItems['k'] == bathroomLength -1) {
              cItems['k'] = 0;
            } else {
              cItems['k']++;
            }

            if(cItems['o'] == bathroomLength -1) {
              cItems['o'] = 0;
            } else {
              cItems['o']++;
            }

            $('.button-bathrooms').css('background-image', 'url(' + imgUrl + bathroomImages[cItems['b']] + ')');
            $('.button-kitchens').css('background-image', 'url(' + imgUrl + kitchenImages[cItems['k']] + ')');
            $('.button-others').css('background-image', 'url(' + imgUrl + otherImages[cItems['o']] + ')');


        }, itemInterval);
    }
};

InfiniteRotator.init();

});
