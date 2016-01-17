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
  new Cat("horizontal", "http://nextranks.com/data_images/main/cats/cats-04.jpg"),
  new Cat("horizontal", "http://images.natureworldnews.com/data/images/full/19781/picky-cat.jpg"),
  new Cat("horizontal", "https://i.imgur.com/UQmua1N.jpg"),
  new Cat("horizontal", "https://i.imgur.com/7SJajco.jpg"),
  new Cat("horizontal", "https://i.imgur.com/fMb19BZ.jpg"),
  new Cat("vertical", "https://i.imgur.com/7QU8HaP.jpg"),
  new Cat("vertical", "https://i.imgur.com/fRxkJV2.jpg"),
  new Cat("vertical", "https://s-media-cache-ak0.pinimg.com/236x/40/c1/bd/40c1bd174fa0f13f6a025e6e7e44bec4.jpg"),
  new Cat("vertical", "http://www.cat-breeds-encyclopedia.com/image-files/siamese-cat-portrait.jpg"),
  new Cat("vertical", "https://i.imgur.com/asPsIEH.jpg"),
  new Cat("vertical", "https://i.imgur.com/x80K9qC.jpg"),
  new Cat("vertical", "https://i.imgur.com/ngTmiFN.jpg"),
  new Cat("square", "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg"),
  new Cat("square", "http://www.helpinghomelesscats.com/images/cat1.jpg"),
  new Cat("square", "http://s.hswstatic.com/gif/abyssinian-cat.jpg"),
  new Cat("square", "https://i.imgur.com/zLDuTkV.jpg"),
  new Cat("square", "https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg"),
   new Cat("square", "https://pbs.twimg.com/profile_images/469217937862037504/yd3-lohT.jpeg")

]

var visitedImages = {
  "https://indiabright.com/wp-content/uploads/2015/12/adorable-angelic-animal-baby-cat-cute-Favim.com-44596.jpg" : false,
  "https://www.petfinder.com/wp-content/uploads/2012/11/99233806-bringing-home-new-cat-632x475.jpg" : false,
  "http://nextranks.com/data_images/main/cats/cats-04.jpg" : false,
  "http://images.natureworldnews.com/data/images/full/19781/picky-cat.jpg":false,
  "https://i.imgur.com/UQmua1N.jpg":false,
  "https://i.imgur.com/7SJajco.jpg":false,
  "https://i.imgur.com/fMb19BZ.jpg":false,

  "https://i.imgur.com/7QU8HaP.jpg": false,
  "https://i.imgur.com/fRxkJV2.jpg": false,
  "https://s-media-cache-ak0.pinimg.com/236x/40/c1/bd/40c1bd174fa0f13f6a025e6e7e44bec4.jpg": false,
  "http://www.cat-breeds-encyclopedia.com/image-files/siamese-cat-portrait.jpg":false,
  "https://i.imgur.com/asPsIEH.jpg":false,
  "https://i.imgur.com/x80K9qC.jpg":false,
  "https://i.imgur.com/ngTmiFN.jpg":false,

  "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg": false,
  "http://www.helpinghomelesscats.com/images/cat1.jpg" : false,
  "https://s.hswstatic.com/gif/abyssinian-cat.jpg": false,
  "https://i.imgur.com/zLDuTkV.jpg": false,
  "https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg":false,
  "https://pbs.twimg.com/profile_images/469217937862037504/yd3-lohT.jpeg":false

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

  if(proportion > 1.1) {
    return "vertical";
  }else if(proportion < 0.9) {
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
