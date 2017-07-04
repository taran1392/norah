/*-----------------------firebase storage-----------------------*/
function queryDatabase(token){
    firebase.database().ref().once('value').then(function(snapshot) {
        var postObject = snapshot.val();

        var lib = " ";
        for (key in postObject){
        var l=1;

            if(typeof postObject[key] == 'object'){
                continue;
            }

        lib +='<div class="box box'+l+' wow fadeInUp clust">';
        lib +='<div class="reposDiv">';
        
        lib +='<a href="'+postObject[key]+'" download><i class="fa fa-download fa-2x" aria-hidden="true"></i></a>';
        lib +='</div><figure class="newFigure"> <img src="'+postObject[key]+'" class="gifPic"></figure><strong></strong>';
        
        lib +='</div>';
        ++l;
        }

        $(".library").html(lib);
    })
}




jQuery(document).ready(function(){
    $('.login-form .new-animake').off('click').on('click',function(){
        $('.login-form').hide();
        $('.reg-form').show();
    });
    
    $('.reg-form .already-reg').off('click').on('click',function(){
        $('.reg-form').hide();
        $('.login-form').show();
    });

    $('.box, .tp').off('click').on('click', function(e){
        if(!$(e.target).is('.fa')) {
            window.location.href= $(this).attr('data-page') + ".html";
        }
    })   
    

/*--------------------------firebase storage--------------------*/
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var token = firebase.auth().currentUser.uid;
            queryDatabase(token);
            
        }
    });

/*---------------firebase DB zodiacCont--------------------*/

    firebase.database().ref("/fire_pic/").once('value').then(function(snapshot) {
        var fireObject = snapshot.val();
        var storageRef = firebase.storage().ref();
        var gsReference = firebase.storage().refFromURL('gs://animake-672fc.appspot.com');
        var gifs = {};
        var anims = {};
    
        for (key in fireObject) {
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
        }
    });
})