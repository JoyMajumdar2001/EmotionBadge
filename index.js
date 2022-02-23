const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const axios = require("axios").default;
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: "null",
      clientSecret: "null",
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      cb(null, profile);
    }
  )
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

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
  if(req.params.emotion == 'smile'){
    res.send("Hii")
  }

});

const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", isAuth, (req, res) => {
  var data = JSON.stringify({
    url: req.user._json.avatar_url.slice(0, -4),
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
      console.log(JSON.stringify(response.data));
      var resJson = response.data;

      if (resJson.length == 0) {
        let params = {
          name: req.user.displayName,
          dp: req.user._json.avatar_url,
          dataStr: JSON.stringify(response.data),
          hasFase: false,
        };
        res.render("dashboard", params);
      } else {
        let smile = Math.round(resJson[0].faceAttributes.smile * 100) / 100;
        let anger =
          Math.round(resJson[0].faceAttributes.emotion.anger * 100) / 100;
        let fear =
          Math.round(resJson[0].faceAttributes.emotion.fear * 100) / 100;
        let sadness =
          Math.round(resJson[0].faceAttributes.emotion.sadness * 100) / 100;
        let neutral =
          Math.round(resJson[0].faceAttributes.emotion.neutral * 100) / 100;
        let disgust =
          Math.round(resJson[0].faceAttributes.emotion.disgust * 100) / 100;
        let surprise =
          Math.round(resJson[0].faceAttributes.emotion.surprise * 100) / 100;

        let params = {
          name: req.user.displayName,
          dp: req.user._json.avatar_url,
          smile: smile,
          anger: anger,
          fear: fear,
          sadness: sadness,
          neutral: neutral,
          disgust: disgust,
          surprise: surprise,
          hasFase: true,
        };
        res.render("dashboard", params);
      }
    })
    .catch(function (error) {
      console.log(error);
      let params = {
        name: req.user.displayName,
        dp: req.user._json.avatar_url,
        dataStr: "error",
      };
      res.render("dashboard", params);
    });
});

app.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login");
});

app.set("view engine", "ejs");

app.listen(3000, () => console.log("Server running..."));
