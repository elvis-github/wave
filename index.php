<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="icon" href="favicon.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand&family=Raleway:wght@300&display=swap"
        rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"
        integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="js/index.js" aynsc></script>
    <script src="js/howler.core.js"></script>
    <script src="https://kit.fontawesome.com/93ba952c62.js" crossorigin="anonymous"></script>
    
    <title>WAVE</title>
</head>

<body>
    <?php
        $out = scandir('static/images');
        unset($out[0], $out[1]);
        $out = array_values($out);
    ?>
    <div id="main-container" class="d-flex flex-column">
        <div class="container-fluid bg-dark">
            <svg data-toggle="collapse" data-target="#pomodoro-app" class="d-block m-auto py-3" height="100pt"
                viewBox="0 0 384 384" width="100pt" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="m176 288c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-192c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16zm0 0" />
                <path
                    d="m16 96c-8.832031 0-16 7.167969-16 16v160c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-160c0-8.832031-7.167969-16-16-16zm0 0" />
                <path
                    d="m152 256v-128c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v128c0 8.832031 7.167969 16 16 16s16-7.167969 16-16zm0 0" />
                <path
                    d="m80 240c8.832031 0 16-7.167969 16-16v-64c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v64c0 8.832031 7.167969 16 16 16zm0 0" />
                <path
                    d="m264 256v-128c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v128c0 8.832031 7.167969 16 16 16s16-7.167969 16-16zm0 0" />
                <path
                    d="m368 96c-8.832031 0-16 7.167969-16 16v160c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-160c0-8.832031-7.167969-16-16-16zm0 0" />
                <path
                    d="m304 144c-8.832031 0-16 7.167969-16 16v64c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-64c0-8.832031-7.167969-16-16-16zm0 0" />
                <path
                    d="m176 368c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-16c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16zm0 0" />
                <path
                    d="m192 48c8.832031 0 16-7.167969 16-16v-16c0-8.832031-7.167969-16-16-16s-16 7.167969-16 16v16c0 8.832031 7.167969 16 16 16zm0 0" />
            </svg>
        </div>

        <div class="collapse" id="pomodoro-app">
            <div id="container" class="text-center">

                <div id="timer">
                    <div class="h4 mb-0" id="time">
                        <span id="minutes">25</span>
                        <span id="colon">:</span>
                        <span id="seconds">00</span>
                    </div>
                </div>
                <div id="buttons">
                    <i id="work" class="btn fas fa-play" /></i>
                    <i id="shortBreak" class="btn fas fa-mug-hot"></i>
                    <i id="mediumBreak" class="fas fa-beer"></i>
                    <i id="longBreak" class="btn fas fa-coffee"></i>
                    <i id="pause" class="btn fas fa-pause"></i>
                    <i id="stop" class="btn fas fa-stop"></i>
                    <i id="mute" class="btn fas fa-volume-mute"></i>
                </div>
                <input type='range' min='0.0' max='1.0' value='1.0' step='0.10' class="slider visible d-block mx-auto"
                    id="master-slider">
            </div>
        </div>

        <div class="container h-auto pb-2 my-5" id="main">
            <script>
                var fileArr = <?php echo json_encode($out)?>;
                loadFiles(fileArr);
            </script>
        </div>
    </div>
    <footer class="bg-dark navbar container-fluid">
        <p class="text-light d-block mx-auto my-0 text-center"><span id="brand">WAVE v1.4.3</span><br>Created by Elvis
            Bui for Sarah Smith<br>
            Images from flaticon.com | Sounds from freesounds.org</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
    </script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous">
    </script>
</body>

</html>