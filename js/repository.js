
jQuery(document).ready(function(){

/*---------firebase storage zodiacCont--------------*/

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




/*--------------------Side Bar------------------------------------*/
/*var fireBaseSideBar = firebase.database().ref().child("tags");

fireBaseSideBar.on('value',function(datasnapshot){
	$(".sideLi").html() = datasnapshot.val();
	})*/

firebase.database().ref("/tags/").once('value').then(function(snapshot) {
        var fireObject = snapshot.val();
        console.log("fireObject = ", fireObject);
        var t = 0;
        for(var key in fireObject) {
            console.log("key = ", key);
            console.log("fireObject[",key,"] = ", fireObject[key]);
            var sabUl = "<ul class='nav nav-pills nav-stacked subMenuS'>";
            for(var b in fireObject[key]) {
                sabUl += "<li  class = 'subManuLi' role='presentation'><a href='#'>"+fireObject[key][b]+"</a></li>";
            }
            sabUl += "</ul>";
            var active = (t == 0) ? " class='active'" : ''; 
            $(".menuS").append('<li role="presentation"'+active+'><a href="#">'+key+'</a>'+sabUl+'</li>');
            ++t;
        }
        var subLi = '';
        //var selected = false; //
       // if(selected){
        	   $(".subManuLi").off('click').on('click',function(){

	        	subLi += '<div class="pull-left closeDiv">';
	        	subLi += '<p class="pull-left filterP">'+$(this).html()+'</p>';
	        	subLi += '<button class="pull-right closeBtn">X</button>';
	        	subLi += '</div>';

	        	$(".tagName").html(subLi);
	            selected = true;
	            $(".closeBtn").off('click').on('click',function(){
	        	    $(this).parent().remove();
	            });
        	});
        //}
     	/*else{

     	}*/


        /*var storageRef = firebase.storage().ref();
        var gsReference = firebase.storage().refFromURL('gs://animake-672fc.appspot.com');
        var gifs = {};
        var anims = {};*/
    
    /*    for (key in fireObject) {
            var obj = fireObject[key].split("-");
            var gif = 'gifsFires/'+obj[0];
            var anim = 'Animake/'+obj[1];
            var spaceRef = storageRef.child(gif);
            storageRef.child(gif).getDownloadURL().then(function(url) {
                var num = url.match(/F\d+/);
                gifs[num] = url;
                sessionStorage.setItem('satorage_gifs', JSON.stringify(gifs));
            }).catch(function(error) {});
    
            storageRef.child(anim).getDownloadURL().then(function(url) {
                var num = url.match(/F\d+/);
                anims[num] = url;
                sessionStorage.setItem('satorage_anims', JSON.stringify(anims));
            }).catch(function(error) {})
        }*/
    });
/*----------------------CloseButton---------------------*/




});

