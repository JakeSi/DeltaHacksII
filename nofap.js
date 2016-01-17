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

var visitedImages = {}

var uploadContentHash = {};

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
  "underwear":true,
  "lingerie":true,
  "pantie":true,
  "ocean":true,
  "symbol":true
}

function isNSFW(tags){
  var numTags = Math.min(tags.length,10);
  for (var i = 0; i < numTags; i++) {
    // console.log("tag:" + tags[i].tag);
    if (tags[i] in nsfwTags) {
      // console.log("NSFW");
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
          console.log("NSFW" + img.src);
           visitedImages[img.imageurl] = true;
          img.src = getCat["horizontal"]()[0].imageurl;
        } else {
           visitedImages[img.imageurl] = false;
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
        "client_id": "jh5NmLb9r7d0HnmsnrJ7JU9m1kUTasdwf85PHjQw",
        "client_secret" : "DHEAVtaAHniJACaIpnWBTo0JCyAyhtcFdaoeb-vH",
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

function filterImages(){
     // is cached as nsfw or not in cache ye
}

(function (document) {

  getCat.init(myCat);

  fetchApiToken();

  var images = document.getElementsByTagName('img')
  var length = images.length

  for (var i = 0; i < length; i++) {
    var uploadContentHash = [];
    var ratio = imageRatio(images[i]);

    // is cached as nsfw or not in cache yet
    if(!(images[i].imageurl in visitedImages) || (visitedImages[images[i]].imageurl)) {
      if (images[i].height > 100 && images[i].width > 100) {
        filterImage(images[i]);
      };
    }
    // var number = Randomize(getCat[ratio]());
  }

})(document);
