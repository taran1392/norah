
jQuery(document).ready(function(){

/*-------------------firebase storage zodiacCont----------------------*/

if (sessionStorage.getItem("satorage_gifs") && sessionStorage.getItem("satorage_anims")) {
  // Restore the contents of the text field
  var satorage_gifs = JSON.parse(sessionStorage.getItem("satorage_gifs"));
  var satorage_anims = JSON.parse(sessionStorage.getItem("satorage_anims"));
  console.log("satorage_gifs = ", satorage_gifs);
  console.log("satorage_anims = ", satorage_anims);
  var blocks = '';
  var k = 1;


  for(key in satorage_gifs){
  	console.log("key - ", key);
  	blocks +='<div class="box box'+k+' wow fadeInUp clust">';
        blocks +='<div>';
        
        blocks +='<a class="newwwww" href="#"><i class="fa fa-plus-circle fa-2x" aria-hidden="true" ></i></a>';
        blocks +='<a href="'+satorage_anims[key]+'" download><i class="fa fa-download fa-2x" aria-hidden="true"></i></a>';
        blocks +='</div><figure class="newFigure"> <img src="'+satorage_gifs[key]+'" class="gifPic"></figure><strong></strong>';
        
        blocks +='</div>';
        ++k;
  }
  $('.zodiacCont').html(blocks);

  $('.newwwww').click(function(){
		var str = $(this).parent().next().find('img').attr('src');
		
		firebase.auth().onAuthStateChanged(function(user) {

			// console.log(user.uid);
			var newPostKey = firebase.database().ref();
			newPostKey.push().set(str);
		});
	})
}

});