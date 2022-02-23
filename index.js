const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/emotion/:gitId/", function (req, res) {
  axios.get('https://api.github.com/users/' + req.params.gitId)
  .then(function (response) {
    let imageLink = response.data.avatar_url.slice(0, -4);
    console.log(response);
    var data = JSON.stringify({
      url: imageLink,
    });
    var config = {
      method: "post",
      url: "https://faceapigit.cognitiveservices.azure.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion,smile&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01&faceIdTimeToLive=86400",
      headers: {
        "Ocp-Apim-Subscription-Key": "d3015b46246f4d9498f6cc4817f12fdc",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
    .then(function (response) {
      var resJson = response.data;
      res.send(resJson[0])
    })
  })

});


app.get("/emotion/:gitId/:emotion", function (req, res) {
  var linkRedir = ""
  if(req.params.emotion == 'smile'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Smile&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }
  if(req.params.emotion == 'anger'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Anger&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }
  if(req.params.emotion == 'contempt'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Contempt&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }
  if(req.params.emotion == 'disgust'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Disgust&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }

  if(req.params.emotion == 'fear'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Fear&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }
  if(req.params.emotion == 'happiness'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Happiness&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }
  if(req.params.emotion == 'neutral'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Neutral&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }
  if(req.params.emotion == 'sadness'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Sadness&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }
  if(req.params.emotion == 'surprise'){
    linkRedir = "https://img.shields.io/badge/dynamic/json?color=orange&label=Surprise&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" + req.params.gitId
  }

  res.redirect(linkRedir);
  

});


app.set("view engine", "ejs");

app.listen(3000, () => console.log("Server running..."));
