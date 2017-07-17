$(document).ready(function() {
    setTimeout(loadPage, 1500);
});

function loadPage() {
    if (firebase.auth().currentUser) {
        $.blockUI();
        var blocks = '';
        var k = 1;
        var completed = 1;
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref("usernames").child(userId).child("mylibrary").once("value", function(ss) {
            var animations = ss.val();

            if (!animations) {
                alert("No items in library");
                $.unblockUI();
            }

            animations && Object.keys(animations).forEach(function(animKey) {
                console.log(animKey);
                firebase.storage().ref("animFiles").child(animations[animKey].name + ".anim").getDownloadURL().then(function(animDownloadUrl) {
                    firebase.storage().ref("mp4Files").child(animations[animKey].name + ".mp4").getDownloadURL().then(function(downloadUrl) {
                        console.log(animations[animKey]);
                        blocks += '<div class="box box' + k + ' fadeInUp clust" data-wow-delay="0.3s" data-page="#">';
                        blocks += '<div style="z-index: 111;">';
                        blocks += '<div class="animation-name" style="text-align:center;margin-top:40px;display:block">' + animations[animKey].displayName + '</div>';
                        blocks += '<a data-url="' + animDownloadUrl + ' data-duration=' + animations[animKey].duration + '" data-name="' + animations[animKey].name + '.anim" download href="' + animDownloadUrl + '" style="float:none !important;text-align:center;display:block;margin-top:0px"><br/><i class="fa fa-download fa-2x" aria-hidden="true"></i></a></center>';
                        blocks += '<label class="fancy-checkbox">';
                        blocks += '<input type="checkbox" name="demo_' + animKey + '" onclick="if(this.checked){ document.getElementById(' + k + ').checked = true;} else {document.getElementById(' + k + ').checked = false;}"/>';
                        blocks += '<span></span>';
                        blocks += '</label>';
                        blocks += '</div>';
                        blocks += '<label class="fancy-checkbox">';
                        blocks += '<input type="checkbox" name="' + animKey + '" id="' + k + '"/>';
                        blocks += '<span></span>';
                        blocks += '</label>';
                        blocks += '<video autoplay loop muted>';
                        blocks += '<source src="' + downloadUrl + '" type="video/mp4" />';
                        blocks += '</video>';
                        blocks += '</div>';
                        k++;
                        console.log(animations[animKey].duration);
                        if (k === completed) {
                            $('.zodiacCont').html(blocks);
                            $(".box").show();
                            $(".zodiacCont").show();
                            $(".temp_margin").hide();
                            $.unblockUI();
                        }
                    })
                });

                completed++;
            });
        })
    } else {
        $('#myModal').modal({
            backdrop: "static",
            keyboard: false,
            show: true
        });
        $(".zodiacCont").show();
        $(".temp_margin").hide();
    }
}

function deleteSelected() {
    $('.fancy-checkbox input').each(function() {
        var input = $(this);
        if (input.is(":checked")) {
            var userId = firebase.auth().currentUser.uid;
            var imageKey = input.prop("name");
            firebase.database().ref("usernames").child(userId).child("mylibrary").child(imageKey).remove();
            console.log("removed from library");
            input.parent().parent().remove();
        }
    });
}