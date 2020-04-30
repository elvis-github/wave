function loadFiles() {
    var folder = "static/images";

    $.ajax({
        url: folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    $("#main").append("<img src='" + val + "'>");
                }
            });
        }
    });
}