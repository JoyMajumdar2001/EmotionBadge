const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/em/:gitId/auto", function (req, res) {
  axios
    .get("https://api.github.com/users/" + req.params.gitId)
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
      axios(config).then(function (response) {
        var resJson = response.data;
        if (resJson === null) {
          res.send({ emotion: "No face", value: 0 });
        } else {
          if (resJson[0].faceAttributes.smile >= 0.5) {
            res.send({
              emotion: "Smile",
              value: resJson[0].faceAttributes.smile,
            });
          }
          if (resJson[0].faceAttributes.emotion.anger > 0.5) {
            res.send({
              emotion: "Anger",
              value: resJson[0].faceAttributes.emotion.anger,
            });
          }
          if (resJson[0].faceAttributes.emotion.contempt > 0.5) {
            res.send({
              emotion: "Contempt",
              value: resJson[0].faceAttributes.emotion.contempt,
            });
          }
          if (resJson[0].faceAttributes.emotion.disgust > 0.5) {
            res.send({
              emotion: "Disgust",
              value: resJson[0].faceAttributes.emotion.disgust,
            });
          }
          if (resJson[0].faceAttributes.emotion.fear > 0.5) {
            res.send({
              emotion: "Fear",
              value: resJson[0].faceAttributes.emotion.fear,
            });
          }
          if (resJson[0].faceAttributes.emotion.happiness > 0.5) {
            res.send({
              emotion: "Happiness",
              value: resJson[0].faceAttributes.emotion.happiness,
            });
          }
          if (resJson[0].faceAttributes.emotion.neutral > 0.5) {
            res.send({
              emotion: "Neutral",
              value: resJson[0].faceAttributes.emotion.neutral,
            });
          }
          if (resJson[0].faceAttributes.emotion.sadness > 0.5) {
            res.send({
              emotion: "Sadness",
              value: resJson[0].faceAttributes.emotion.sadness,
            });
          }
          if (resJson[0].faceAttributes.emotion.surprise > 0.5) {
            res.send({
              emotion: "Surprise",
              value: resJson[0].faceAttributes.emotion.surprise,
            });
          }
        }
      });
    });
});

app.get("/emotion/:gitId/", function (req, res) {
  axios
    .get("https://api.github.com/users/" + req.params.gitId)
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
      axios(config).then(function (response) {
        var resJson = response.data;
        res.send(resJson[0]);
      });
    });
});

app.get("/emotion/:gitId/:emotion", function (req, res) {
  var linkRedir = "";
  if (req.params.emotion == "smile") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Smile&query=%24.faceAttributes.smile&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }
  if (req.params.emotion == "anger") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Anger&query=%24.faceAttributes.emotion.anger&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }
  if (req.params.emotion == "contempt") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Contempt&query=%24.faceAttributes.emotion.contempt&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }
  if (req.params.emotion == "disgust") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Disgust&query=%24.faceAttributes.emotion.disgust&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }

  if (req.params.emotion == "fear") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Fear&query=%24.faceAttributes.emotion.fear&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }
  if (req.params.emotion == "happiness") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Happiness&query=%24.faceAttributes.emotion.happiness&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }
  if (req.params.emotion == "neutral") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Neutral&query=%24.faceAttributes.emotion.neutral&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }
  if (req.params.emotion == "sadness") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Sadness&query=%24.faceAttributes.emotion.sadness&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }
  if (req.params.emotion == "surprise") {
    linkRedir =
      "https://img.shields.io/badge/dynamic/json?color=orange&label=Surprise&query=%24.faceAttributes.emotion.surprise&url=https%3A%2F%2Femotionbadge.onrender.com%2Femotion%2F" +
      req.params.gitId;
    res.redirect(linkRedir);
  }
  if (req.params.emotion == "auto") {
    axios
      .get(
        "https://emotionbadge.onrender.com/em/" +
          req.params.gitId +
          "/auto"
      )
      .then(function (response) {
        let name = response.data.emotion;
        let value = response.data.value;
        linkRedir =
          "https://img.shields.io/badge/" + name + "-" + value + "-orange";
        res.redirect(linkRedir);
      });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
