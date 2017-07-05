function downloadFile(th) {
    var url = $(th).data("url");
    var fileName = $(th).data("name");

    $.ajax({
        url: url,
        success: function(data) {
            var blob=new Blob([data]);
            var link=document.createElement('a');
            link.href=window.URL.createObjectURL(blob);
            link.download=fileName;
            link.click();
        }
    });
}