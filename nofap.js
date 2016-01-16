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

function filterImage(imgUrl){
  console.log(imgUrl);
  $.ajax({ 
      headers : {
        "authorization": "Basic YWNjX2M1OWNlNDY5OTAxNDNiYzpkZDM2YzQzM2JjODliODc0OGUwNzJhZGZiZjFmNTNkYQ==",
        "accept": "application/json"
      },
      type: "GET",
      dataType: "json",
      url: "https://api.imagga.com/v1/tagging",
      data: {
        "url": imgUrl
      },
      success: function(data){        
        alert(data);
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
    var img = getCat["horizontal"]()[0];
    images[i].src = img.imageurl
  }

})(document);
