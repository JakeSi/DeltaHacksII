function Cat(ratio, imageurl){
  this.ratio = ratio;
  this.imageurl = imageurl;
}

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
  "sign":true
}

function isNSFW(tags){
  var numTags = Math.min(tags.length,10);
  for (var i = 0; i < numTags; i++) {
    console.log("tag:" + tags[i].tag);
    if (tags[i].tag in nsfwTags) {
      console.log("NSFW");
      return true;
    };
  };

  return false;
}

function filterImage(img){
  $.ajax({ 
      headers : {
        "authorization": "Basic YWNjX2M1OWNlNDY5OTAxNDNiYzpkZDM2YzQzM2JjODliODc0OGUwNzJhZGZiZjFmNTNkYQ==",
        "accept": "application/json"
      },
      type: "GET",
      dataType: "json",
      url: "https://api.imagga.com/v1/tagging",
      data: {
        "url": img.src
      },
      success: function(data){
      console.log(data);        
        if(isNSFW(data.results[0].tags)){
          visitedImages[img.imageurl] = true;
          img.src = getCat["horizontal"]()[0].imageurl;
        }
      },
      error: function(data){
        alert("ASDGSDFGSDFG");
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

(function (document) {

  getCat.init(myCat);

  var images = document.getElementsByTagName('img')
  var length = images.length

  filterImage(images[0]);

  for (var i = 0; i < length; i++) {
    var ratio = imageRatio(images[i]);
    // var number = Randomize(getCat[ratio]());
  }

})(document);
