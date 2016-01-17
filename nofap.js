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
  new Cat("horizontal", "https://indiabright.com/wp-content/uploads/2015/12/adorable-angelic-animal-baby-cat-cute-Favim.com-44596.jpg"),
  new Cat("horizontal", "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg"),
  new Cat("horizontal", "https://nextranks.com/data_images/main/cats/cats-04.jpg"),
  new Cat("vertical", "https://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg"),
  new Cat("vertical", "https://www.artistiqueacres.com/images/cute-cat.jpg"),
  new Cat("vertical", "https://s-media-cache-ak0.pinimg.com/236x/40/c1/bd/40c1bd174fa0f13f6a025e6e7e44bec4.jpg"),
  new Cat("square", "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg"),
  new Cat("square", "https://www.helpinghomelesscats.com/images/cat1.jpg"),
  new Cat("square", "https://s.hswstatic.com/gif/abyssinian-cat.jpg"),
  new Cat("square", "https://i.imgur.com/zLDuTkV.jpg")
]
var visitedImages = {
  "https://indiabright.com/wp-content/uploads/2015/12/adorable-angelic-animal-baby-cat-cute-Favim.com-44596.jpg" : false,
  "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg" : false,
  "https://nextranks.com/data_images/main/cats/cats-04.jpg" : false,
  "https://www.cats.org.uk/uploads/images/pages/photo_latest14.jpg": false,
  "https://www.artistiqueacres.com/images/cute-cat.jpg": false,
  "https://s-media-cache-ak0.pinimg.com/236x/40/c1/bd/40c1bd174fa0f13f6a025e6e7e44bec4.jpg": false,
  "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg": false,
  "https://www.helpinghomelesscats.com/images/cat1.jpg" : false,
  "https://s.hswstatic.com/gif/abyssinian-cat.jpg": false

}

var nsfwTags = {
  "sexy":true,
  "sensual":true,
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
  "sex":true,
  "glamour":true,
  "naked":true,
  "pornography":true,
  "underwear":true,
  "lingerie":true,
  "pantie":true,
  "marijuana":true,
  "cannabis":true,
  "addiction":true,

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

function loadCatImage(image){
  var ratio = imageRatio(image);
  var number = Randomize(getCat[ratio]());
  return getCat[ratio]()[number].imageurl;
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
          img.src = loadCatImage(img);
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

  if(proportion > 0.9) {
    return "vertical";
  }else if(proportion < 1.1) {
    return "horizontal";
  }else{
    return "square";
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

(function (document) {

  test = function(){
    var images = document.getElementsByTagName('img')
    var length = images.length

    for (var i = 0; i < length; i++) {

      // is cached as nsfw or not in cache yet
      if(!(images[i].src in visitedImages)) {
        if (images[i].height > 75 && images[i].width > 75) {
          filterImage(images[i]);
        };
      }else if(visitedImages[images[i].src]){
        images[i].src = loadCatImage(images[i]);
      }
      // var number = Randomize(getCat[ratio]());
    }
  }

  getCat.init(myCat);

  fetchApiToken();
  test();
  setInterval(test,1000);
})(document);
