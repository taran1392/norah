/*-----------------------firebase storage-----------------------*/
function queryDatabase(token) {
    firebase.database().ref().once('value').then(function(snapshot) {
        var postObject = snapshot.val();

        var lib = " ";
        for (key in postObject) {
            var l = 1;

            if (typeof postObject[key] == 'object') {
                continue;
            }

            lib += '<div class="box box' + l + ' wow fadeInUp clust">';
            lib += '<div class="reposDiv">';

            lib += '<a href="' + postObject[key] + '" download><i class="fa fa-download fa-2x" aria-hidden="true"></i></a>';
            lib += '</div><figure class="newFigure"> <img src="' + postObject[key] + '" class="gifPic"></figure><strong></strong>';

            lib += '</div>';
            ++l;
        }

        $(".library").html(lib);
    })
}

var onceBool;


jQuery(document).ready(function() {
    onceBool = true;
    $('.login-form .new-animake').off('click').on('click', function() {
        $('.login-form').hide();
        $('.reg-form').show();
    });

    $('.reg-form .already-reg').off('click').on('click', function() {
        $('.reg-form').hide();
        $('.login-form').show();
    });

    $('.clustering .box, .tp').off('click').on('click', function(e) {
        if (!$(e.target).is('.fa')) {
            window.location.href = $(this).attr('data-page') + ".html";
        }
    });

    $('.openModal').off('click').on('click', function(e) {
        e.preventDefault();
        $('#js-modal').show();
    })


    /*--------------------------firebase storage--------------------*/
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var token = firebase.auth().currentUser.uid;
            queryDatabase(token);

            // closeLoginModal();
            $('#myModal').hide();
            $('.reg').hide();
            $('#js-modal').hide();
            $('.login-form').hide();
            $('.reg-form').hide();

        }
    });

    /*---------------firebase DB zodiacCont--------------------*/

    // firebase.database().ref("/fire_pic/").once('value').then(function(snapshot) {
    //     var fireObject = snapshot.val();
    //     var storageRef = firebase.storage().ref();
    //     var gsReference = firebase.storage().refFromURL('gs://animake-672fc.appspot.com');
    //     var gifs = {};
    //     var anims = {};
    // // console.log("fireObject = ", fireObject);
    //     for (key in fireObject) {
    //         var obj = fireObject[key].split("-");
    // // console.log("obj = ", obj);
    //         var gif = 'gifsFires/'+obj[0];
    // // console.log("gif = ", gif);
    //         var anim = 'Animake/'+obj[1];
    // // console.log("anim = ", anim);
    //         var spaceRef = storageRef.child(gif);
    // // console.log("spaceRef = ", spaceRef);
    // // console.log("storageRef.child(",gif,").getDownloadURL() = ", storageRef.child(gif).getDownloadURL());
    //         storageRef.child(gif).getDownloadURL().then(function(url) {
    // // console.log("gif url = ", url);
    //             var num = url.match(/F\d+/);
    // // console.log("gif num = ", num);
    //             gifs[num] = url;
    //             sessionStorage.setItem('satorage_gifs', JSON.stringify(gifs));
    //         }).catch(function(error) {});
    //
    //         storageRef.child(anim).getDownloadURL().then(function(url) {
    // // console.log("anim url = ", anim);
    //             var num = url.match(/F\d+/);
    // // console.log("anim num = ", num);
    //             anims[num] = url;
    //             sessionStorage.setItem('satorage_anims', JSON.stringify(anims));
    //         }).catch(function(error) {})
    //     }
    // });
    // console.log("sessionStorage.getItem('satorage_gifs') = ", sessionStorage.getItem('satorage_gifs'));
    // console.log("sessionStorage.getItem('satorage_anims') = ", sessionStorage.getItem('satorage_anims'));
})