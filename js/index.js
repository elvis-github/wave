var fileNames = [];
var howlsArray = {};

function loadFiles() {
	var folder = 'static/images/';
	var row = 0;
	$.ajax({
		url: folder,
		success: function (data) {
			$(data).find('a').attr('href', function (i, val) {
				if (val.match(/\.(png)$/)) {
					if (row % 3 == 0) {
						row = 0;
					}
					if (row == 0) {
						$('#main').append($("<div class='row mb-3'></div>"));
					}
					row++;
					$('.row').last().append("<div class='col-4'>");
					$('div')
						.last()
						.append(
							"<img src='" +
							folder +
							val +
							"' class='mb-2 mx-auto d-block' id='" +
							val.replace('.png', '') +
							"'>"
						);

					fileNames.push(val.replace('/' + folder + '/', '').split('.').slice(0, -1).join('.'));
					$('div')
						.last()
						.append(
							"<div class='slidecontainer d-flex justify-content-center'><input type='range' min='0.0' max='1.0' value='0.5' step='0.10' class='slider' id='" +
							val.replace('.png', '') +
							"Toggle'></div></div>"
						);
				}
			});
		},
		complete: function () {
			loadHowls();
			$('img').click(function () {
				var soundId = $(this).attr('id');
				var soundToggle = soundId + 'Toggle';
				if (howlsArray[soundId].playing()) {
					howlsArray[soundId].stop();
					$('#' + soundToggle).toggleClass('visible');
					$(this).toggleClass('visible');
				} else {
					howlsArray[soundId].play();
					$('#' + soundToggle).toggleClass('visible');
					$(this).toggleClass('visible');
				}

			});
			$('input').on('change', function () {
				var soundId = $(this).attr('id');
				soundId = soundId.replace('Toggle', '');
				howlsArray[soundId].volume($(this).val());
			});
		}
	});
}

function loadHowls() {
	for (var i = 0; i < fileNames.length; i++) {
		srcStr = 'static/sounds/' + fileNames[i] + '.wav';
		var sound = new Howl({
			src: srcStr,
			loop: true,
			volume: 0.5
		});
		howlsArray[fileNames[i]] = sound;
	}
}