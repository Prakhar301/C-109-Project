var prediction="";
Webcam.set({
    width:275,
    height:275,
    image_format:'png',
    png_quality:80
});
var camera=document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="img_click" src="'+data_uri+'">'
    })
}
console.log("ml5 version", ml5.version);
var classify=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Sn4YbkXPH/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}
function identify(){
    var img=document.getElementById("img_click");
    classify.classify(img,gotResult);
}
function speak(){
    var synth=window.speechSynthesis;
    var speakData=""
    if(prediction="Raise Hand"){
        speakData="You are Raising Hand"
    }
    if(prediction="Awesome"){
        speakData="Awesome"
    }
    if(prediction="Bravo"){
        speakData="Bravo Very Good"
    }
    if(prediction="No"){
        speakData="No that's wrong"
    }
    if(prediction="Yes"){
        speakData="Yes you are right"
    }   
    var utterThis=new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}
function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        prediction=result[0].label;  
        speak();  
        if(prediction="Bravo"){
            document.getElementById("resultant").innerHTML="Bravo";
        }
        if(prediction="Yes"){
            document.getElementById("resultant").innerHTML="Yes";
        }
        if(prediction="No"){
            document.getElementById("resultant").innerHTML="No";
        }
        if(prediction="Awesome"){
            document.getElementById("resultant").innerHTML="Awesome";
        }
        if(prediction="Raise Hand"){
            document.getElementById("resultant").innerHTML="Raise Hand";
        }
        if(prediction="Awesome"){
            document.getElementById("emojian").innerHTML="<span>&#128076;</span>";
        }
        if(prediction="No"){
            document.getElementById("emojian").innerHTML="<span>&#128078;</</span>";
        }
        if(prediction="Yes"){
            document.getElementById("emojian").innerHTML="<span>&#128077;</span>";
        }
        if(prediction="Bravo"){
            document.getElementById("emojian").innerHTML="<span>&#129304;</span>";
        }
        if(prediction="Raise Hand"){
            document.getElementById("emojian").innerHTML="<span> &#9995;</span>";
        }
    }
}