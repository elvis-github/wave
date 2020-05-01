var fileNames = [];
var howlsArray = {};
function loadFiles() {
	var folder = 'static/images/';
	var row = 0;
	$.ajax({
		url: folder,
		success: function(data) {
			$(data).find('a').attr('href', function(i, val) {
				console.log(val);
				if (val.match(/\.(png)$/)) {
					if (row % 3 == 0) {
						row = 0;
					}
					if (row == 0) {
						$('#main').append($("<div class='row'></div>"));
					}
					row++;
					$('.row').last().append("<div class='col-4'>");
					$('div')
						.last()
						.append(
							"<img src='" +
								folder +
								val +
								"' class='p-4 img-fluid' id='" +
								val.replace('.png', '') +
								"'>"
						);

					fileNames.push(val.replace('/' + folder + '/', '').split('.').slice(0, -1).join('.'));
					$('div')
						.last()
						.append(
							"<div class='slidecontainer d-flex justify-content-center'><input type='range' min='1' max='100' value='50' class='slider'></div></div>"
						);
				}
			});
		},
		complete: function() {
			loadHowls();
			$('img').click(function() {
				var soundId = $(this).attr('id');
				console.log(howlsArray[soundId]);
				howlsArray[soundId].play();
			});
		}
	});
}

function loadHowls() {
	for (var i = 0; i < fileNames.length; i++) {
		srcStr = 'static/sounds/' + fileNames[i] + '.wav';
		var sound = new Howl({
			src: srcStr,
			loop: true
		});
		howlsArray[fileNames[i]] = sound;
	}
}
