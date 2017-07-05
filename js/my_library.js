$(document).ready(function () {
    setTimeout(loadPage, 300);
});

function loadPage() {
    $.blockUI();
    var blocks = '';
    var k = 1;
    var completed = 1;
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref("usernames").child(userId).child("mylibrary").once("value", function (ss) {
        var animations = ss.val();
        Object.keys(animations).forEach(function(animKey) {
            firebase.storage().ref("mp4Files").child(animations[animKey]+".mp4").getDownloadURL().then(function (downloadUrl) {
                animations[animKey]['mp4Url'] = downloadUrl;
                blocks +='<div class="box box'+k+' fadeInUp clust" data-wow-delay="0.3s" data-page="#">';
                blocks +='<video autoplay loop>';
                blocks +='<source src="'+downloadUrl+'" type="video/mp4" />';
                blocks +='</video>';
                blocks +='<label class="fancy-checkbox">';
                blocks +='<input type="checkbox" name="'+animKey+'"/>';
                blocks +='<span></span>';
                blocks +='</label>';
                blocks +='<a class="downloadbutton" href="'+downloadUrl+'" download><i class="fa fa-download fa-2x" aria-hidden="true"></i></a>';
                blocks +='</div>';
                k++;
                if(k === completed) {
                    $('.zodiacCont').html(blocks);
                    $.unblockUI();
                }
            })
            completed++;
        });
    })
}

function deleteSelected() {
    $('.fancy-checkbox input').each(function() {
        var input = $(this);
        if(input.is(":checked")) {
            var userId = firebase.auth().currentUser.uid;
            var imageKey = input.prop("name");
            firebase.database().ref("usernames").child(userId).child("mylibrary").child(imageKey).remove();
            console.log("removed from library");
            input.parent().parent().remove();
        }
    });
}