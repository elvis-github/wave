function loadFiles() {
	var folder = 'static/images';
	var row = 0;
	$.ajax({
		url: folder,
		success: function(data) {
			$(data).find('a').attr('href', function(i, val) {
				if (val.match(/\.(png)$/)) {
					if (row % 3 == 0) {
						row = 0;
					}
					if (row == 0) {
						$('#main').append($("<div class='row'></div>"));
					}
					row++;
					$('.row').last().append("<div class='col-4'>");
					$('div').last().append("<img src='" + val + "' class='p-4 img-fluid'>");
					$('div')
						.last()
						.append(
							"<div class='slidecontainer d-flex justify-content-center'><input type='range' min='1' max='100' value='50' class='slider'></div></div>"
						);
				}
			});
		}
	});
}
