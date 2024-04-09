music = "";
leftWristX = "";
leftWristY = "";
rightWristY = "";
rightWristX = "";
leftWristScore = "";

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log('socreLeftWrist = ' + leftWristScore);

        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log('leftWristX = ' + leftWristX + 'leftWristY = ' + leftWristY)
    
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log('rightWristX = ' + rightWristX + 'rightWristY = ' + rightWristY)
    }
}

function modelLoaded(){
console.log("posenet is initiallized...")
}

function preload(){
    music = loadSound("music.mp3");
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill('#000000');
    stroke('#000000');

    if (leftWristScore > 0.2){

        circle(leftWristX, leftWristY, 20);
        inNumberLeftWristY = Number(leftWristY);
        removeDecimals = floor(leftWristY);
        volume = removeDecimals / 500;
        document.getElementById('Volume').innerHTML = 'Volume = '  + volume;
        song.setVolume(volume);

    }

}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}
