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
  var images = document.getElementsByTagName('img'), length = images.length;

  for (var i = 0; i < length; i++) {
    if(!(img.imageurl in visitedImages)) {
      var ratio = imageRatio(images[i]);
      var number = Randomize(getCat[ratio]());
      var img = getCat[ratio]()[number];
      images[i].src = img.imageurl;
      visitedImages[img.imageurl] = true; // move this to response callback from api request
    }
  }

})(document);
