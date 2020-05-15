var fileNames = [];
var howlsArray = {};
var alertSound;

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
					if ($('#' + soundToggle).hasClass('visible')) {
						$('#' + soundToggle).toggleClass('visible');
					}
					if ($(this).hasClass('visible')) {
						$(this).toggleClass('visible');
					}
				} else {
					howlsArray[soundId].play();
					$('#' + soundToggle).toggleClass('visible');
					$(this).toggleClass('visible');
				}

			});
			$('.slidecontainer input').on('input', function () {
				var soundId = $(this).attr('id');
				soundId = soundId.replace('Toggle', '');
				howlsArray[soundId].volume($(this).val());
			});
			$('#master-slider').on('input', function () {
				Howler.volume($(this).val());
			});
			pomodoro.init();
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
	alertSound = new Howl({
		src: ['static/sounds/alert.wav'],
		loop: true,
		volume: 1.0
	});
}

/*
 * Pomodoro modified from Raj Gupta 
 * https://codepen.io/rajdgreat007/pen/ZpZWbw
 */
var pomodoro = {
	started: false,
	paused: false,
	muted: false,
	minutes: 0,
	seconds: 0,
	fillerHeight: 0,
	fillerIncrement: 0,
	interval: null,
	minutesDom: null,
	secondsDom: null,
	init: function () {
		var self = this;
		this.minutesDom = document.querySelector('#minutes');
		this.secondsDom = document.querySelector('#seconds');
		this.interval = setInterval(function () {
			self.intervalCallback.apply(self);
		}, 1000);
		document.querySelector('#work').onclick = function () {
			self.startWork.apply(self);
		};
		document.querySelector('#shortBreak').onclick = function () {
			self.startShortBreak.apply(self);
		};
		document.querySelector('#longBreak').onclick = function () {
			self.startLongBreak.apply(self);
		};
		document.querySelector('#stop').onclick = function () {
			self.stopTimer.apply(self);
		};
		document.querySelector('#pause').onclick = function () {
			self.pauseTimer.apply(self);
		};
		document.querySelector('#mute').onclick = function () {
			self.muteSounds.apply(self);
		}
	},
	resetVariables: function (mins, secs, started) {
		this.minutes = mins;
		this.seconds = secs;
		this.started = started;
		this.paused = false;
		document.querySelector('#pause').classList.remove('visible');
	},
	startWork: function () {
		this.stopAlertSound();
		this.resetVariables(25, 0, true);
	},
	startShortBreak: function () {
		this.stopAlertSound();
		this.resetVariables(5, 0, true);
	},
	startLongBreak: function () {
		this.stopAlertSound();
		this.resetVariables(15, 0, true);
	},
	stopTimer: function () {
		this.stopAlertSound();
		this.resetVariables(25, 0, false);
		this.updateDom();
	},
	stopAlertSound: function () {
		if (alertSound.playing()) {
			alertSound.stop();
		}
	},
	pauseTimer: function () {
		if (this.started) {
			if (this.paused) {
				this.resumeTimer();
			} else {
				this.paused = true;
				document.querySelector('#pause').classList.add('visible');
			}
		}
	},
	resumeTimer: function () {
		this.resetVariables(this.minutes, this.seconds, true);
	},
	muteSounds: function () {
		this.muted = (this.muted) ? false : true;
		Howler.mute(this.muted);
		$('#mute').toggleClass('muted');
	},
	toDoubleDigit: function (num) {
		if (num < 10) {
			return "0" + parseInt(num, 10);
		}
		return num;
	},
	updateDom: function () {
		this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
		this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
		if (this.started) {
			window.document.title = "WAVE " + this.toDoubleDigit(this.minutes) + ":" + this.toDoubleDigit(this.seconds);
		} else {
			window.document.title = "WAVE";
		}
	},
	intervalCallback: function () {
		if (!this.started) return false;
		if (this.seconds == 0) {
			if (this.minutes == 0) {
				this.timerComplete();
				return;
			}
			this.seconds = 59;
			if (!this.paused)
				this.minutes--;
		} else {
			if (!this.paused)
				this.seconds--;
		}
		this.updateDom();
	},
	timerComplete: function () {
		this.started = false;
		if (!this.paused) {
			alertSound.play();
		}
		this.paused = false;
		console.log(this.paused);
	}
};