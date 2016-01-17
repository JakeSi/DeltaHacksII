function Cat(ratio, imageurl){
  this.ratio = ratio;
  this.imageurl = imageurl;
}

var token = "";

var getCat = {
  init: function(myCat){
    this.myCat = myCat;
  },

  horizontal: function(){
    return this.myCat.filter(function(myCat){
      return myCat.ratio === "horizontal";
    });
  },

  vertical: function(){
    return this.myCat.filter(function(myCat){
      return myCat.ratio === "vertical";
    });
  }, 

  square: function (){
    return this.myCat.filter(function(myCat){
      return myCat.ratio === "square";
    });  
  }
};

function Randomize(images){
  return Math.floor(Math.random() * images.length)
}

var myCat = [ 
  new Cat("horizontal", "http://www.helpinghomelesscats.com/images/cat1.jpg"),
  new Cat("vertical", "http://www.helpinghomelesscats.com/images/cat1.jpg"),
  new Cat("square", "http://www.helpinghomelesscats.com/images/cat1.jpg")
]

var visitedImages = {
  "http://www.helpinghomelesscats.com/images/cat1.jpg" : false
}

var nsfwTags = {
  "sexy":true,
  "attractive":true,
  "erotic":true,
  "model":true,
  "porn":true,
  "boob":true,
  "breast":true,
  "brassiere":true,
  "bra":true,
  "butt":true,
  "cleavage":true,
  "penis":true,
  "dick":true,
  "naked":true,
  "underwear":true,
  "lingerie":true,
  "pantie":true
}

function isNSFW(tags){
  var numTags = Math.min(tags.length,10);
  for (var i = 0; i < numTags; i++) {
    if (tags[i] in nsfwTags) {
      return true;
    };
  };

  return false;
}

function filterImage(img){
  var authbearer = " Bearer " + token;
  $.ajax({ 
      headers : {
        "Authorization": authbearer
      },
      type: "POST",
      url: "https://api.clarifai.com/v1/tag/",
      data: {
        "url": img.src
      },
      success: function(data){
      console.log(data);       
        if(isNSFW(data.results[0].result.tag.classes)){
          console.log("NSFW");
          console.log(img.src);
           visitedImages[img.src] = true;
          img.src = getCat["horizontal"]()[0].imageurl;
        } else {
           visitedImages[img.src] = false;
        }
      },
      error: function(data){
        console.log(data);
      }

  });
}

function imageRatio(image) {
  var proportion = image.height/image.width;

  if(proportion > 1) {
    return "vertical";
  } else if(proportion === 1) {
    return "square";
  } else if(proportion < 1) {
    return "horizontal";
  }
}     

function fetchApiToken(image){
  $.ajax({ 

    type: "POST",
    dataType: "json",
    url: "https://api.clarifai.com/v1/token/",
    data: {
      "client_id" : "X__z9Razsn8fGJod6dN3owbKNZpHMuY6W-veigst",
      "client_secret"  :"GVWwhSi7yvmY7nqidSCMrepgAbtV2_b_zh2QT1tV",
      "grant_type" : "client_credentials"
    },
    async: false,
    success: function(data){
      console.log(data);
      token = data.access_token;       
    },
    error: function(data){
      console.log(data);
    }

  });
}

(function (document) {

  test = function(){
    var images = document.getElementsByTagName('img')
    var length = images.length

    for (var i = 0; i < length; i++) {
      var ratio = imageRatio(images[i]);

      // is cached as nsfw or not in cache yet
      if(!(images[i].src in visitedImages)) {
        if (images[i].height > 75 && images[i].width > 75) {
          filterImage(images[i]);
        };
      }else if(visitedImages[images[i].src]){
        image[i].src = getCat["horizontal"]()[0].imageurl;
      }
      // var number = Randomize(getCat[ratio]());
    }
  }

  getCat.init(myCat);

  fetchApiToken();
  test();
  setInterval(test,1000);
})(document);
