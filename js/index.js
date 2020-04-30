function loadFiles() {
    var folder = "static/images";
    var row = 0;
    $.ajax({
        url: folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.(png)$/)) {
                    if (row % 3 == 0) {
                        row = 0;
                    }
                    if (row == 0) {
                        $("#main").append($("<div class='row'></div>"));
                    }
                    row++;
                    $(".row").last().append("<img src='" + val + "' class='col-4 p-5 img-fluid'>");
                }
            });
        }
    });
}