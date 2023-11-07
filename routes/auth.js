const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async function (req, res, next) {
  const code = req.query.code;
  const restApiKey = "d55a59c0b29d8f0969646a5378d5bd8c";
  const REDIRECT_URI = "http://localhost:5173/auth";
  const makeFormData = (params) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      searchParams.append(key, params[key]);
    });

    return searchParams;
  };
  const { data } = await axios({
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    url: "https://kauth.kakao.com/oauth/token",
    data: makeFormData({
      grant_type: "authorization_code",
      client_id: restApiKey,
      redirect_uri: REDIRECT_URI,
      code,
    }),
  });

  res.send(data);
});

module.exports = router;
