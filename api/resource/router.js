const router = require("express").Router();
const Resource = require("./model.js");

router.get("/", async (req, res, next) => {
  try {
    const data = await Resource.getResource();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const post = req.body;
  try {
    const newPost = await Resource.addResource(post);
    if (!newPost.resource_name) {
      const err = new Error();
      err.status = 400;
      err.message = "resource must contain a resource_name";
      next(err);
    } else {
      res.status(201).json(newPost);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
